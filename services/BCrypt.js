import bcrypt from 'bcrypt';
import BASE_CONSTANT from '../constants/base.js';

export class BCrypt {
  static compareSync(currentPassword, userPassword) {
    return bcrypt.compareSync(currentPassword, userPassword);
  }

  static hashSync(currentPassword) {
    return bcrypt.hashSync(currentPassword, BASE_CONSTANT.hashSalt);
  }
}
