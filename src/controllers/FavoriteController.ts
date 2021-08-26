import { Request, Response } from "express";
import favorite from '../models/Favorite';
import cache from '../cache';


class FavoriteController {

  async index(req: Request, res: Response) {
    const user_hash = req.headers['user-hash'];
    const cached = await cache.getData(`favorites${user_hash}`);
    if (cached) {
      return res.json(cached);
    }
    if (typeof user_hash !== 'string' || !user_hash) {
      return res.status(400).json({ message: 'bad request' });
    }

    const favorites = await favorite.findAllFavorites(user_hash)
      .catch(err => {
        if (err.status) {
          return res.status(err.status).json();
        }
        return res.status(400).json({ message: 'bad request' });
      });

    cache.setData('favorites', { ...favorites }, 60 * 10);
    return res.json(favorites);
  }

  async create(req: Request, res: Response): Promise<any> {
    const user_hash = req.headers['user-hash'];
    const { app_id } = req.body;
    let { nota }: { nota: number } = req.body;

    nota = nota ? nota : 0;
    if (typeof user_hash !== 'string' || !user_hash || !app_id || nota > 5) {
      return res.status(400).json({ message: 'bad request' });
    }
    try {
      const newFavorite = await favorite.create(Number(user_hash), Number(app_id), nota);
      if (!newFavorite) {
        return res.status(400).json({ message: 'bad request' });
      }

      const cached = await cache.getData('favorites');
      if (cached) {
        cache.deleteData('favorites');
      }
      return res.status(200).json(newFavorite);

    } catch (err) {
      if (err.status && err.status !== 400) {
        return res.status(err.status).json();
      }
      return res.status(400).json({ message: 'bad request' });
    }

  }

  async delete(req: Request, res: Response) {
    const user_hash = req.headers['user-hash'];
    const { appid } = req.params;
    if (typeof user_hash !== 'string' || !user_hash || !appid) {
      return res.status(400).json({ message: 'bad request' });
    }
    const favoriteDeleted = await favorite.delete(Number(user_hash), Number(appid))
      .catch(err => {
        if (err.status) {
          return res.status(err.status).json();
        }
        return res.status(400).json({ message: 'bad request' });
      });
    if (!favoriteDeleted) {
      return res.status(404).json({ message: 'not found' });
    }

    const cached = await cache.getData('favorites');
    if (cached) {
      cache.deleteData('favorites');
    }
    return res.status(204).json();
  }
}

export default new FavoriteController();