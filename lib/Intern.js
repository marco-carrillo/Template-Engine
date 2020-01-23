const Employee=require('./Employee');

class Intern extends Employee{
    constructor(name,id,email,school){
        super(name,id,email);
        this.school=school;
    }
    getSchool(){return this.school};
    getRole(){return 'Intern'};
    getHTMLcode(){
        return `<div class="card mx-2 my-2" style="width: 400px;">
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src="../images/intern.png" class="card-img" alt="Engineer">
            <h4>Intern</h4>
        </div>
            <div class="col-md-8">
                <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <p class="card-text">id: ${this.id}</p>
                        <p class="card-text">email: ${this.email}</p>
                        <p class="card-text">School: ${this.school}</p>
                </div>
            </div>
        </div>
    </div>`};
}

module.exports=Intern;