import role from '../middleware/role.js';
import Router from 'express';
import BASE_CONSTANT from '../constants/base.js';
import UserController from '../controllers/UserController.js';

const usersRouter = Router();

usersRouter.get('/', role([BASE_CONSTANT.admin]), UserController.getUsers);

export default usersRouter;
