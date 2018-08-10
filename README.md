[![](https://o77qb5l10.qnssl.com/avi.png)](https://avi.run)

> Lightweight and simple pictures uploading tool supports multiple cloud storage. Support uploading pictures by image link, picture file, QQ screenshot, etc.

[![Build Status](https://flat.badgen.net/circleci/github/Army-U/avi/master)](https://circleci.com/gh/Army-U/avi) [![npm package](https://flat.badgen.net/npm/v/avi)](https://www.npmjs.com/package/avi)

[中文文档](https://docs.avi.run/#/zh-cn/) | [中文版](https://avi.run?lng=zh) | [中文 README](README.zh.md)

## Terms and Conditions

- **Must have the ability to access the Google process**
- Do not upload any important, private or Illegal resources
- Custom cloud storage requires Google authorization and stores user information on the [avi.run](https://avi.run) server
- [How to ensure the security of your information?](#safety)
- The default figure bed is [sm.ms](https://sm.ms/) (The default figure bed is not under the control of the user, please upload carefully)

## Features

- Supports uploading pictures using image files, WeChat/QQ screenshots, and image links
- Support multiple cloud storage providers, Imgur、Flickr、Amazon S3 and etc
- Internationalization support ([中文版](https://avi.run/?lng=zh) | [English Version](https://avi.run/))
- Offline access (PWA)
- Mobile support
- Nighttime theme

## Safety

### Security account

**Only** Use custom storage will store your information about the figure bed settings on the [avi.run](https://avi.run) server, the default figure bed is not affected. Turn on the figure bed setup please Make sure to use the cloud service provider's **sub account** and set **read-only, upload-only** permissions. This reduces the risk of storing Token information on third-party websites such as [avi.run](https://avi.run).

All cloud storage open subaccount tutorial links are as follows:

- [Amazon - IAM](https://console.aws.amazon.com/iam/home#/users)
- [Aliyun - Login Console](https://www.alibabacloud.com/help/zh/doc-detail/27363.htm)
- [Tencent Cloud - Subaccount permissions configuration](https://cloud.tencent.com/document/product/436/11714)
- [Upyun - Subaccount Management](http://docs.upyun.com/cdn/tools/)
- [Qiniu - Create a secret key](https://portal.qiniu.com/user/key)

### Source code

Currently, the code outside of the configuration file has been open source: [Client Repo](https://github.com/Army-U/avi) | [Server Repo](https://github.com/Army-U/avi-api)

## Todo

- [x] OCR support
- [ ] Google Image Search
- [ ] Native client

## LICENSE

MIT

Copyright (c) 2017-present, Army-U
