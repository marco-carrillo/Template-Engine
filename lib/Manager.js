const Employee=require('./Employee');

class Manager extends Employee{
    constructor(name,id,email,officeNumber){
        super(name,id,email);
        this.officeNumber=officeNumber;
    }
    getOfficeNumber(){return this.officeNumber};
    getRole(){return 'Manager'};
    getHTMLcode(){
        return `<div class="card mx-2 my-2" style="width: 400px;">
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src="../images/Project-leader.png" class="card-img" alt="Manager">
            <h4>Manager</h4>
        </div>
            <div class="col-md-8">
                <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <p class="card-text">id: ${this.id}</p>
                        <p class="card-text">email: ${this.email}</p>
                        <p class="card-text">Office #: ${this.officeNumber}</p>
                </div>
            </div>
        </div>
    </div>`};
}

module.exports=Manager;