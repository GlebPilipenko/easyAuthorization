import {validationResult} from 'express-validator';
import User from '../models/User.js';
import Role from '../models/Role.js';
import {Jwt} from '../services/Jwt.js';
import {BCrypt} from '../services/BCrypt.js';
import BASE_CONSTANT from '../constants/base.js';
import {Response} from '../services/Response.js';
import STATUS_CODE from '../constants/statuCodes.js';
import MESSAGE from '../constants/message.js';

const generateAccessToken = (id, roles) => {
  const payload = {
    id, roles
  };

  return Jwt.sign(payload, BASE_CONSTANT.tokenLifetime);
};

class AuthController {
  async login(request, response) {
    try {
      const {userName, password} = request.body;
      const user = await User.findOne({userName});

      if (!user) {
        return Response.send(response, STATUS_CODE.badRequest, MESSAGE.userNotFound);
      }

      const isPasswordValid = BCrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return Response.send(response, STATUS_CODE.badRequest, MESSAGE.invalidPassword);
      }

      const token = generateAccessToken(user._id, user.roles);

      return Response.send(response, STATUS_CODE.successful, token);
    } catch (error) {
      console.log(error);
    }
  }

  async registration(request, response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return Response.send(response, STATUS_CODE.badRequest, MESSAGE.registrationError);
      }

      const {userName, password} = request.body;
      const candidate = await User.findOne({userName});

      if (candidate) {
        return Response.send(response, STATUS_CODE.badRequest, MESSAGE.chooseAnotherName);
      }

      const hashPassword = BCrypt.hashSync(password);
      const userRole = await Role.findOne({value: BASE_CONSTANT.user});
      const user = new User({userName, password: hashPassword, roles: [userRole.value]});

      await user.save();

      return Response.send(response, STATUS_CODE.successful, MESSAGE.userCreated);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController;
