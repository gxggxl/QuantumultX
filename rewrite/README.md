# rewrite

## jdtb_price

不生效或失效的需要卸载 tb 重装，注意不开脚本进 tb 会失效
tb历史价格在**保障**哪里显示

```
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/jd_tb_price.conf
```

## 获取阅读 weixin Cookie

- 获取阅读 Cookie `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf`
    - 云扫码
    - 番茄看看
    - 微客众智
    - 悦趣阅读
    - ~~千禾阅读~~
      > a. 启用 `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf` 获取 cookie <br>
      > b. 禁用（a），启用 `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadBody.conf` 获取任务列表

```
[rewrite_remote]
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf, tag=获取阅读Cookie, update-interval=86400, opt-parser=false, enabled=true
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadBody.conf, tag=获取阅读BODY, update-interval=86400, opt-parser=false, enabled=true
```

## 中青

[中青极速版](./Youth/README.md)

## getCookie

`https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getCookie.conf`

### 包含以下

- 微信小程序：keep早起打卡
- App Store: 易趣牛帮