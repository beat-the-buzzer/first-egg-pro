'use strict';
const Service = require('egg').Service;


class UserService extends Service {

  // 增加
  async add(uid) {
    const user = await this.app.database.get('my_user', { uid });
    return user
  }
  
  // 数据库中查询用户
  async find(uid) {
    const user = await this.app.database.get('my_user', { uid });
    return user
  }

}
module.exports = UserService;
