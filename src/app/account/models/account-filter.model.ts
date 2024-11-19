export class AccountFilterModel {
  fullName: string | null;
  email: string | null;
  gender: string | null;
  avatar: string | null;
  phoneNumber: string | null;
  page: number | null;
  limit: number | null;

  constructor(fullName: string, email: string, gender: string, avatar: string, phoneNumber: string, page: number, limit: number) {
    this.fullName = fullName;
    this.email = email;
    this.avatar = avatar;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.page = page;
    this.limit = limit;
  }
}
