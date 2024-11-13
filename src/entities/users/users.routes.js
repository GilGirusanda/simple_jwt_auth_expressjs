import { Router } from 'express';
import { 
    getAllUsers 
} from './users.controller.js';

const router = new Router();

router.get('/', getAllUsers);

export default router;