export class AccountSortModel {
  direction: -1 | 0 | 1;
  id?: boolean;
  fullName?: boolean;
  email?: boolean;
  gender?: boolean;
  avatar?: boolean;
  phoneNumber?: boolean;

  constructor(direction: -1 | 0 | 1, id?: boolean, fullName?: boolean, email?: boolean, gender?: boolean, avatar?: boolean, phoneNumber?: boolean) {
    this.direction = direction;
    this.id = id ?? false;
    this.fullName = fullName ?? false;
    this.email = email ?? false;
    this.gender = gender ?? false;
    this.avatar = avatar ?? false;
    this.phoneNumber = phoneNumber ?? false;
  }
}
