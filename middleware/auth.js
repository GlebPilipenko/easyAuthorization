import {Jwt} from '../services/Jwt.js';
import {Response} from '../services/Response.js';
import {splitValueBySeparator} from '../utils/splitValueBySeparator.js';
import MESSAGE from '../constants/message.js';
import BASE_CONSTANT from '../constants/base.js';
import STATUS_CODE from '../constants/statuCodes.js';

const auth = (request, response, next) => {
  if (request.method === 'OPTIONS') {
    next();
  }

  const {authorization} = request.headers;

  try {
    const token = splitValueBySeparator(
      authorization, BASE_CONSTANT.space
    )[BASE_CONSTANT.tokenIndex];

    if (!token) {
      return Response.send(response, STATUS_CODE.forbidden, MESSAGE.userNotAuth);
    }

    const decodedToken = Jwt.verify(token);

    request.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);

    return Response.send(response, STATUS_CODE.forbidden, MESSAGE.userNotAuth);
  }
};

export default auth;
