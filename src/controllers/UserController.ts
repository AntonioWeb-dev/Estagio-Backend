import { Request, Response } from "express";
import user from '../models/User';

class UserController {

  async index(req: Request, res: Response) {
    const users = await user.findAllUsers();
    return res.json(users);
  }
  async create(req: Request, res: Response): Promise<any> {
    const { name } = req.body;
    const newUser = await user.create(name)
      .catch(err => {
        if(err.code === 500){
          return res.status(500).json({ message: 'internal server error' });
        }
        return res.status(400).json({ message: 'bad request' });
      })
    return res.status(200).json(newUser);
  }
}

export default new UserController();