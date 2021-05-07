# Rewrite remote

## 历史价格

不生效或失效的需要卸载 taobao 重装，注意不开脚本进 taobao 会失效
taobao历史价格在 **保障** 哪里显示

- \[rewrite_remote] URL
```
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/jd_tb_price.conf
```

## 中青

[中青极速版](./Youth/README.md)

## 获取阅读 Cookie

- 获取阅读 Cookie `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf`

> a. 启用 `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf` 获取 cookie <br>
> b. 禁用（a），启用 `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadBody.conf` 获取任务列表

```
[rewrite_remote]
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf, tag=获取阅读Cookie, update-interval=86400, opt-parser=false, enabled=true
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadBody.conf, tag=获取阅读BODY, update-interval=86400, opt-parser=false, enabled=true
```


## getCookie

`https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getCookie.conf`

### 包含以下

- ~~微信小程序:~~
- ~~App Store:~~