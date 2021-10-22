export class User {
  public id: number;
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public email: string;
  public profileImageUrl: string;
  /*public lastLoginDate = new Date();
  public lastLoginDateDisplay = new Date();
  public signUpDate = new Date();*/
  public role: string;
  public authorities: string[];
  public isActive: boolean;
  public isNotLocked: boolean;

  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.username = "";
    this.email = "";
    this.isActive = false;
    this.isNotLocked = false;
    this.role = "";
    this.authorities = [];
  }
}
