function getInfo(role,message){

    (async function(){

        try{
            process.stdout.write('\033c');
            console.log(message);
            response=await inquirer.prompt({message:'what is going on',name:'nothing'})
            return response;
        }catch(e){console.log(e)}

    })();
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

        //********************************************************************** */
        // confirming the composition of the team so that we can start questions */
        //********************************************************************** */
        let teamManager = new Manager;
        getInfo('Manager','Enter information for the manager');


    } catch(error){console.log('Error while running the application:  ',error)};

})();