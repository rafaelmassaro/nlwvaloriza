import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController'; 
import { ensureAdmin } from './middlewares/EnsureAdmin';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/EnsureAuthenticated';
import { ListComplimentsSendController } from './controllers/ListComplimentsSendController';
import { ListComplimentsReceivedController } from './controllers/ListComplimentsReceivedController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplmentsSendController = new ListComplimentsSendController();
const listComplmentsReceivedController = new ListComplimentsReceivedController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);

router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/users", createUserController.handle);

router.post("/login", authenticateUserController.handle);

router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listComplmentsSendController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listComplmentsReceivedController.handle);

router.get("/users", ensureAuthenticated, listUsersController.handle);

export { router }