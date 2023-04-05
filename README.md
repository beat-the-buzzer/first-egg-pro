# First-Egg-Pro

测试

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

```bash
$ npm init egg --type=simple  
```

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

[egg]: https://eggjs.org

### egg有哪些应用

- 开发网站

使用renderView方法，用模板引擎，将数据插入，返回html作为body，浏览器端就可以访问了。

- 开发工具接口

controller/imgTools.js中编写了一个接口，传入第三方图片地址和图片名称，将该图片下载到自己的服务器中。

为了便于看效果，直接设置成get请求，将下面的链接直接输入浏览器中，就能看到效果

```
http://127.0.0.1:7001/img/download/upload?imgUrl=https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png&name=PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png
```