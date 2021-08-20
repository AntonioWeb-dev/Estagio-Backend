import { Request, Response } from "express";
import favorite from '../models/Favorite';
import cache from '../cache';


class FavoriteController {

  async index(req: Request, res: Response) {
    const cached = await cache.getData('favorites');
    if(cached) {
      return res.json(cached);
    }
    const favorites = await favorite.findAllFavorites()
      .catch(err => {
        if (err.status) {
          return res.status(err.status).json();
        }
        return res.status(400).json({ message: 'bad request' });
      });
    cache.setData('favorites', {...favorites}, 60*10);
    return res.json(favorites);
  }

  async create(req: Request, res: Response): Promise<any> {
    const { user_id }  = req.headers;
    const { app_id } = req.body;
    let { nota }: { nota : number} = req.body;

    if(!user_id || !app_id || nota > 5) {
      return res.status(400).json({ message: 'bad request' });
    }

    nota = nota ? nota : 0;
    if (typeof user_id === 'string') { 
      try {
        const newFavorite = await favorite.create(Number(user_id), Number(app_id), nota);
        if (!newFavorite) {
          return res.status(400).json({ message: 'bad request' });
        }
        const cached = await cache.getData('favorites');
        if(cached) {
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
    return res.status(400).json({ message: 'bad request' });
  }

  async delete(req: Request, res: Response) {
    const { user_id }  = req.headers;
    const { appid } = req.params;
    if(!user_id || !appid) {
      return res.status(400).json({ message: 'bad request' });
    }

    if (typeof user_id === 'string') { 
      const favoriteDeleted = await favorite.delete(Number(user_id), Number(appid))
        .catch(err => {
          if (err.status) {
            return res.status(err.status).json();
          }
          return res.status(400).json({ message: 'bad request' });
        });
      if(!favoriteDeleted) {
        return res.status(404).json({ message: 'not found'});
      }
    }
    const cached = await cache.getData('favorites');
    if(cached) {
      cache.deleteData('favorites');
    }
    return res.status(204).json();
  }
}

export default new FavoriteController();