


// ***************************************************************************/
// The following function will create the questions to be asked to the user  */
// based on the team member role                                             */
//****************************************************************************/

function getInfo(role){

    let qName='';
    switch (role) {
        case 'Manager':
            qName='office';
            break;
        case 'Intern':
            qName='School';
            break;
        case 'Engineer':
            qName='Github'
            break;
    }

    let questions=[{name:'name' ,type:'input',message:`${role}'s name  ? :`},
                    {name:'id'   ,type:'input',message:`${role}'s id    ? :`},
                    {name:'email',type:'input',message:`${role}'s email ? :`},
                    {name:'xyz'  ,type:'input',message:`${role}'s ${qName}? :`}]

    return questions;
}


//*************************************************************************/
//  Aplication main functionality.  Initialization of required variables  *
//*************************************************************************/
const inquirer=require('inquirer');
const fs=require("fs");
const Employee=require('./lib/Employee');
const Engineer=require('./lib/Engineer');
const Intern=require('./lib/Intern');
const Manager=require('./lib/Manager');

(async function(){
    try{

        do {
            //********************************************************************** */
            // Getting the number of members, other than the manager, for the team   */
            //********************************************************************** */
            process.stdout.write('\033c');
            let questions=[{type:'number',name:'nbrEngineers',message:'How many engineers are on the team (1-15)? :'},
                        {type:'number',name:'nbrInterns'  ,message:'How many interns are on the team  (1-15) ? :'}];
            do{
                process.stdout.write('\033c');
                answers=await inquirer.prompt(questions);
            } while (answers.nbrEngineers<1||answers.nbrEngineers>15||typeof answers.nbrEngineers!=='number'||isNaN(answers.nbrEngineers)||
                    answers.nbrInterns<1  ||answers.nbrInterns>15  ||typeof answers.nbrInterns!=='number'  ||isNaN(answers.nbrInterns));

            //********************************************************************** */
            // confirming the composition of the team so that we can start questions */
            //********************************************************************** */
            questions=[{type:'list',message:`Your team has 1 manager, ${answers.nbrEngineers} engineers and ${answers.nbrInterns} interns, is that correct ? `,
                               choices:['Yes','No'],name:'response'}];
            
            conf=await inquirer.prompt(questions);
            console.log(conf);
        } while (conf.response!=='Yes');

        //**************************************/
        // Asking information for the manager  */
        //**************************************/
        process.stdout.write('\033c');
        console.log('ENTER INFORMATION FOR THE MANAGER');
        let information=await inquirer.prompt(getInfo('Manager'));
        let teamManager = new Manager(information.name,information.id,information.email,information.xyz);

        //****************************************/
        // Asking information for the Engineers  */
        //****************************************/

        let engineers=[];
        for (let i=0;i<answers.nbrEngineers;i++){
            console.log(`ENTER INFORMATION FOR ENGINEER ${i+1}`);
            let information=await inquirer.prompt(getInfo('Engineer'));
            engineers.push(new Engineer(information.name,information.id,information.email,information.xyz));
        }

        //****************************************/
        // Asking information about the interns  */
        //****************************************/

        let interns=[];
        for (let i=0;i<answers.nbrInterns;i++){
            console.log(`ENTER INFORMATION FOR INTERN ${i+1}`);
            let information=await inquirer.prompt(getInfo('Intern'));
            interns.push(new Intern(information.name,information.id,information.email,information.xyz));
        }

        //*********************************************************************************/
        // Generating the file:  Writing the first part of the file and the manager card  */
        //*********************************************************************************/

        let total_cards=1+engineers.length +interns.length;                                           // Total number of cards to write  (three per row on HTML);
        let divider_start='<div class="row text-center justify-content-center">';                     // Row divider so that we can add 3 cards per row
        let divider_end='</div>';                                                                     // Row ending so that we can add 3 cards per row
        let fileData=fs.readFileSync(__dirname+'/templates/team.html','utf8');                        // Reading template
        let filePieces=fileData.split('{');                                                           // { placeholder to add HTML for cards
        let data=fs.writeFileSync('output/team.html',filePieces[0]+teamManager.getHTMLcode()+'\n');   // Writing header + Manager card
        let cards_written=1;                                                                          // Manager card written

        //****************************************************/
        // Generating the file:  Writing the engineer cards  */
        //****************************************************/

        for (let i=0;i<engineers.length;i++){
                let data=fs.appendFileSync('output/team.html',engineers[i].getHTMLcode()+'\n');
                cards_written++;
                if (cards_written%3===0&&total_cards>cards_written){
                    let data=fs.appendFileSync('output/team.html',divider_end+'\n'+divider_start+'\n');
                }
            };

        //****************************************************/
        // Generating the file:  Writing the interns cards   */
        //****************************************************/

        for (let i=0;i<interns.length;i++){
                 let data=fs.appendFileSync('output/team.html',interns[i].getHTMLcode()+'\n');
                 cards_written++;
                if (cards_written%3===0&&total_cards>cards_written){
                    let data=fs.appendFileSync('output/team.html',divider_end+'\n'+divider_start+'\n');
                }
            };
        data=fs.appendFileSync('output/team.html',filePieces[1]);


    } catch(error){console.log('Error while running the application:  ',error)};

})();