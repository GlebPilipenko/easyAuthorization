import jwt from 'jsonwebtoken';
import KEY from '../config/config.js';

export class Jwt {
  static sign(payload, tokenLifeTime) {
    return jwt.sign(payload, KEY.secret, {expiresIn: tokenLifeTime}, null);
  }

  static verify(token) {
    return jwt.verify(token, KEY.secret);
  }
}
