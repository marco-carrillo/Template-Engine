const Employee = require('./Employee');

class Engineer extends Employee {
    constructor (name, id, email, github){
        super(name,id,email);
        this.github=github;
    }
    getGithub(){return this.github};
    getRole(){return 'Engineer'};
    getHTMLcode(){
        return `<div class="card mx-2 my-2" style="width: 400px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="../images/engineer.png" class="card-img" alt="Engineer">
                <h4>Engineer</h4>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <p class="card-text"><span style="color:blue;font-weight:bold">id:</span> ${this.id}</p>
                        <p class="card-text"><span style="color:blue;font-weight:bold">email:</span> ${this.email}</p>
                        <p class="card-text"><span style="color:blue;font-weight:bold">Github:</span> ${this.github}</p>
                </div>
            </div>
        </div>
    </div>`};
}

module.exports =Engineer;