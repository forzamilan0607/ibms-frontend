## 使用技术
1. nodejs
2. ES6
3. vue-cli
4. vue
5. vue-router
6. vuex
7. axios
8. vue-cookie
9. element-ui
10. iconfont
## 安装部署项目
1. 克隆项目

   git clone https://github.com/forzamilan0607/ibms-frontend.git
2. 安装依赖

   npm install -g cnpm --registry=https://registry.npm.taobao.org
   
   cnpm install (第二种方式)
3. 启动服务

   npm run dev
 
4. 打包和发布

  npm run build 在应用根目录下生成 dist 文件夹，上传到服务器
  
  服务器使用 nginx 代理访问，监听 8091 端口
  

## 修改 API 地址
/static/config/index.js 目录文件中 window.SITE_CONFIG['baseUrl'] = '本地api接口请求地址';

## Cannot find module 'opn' 解决办法
删除 node_modules 目录，重新安装—— cnpm install

