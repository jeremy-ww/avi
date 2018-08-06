[![](https://o77qb5l10.qnssl.com/avi.png)](https://avi.run?lng=zh)

> 轻便简单的图床上传工具, 支持多家云存储. 支持以图片链接、图片文件、QQ 截图等方式上传图片

[![Build Status](https://flat.badgen.net/circleci/github/Army-U/avi/master)](https://circleci.com/gh/Army-U/avi) [![npm package](https://flat.badgen.net/npm/v/avi)](https://www.npmjs.com/package/avi)

[中文文档](https://docs.avi.run/#/zh-cn/) | [中文版本](https://avi.run?lng=zh) | [English README](README.md)

## 使用须知

- **一定要具备访问谷歌的能力** (服务器部署在国外, 请将 avi.run 添加至你的 PAC 列表)
- 请勿上传任何重要、隐私或者违反法律资源
- 自定义云存储需要 Google 授权且会存储用户信息在 [avi.run](https://avi.run) 服务器上
- [如何保证您的信息安全？](#安全)
- 默认图床是 [sm.ms](https://sm.ms/) (默认图床不在用户的控制范围内, 上传请慎重)

## 特性

- 支持以图片文件、微信/QQ 截图、图片链接方式上传图片
- 支持多家云存储商, 七牛、阿里云、腾讯云、又拍云等
- 国际化支持 [中文版](https://avi.run/?lng=zh) | [English Version](https://avi.run/)
- 离线访问 (PWA)
- 移动端支持
- 夜间主题

## 安全

### 安全账户

**只有**使用了自定义存储才会在 [avi.run](https://avi.run) 服务器上存储您关于图床设置的信息, 默认图床不受影响. 开启图床设置请确保使用了云服务商的**子账户**, 并且设置了**只读、只可上传**的权限. 这样能降低在第三方网站如 [avi.run](https://avi.run) 上存储 Token 信息的风险.

所有云存储开启子账户教程链接如下:

- [亚马逊 - IAM](https://console.aws.amazon.com/iam/home#/users)
- [阿里云 - 登录控制台](https://www.alibabacloud.com/help/zh/doc-detail/27363.htm)
- [腾讯云 - 子账号权限配置](https://cloud.tencent.com/document/product/436/11714)
- [又拍云 - 子账号管理](http://docs.upyun.com/cdn/tools/)
- [七牛云 - 创建密钥](https://portal.qiniu.com/user/key)

### 源代码

[avi.run](https://avi.run) 目前除去配置文件外代码已经开源: [客户端仓库地址](https://github.com/Army-U/avi) | [服务端仓库地址](https://github.com/Army-U/avi-api)

## 规划

- [x] OCR 支持
- [ ] Google 图片搜索
- [ ] Native 客户端

## 协议

MIT

Copyright (c) 2017-present, Army-U
