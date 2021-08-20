import axios from 'axios';
import knex from '../database';

class Favorite {
  async findAllFavorites() {      
    const favorites = await knex('favorites').orderBy('favorite_id');
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
    const app = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${app_id}`);
    if(app.status !== 200 || !app.data[`${app_id}`].success) {
      return false;
    }

    const favorite_id = await knex('favorites').insert({user_id: user_id, app_id: app_id, nota: nota});
    const favorite = await knex('favorites').where('favorite_id', favorite_id[0]);
    return favorite[0];
  }

  async delete(user_id: number, app_id: number) {
    const favorite = await knex('favorites').where('app_id', app_id);
    if (favorite.length === 0) {
      return false;
    }
    return true;
  }
}

export default new Favorite();