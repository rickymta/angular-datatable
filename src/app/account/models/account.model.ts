export class AccountModel {
  fullName: string;
  email: string;
  gender: string;
  avatar: string;
  phoneNumber: string;

  constructor(fullName: string, email: string, gender: string, avatar: string, phoneNumber: string) {
    this.fullName = fullName;
    this.email = email;
    this.avatar = avatar;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
  }
}
