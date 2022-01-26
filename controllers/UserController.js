import User from '../models/User.js';
import {Response} from '../services/Response.js';
import STATUS_CODE from '../constants/statuCodes.js';

class UserController {
  async getUsers(_, response) {
    try {
      const users = await User.find();

      return Response.send(response, STATUS_CODE.successful, users);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController;
