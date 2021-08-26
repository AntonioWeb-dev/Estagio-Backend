import { Request, Response } from "express";
import cache from '../cache';
import axios from 'axios';

interface games {
  appid: number;
  name: string;
}

class AppController {

  async index(req: Request, res: Response) {
    const cached = await cache.getData('allApps');
    if(cached) {
      return res.json(cached);
    }
    let appList: games[];
    try {
      const data = await axios.get('https://simple-api-selection.herokuapp.com/list-games/?title=black');
      appList = data.data.applist.apps;
      cache.setData('allApps', {...appList}, 60*10);
      
    } catch (err) {
      return res.status(err.status);
    }
    return res.json(appList);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const cached = await cache.getData(id);
    if(cached) {
      return res.json(cached);
    }
  
    const app = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
    .then(response => {
      if(response.status !== 200 || !response.data[`${id}`].success) {
        return res.status(404).json({ message: 'not found' });
      }
      const app = response.data;
      return app[id];
    })
    .catch(err => {
      if(err.code === 400){
        return res.status(400).json({ message: 'bad request' });
      }
    });
  
    cache.setData(id, app.data, 60*10);
    return res.json(app.data);
  }
}

export default new AppController();