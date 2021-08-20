import { Router } from 'express';
import favoriteController from '../controllers/FavoriteController';

const router = Router();

router.get('/favorite', favoriteController.index);
router.post('/favorite', favoriteController.create);
router.delete('/favorite/:appid', favoriteController.delete);

export default router;