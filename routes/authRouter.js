import {Router} from 'express';
import {check} from 'express-validator';
import AuthorizationController from '../controllers/AuthorizationController.js';

const authRouter = Router();

authRouter.post('/registration', [
  check('userName').notEmpty(),
  check('password').isLength({min: 4, max: 20}),
], AuthorizationController.registration);

authRouter.post('/login', AuthorizationController.login);

export default authRouter;
