import { Router } from 'express';
import appController from '../controllers/AppController';

const router = Router();

router.get('/', appController.index);
router.get('/:id', appController.show);

export default router;