import { Router, Request, Response } from 'express';
import axios from 'axios';

interface games {
  appid: number;
  name: string;
}

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  
  const data = await axios.get(' https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');

  const appList = data.data.applist['apps'].map((app: games) => app);
  return res.json(appList);
});

router.get('/:id', async (req: Request, res: Response) => {

  const { id } = req.params;
  const app = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
  .then(response => {
    const app = response.data;
    return app[id];
  })
  .catch(err => {
    if(err.code === 400){
      return res.status(400).json({ message: 'bad request' });
    }
    if(err.code === 404){
      return res.status(404).json({ message: 'not found' });
    }
  });
  return res.json(app.data);
});

export default router;