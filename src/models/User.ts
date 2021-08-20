import knex from '../database';

class User {
  async findAllUsers() {
    const users = await knex('users').select('*')
    return users;
  }
  async create(name: string) {
    const id = await knex('users').insert({name: name});
    const user = await knex('users').where('id', id);
    return user[0];
  }
}

export default new User();