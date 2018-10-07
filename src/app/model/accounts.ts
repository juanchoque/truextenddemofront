export class Accounts {
    public id:number;
    public birthDate:string;
    public createDate:string;
    public email:string;
    public firstName:string;
    public lastName:string;
    public password:string;
    public state:number;
    public token:string;

    constructor(){
        this.birthDate = null;
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.password = '';
    }
}
