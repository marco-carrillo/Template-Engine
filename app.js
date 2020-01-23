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
        } while (conf.response!=='Yes');

        //********************************************************/
        // Asking information about Manager/ Engineers / Intern  */
        //********************************************************/
        let teamMembers=[];
        process.stdout.write('\033c');
        for (let i=0;i<answers.nbrEngineers+answers.nbrInterns+1;i++){

            if(i===0){
                    console.log('ENTER INFORMATION FOR THE MANAGER');
                    information=await inquirer.prompt(getInfo('Manager'));
                    teamMembers.push(new Manager(information.name,information.id,information.email,information.xyz));
            } else if (i<=answers.nbrEngineers){
                    console.log(`ENTER INFORMATION FOR ENGINEER ${i}`);
                    information=await inquirer.prompt(getInfo('Engineer'));
                    teamMembers.push(new Engineer(information.name,information.id,information.email,information.xyz));
                } else {
                    console.log(`ENTER INFORMATION FOR INTERN ${i-answers.nbrEngineers}`);
                    information=await inquirer.prompt(getInfo('Intern'));
                    teamMembers.push(new Intern(information.name,information.id,information.email,information.xyz));
            }
        }

        //*****************************************************************/
        // Generating the file:  Writing the first part of the file       */
        //*****************************************************************/
        let divider_start='<div class="row text-center justify-content-center">';     // Row divider so that we can add 3 cards per row
        let divider_end='</div>';                                                     // Row ending so that we can add 3 cards per row
        let fileData=fs.readFileSync(__dirname+'/templates/team.html','utf8');        // Reading template
        let filePieces=fileData.split('{');                                           // { placeholder to add HTML for cards
        let data=fs.writeFileSync('output/team.html',filePieces[0]+'\n');             // Writing header + Manager card

        //********************************************************************/
        // Generating the file:  Writing the manager/engineer/intern cards   */
        // writes a container row every 3 cards to format HTML properly      */
        //********************************************************************/
        let cards_written=0;
        for (let i=0;i<teamMembers.length;i++){
                let data=fs.appendFileSync('output/team.html',teamMembers[i].getHTMLcode()+'\n');
                cards_written++;
                if (cards_written%3===0&&teamMembers.length>cards_written){
                    let data=fs.appendFileSync('output/team.html',divider_end+'\n'+divider_start+'\n');
                }
            };

        data=fs.appendFileSync('output/team.html',filePieces[1]);

    } catch(error){console.log('Error while running the application:  ',error)};

})();