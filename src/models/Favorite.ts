import axios from 'axios';
import knex from '../database';

class Favorite {
  async findAllFavorites() {      
    const favorites = await knex('favorites').select('*');
    const apps = favorites.map((favorite) => {
      return axios.get(`https://store.steampowered.com/api/appdetails?appids=${favorite.app_id}`)
        .then(result => {
          const app = result.data;
          return {favorite, ...app[favorite.app_id].data};
        });
    });
    return await Promise.all(apps);
  }
  async create(user_id: number, app_id: number, nota=0) {
    await knex('favorites').insert({user_id: user_id, app_id: app_id, nota: nota});
    return true;
  }
  async delete(user_id: number, app_id: number) {
    await knex('favorites').del().where({user_id: user_id, app_id: app_id});
    return true;
  }
}

export default new Favorite();