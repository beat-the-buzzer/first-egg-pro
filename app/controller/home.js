'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = {
      keywords: '关键字',
      description: '描述',
      title: '标题',
      bodyHtml: '<h1>Hello World</h1>'
    }
    ctx.body = await ctx.renderView('/home.njk', data)
  }
}

module.exports = HomeController;
