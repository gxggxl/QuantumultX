# rewrite

- 获取阅读 Cookie `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf`
    - 云扫码
    - 番茄看看
    - 微客众智
    - 悦趣阅读
    - 千禾阅读
        1. 启用 `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf` 获取 cookie
        2. 禁用（1），启用 `https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadBody.conf` 获取任务列表
    

```
[rewrite_remote]
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadCookie.conf, tag=获取阅读Cookie, update-interval=86400, opt-parser=false, enabled=true
https://raw.githubusercontent.com/gxggxl/QuantumultX/master/rewrite/getReadBody.conf, tag=获取阅读BODY, update-interval=86400, opt-parser=false, enabled=true
```