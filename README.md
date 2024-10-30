### ChatGPT演示
这个一个简单的模拟chatgpt聊天，利用openrouter提供的免费model “mistralai/mistral-7b-instruct:free”，作为API的调用后台，时间有限，只实现了基本的聊天功能，没有做ui

1. 安装依赖
```bash
npm i

```
2. 配置key

在根目录下修改`.env.local`文件，将其中第一行修改为自己的key

3. 启动服务

```bash
npm run dev
```
