import { Router, Request, Response } from 'express';
import cache from '../cache';
import axios from 'axios';

interface games {
  appid: number;
  name: string;
}

const router = Router();

router.get('/', async (req: Request, res: Response) => {

  const cached = await cache.getData('allApps');
  if(cached) {
    return res.json(cached);
  }
  let appList: games[];
  try {
    const data = await axios.get(' https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
    appList = data.data.applist['apps'].map((app: games) => app);
  
    cache.setData('allApps', {...appList}, 60*10);
  } catch (err) {
    return res.status(err.status);
  }
  return res.json(appList);
});

router.get('/:id', async (req: Request, res: Response) => {
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
});

export default router;