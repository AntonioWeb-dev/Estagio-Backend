import knex from '../database';

class User {
  async findAllUsers() {
    const users = await knex('users').select('*')
    return users;
  }
  async create(name: string) {
    await knex('users').insert({name: name});
    return true;
  }
}

export default new User();