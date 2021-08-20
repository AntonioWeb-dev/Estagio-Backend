import { Request, Response } from "express";
import favorite from '../models/Favorite';
import cache from '../cache';


class FavoriteController {

  async index(req: Request, res: Response) {
    const cached = await cache.getData('favorites');
    if(cached) {
      return res.json(cached);
    }
    const favorites = await favorite.findAllFavorites();
    cache.setData('favorites', {...favorites}, 60*10);
    return res.json(favorites);
  }

  async create(req: Request, res: Response): Promise<any> {
    const { user_id }  = req.headers;
    const { app_id } = req.body;
    let { nota } = req.body;

    if(!user_id || !app_id || nota > 5) {
      return res.status(400).json({ message: 'bad request' });
    }

    nota = nota ? nota : 0;
    
    if (typeof user_id === 'string') { 
      await favorite.create(Number(user_id), Number(app_id), Number(nota))
        .catch(err => {
          if(err.code === 500){
            return res.status(500).json({ message: 'internal server error' });
          }
          return res.status(400).json({ message: 'bad request' });
        })
    }
    return res.status(201).json();
  }

  async delete(req: Request, res: Response) {
    const { user_id }  = req.headers;
    const { appid } = req.params;
    if(!user_id || !appid) {
      return res.status(400).json({ message: 'bad request' });
    }

    
    if (typeof user_id === 'string') { 
      await favorite.delete(Number(user_id), Number(appid))
        .catch(err => {
          if(err.code === 500){
            return res.status(500).json({ message: 'internal server error' });
          }
          return res.status(400).json({ message: 'bad request' });
        })
    }
    const cached = await cache.getData('favorites');
    if(cached) {
      cache.deleteData('favorites');
    }
    return res.status(204).json();
  }
}

export default new FavoriteController();