'use strict';

const { Controller } = require('egg')
const fs = require('fs-extra');
const path = require('path')
const { pipeline } = require('stream')

class ImgToolsController extends Controller {
  async index() {
    const { ctx } = this;
    let query = ctx.request.query
    let { imgUrl, name } = query
    const result = await this.download(imgUrl, name)
    if(result) {
      // 图片下载成功 读取下载后的图片，上传到我们自己的服务器中
      var file = await this.upload(imgUrl, name)
      this.ctx.body = file
    } else {
      this.ctx.body = '图片下载失败'
    }
  }

  // 根据url和name下载图片
  async download (url, name) {
		const { ctx } = this;
		try {
			const imagePath = path.join(path.dirname(__dirname), '../tempImages', name)
			const dirPath = path.join(path.dirname(__dirname), '../tempImages')
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(path.join(path.dirname(__dirname), '../tempImages'))
			}
			if (fs.existsSync(imagePath)) {
				return true
			} else {
        let result = await ctx.curl(url, { dataType: 'buffer' }) // 直接用buffer的方式获取数据
				fs.writeFileSync(imagePath, result.data) // 这个是同步的方法
				return true
			}
		} catch (error) {
			console.log('下载报错', error)
			return false
		}
	}

  // 读取本地图片，进行上传操作
  async upload (imgUrl, name) {
    const { ctx } = this;
    var imagePath = path.join(path.dirname(__dirname), '../tempImages', name)

    if (fs.existsSync(imagePath)) {
      // 本地图片已存在
      let stream = fs.createReadStream(imagePath)
      const chunks = [];

      // 分片读取图片
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      })

      // 异步监听
      async function readStream(stream) {
        await new Promise((resolve, reject) => {
          stream.on('end', resolve);
          stream.on('error', reject);
        })
        // 图片读取完成，chunks就是完整的图片数据  
      }
      await readStream(stream)
      // const files = Buffer.concat(chunks) // 在这一行，就能获取到完整的图片数据了
      return '图片保存成功，新链接是' + imagePath
    } else {
      return imgUrl + '没有保存成功'
    }
  }
}

module.exports = ImgToolsController;
