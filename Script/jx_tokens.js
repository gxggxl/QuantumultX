/*
 * @Author: whyour
 * @Github: https://github.com/whyour
 * @Date: 2021-02-03 12:30:44
 * @LastEditors: whyour
 * @LastEditTime: 2021-02-03 12:50:49
 * 获取京喜tokens方式
 * 打开京喜农场，手动完成任意任务，必须完成任务领到水滴，提示获取cookie成功
 * 打开京喜工厂，收取电力，提示获取cookie成功
 * 打开京喜财富岛，手动成功提现一次，提示获取cookie成功

  hostname = wq.jd.com, m.jingxi.com

  # quanx
  [rewrite_local]
  ^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
  ^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
  ^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js

  # loon
  [Script]
  http-request ^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js, requires-body=false, timeout=10, tag=京喜token
  http-request ^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js, requires-body=false, timeout=10, tag=京喜token
  http-request ^^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js, requires-body=false, timeout=10, tag=京喜token

  # surge
  [Script]
  京喜token = type=http-request,pattern=^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
  京喜token = type=http-request,pattern=^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
  京喜token = type=http-request,pattern=^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
 *
 **/

const jxNcTokenKey1 = 'jxnc_token1';
const jxNcTokenKey2 = 'jxnc_token2';
const jxTokens = 'jx_tokens';
const ncTokenRegex = /^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask/;
const gcTokenRegex = /^https\:\/\/m\.jingxi\.com\/dreamfactory\/generator\/CollectCurrentElectricity/;
const cfdTokenRegex = /^https\:\/\/m\.jingxi\.com\/jxcfd\/consume\/CashOut/;
const $ = new Env('京喜token');

const url = $request.url;
const headers = $request.headers;

if (ncTokenRegex.test(url)) {
    try {
        const query = url.split('?')[1];
        const params = query.split('&');
        let obj = {};
        for (let i = 0; i < params.length; i++) {
            const [key, value] = params[i].split('=');
            obj[key] = value;
        }
        if (!headers['Cookie']) {
            $.logErr(`京喜写入Token失败，未从headers中获取到cookie`);
        }
        if (!obj['farm_jstoken'] || !obj.phoneid || !obj.timestamp) {
            $.logErr(`京喜写入Token失败，未获取到token请手动完成其他任务`);
        }
        let pin = headers['Cookie'].match(/pt_pin\=(\S*)\;/)[1];
        pin = decodeURIComponent(pin.split(';')[0]);
        obj.pin = pin;
        writeToken(obj);
    } catch (err) {
        $.logErr(`京喜农场写入Token失败，执行异常：${err}。`);
        $.msg($.name, '❌京喜农场写入Token失败');
    }
}

if (gcTokenRegex.test(url)) {
    try {
        const query = url.split('?')[1];
        const params = query.split('&');
        let obj = {};
        for (let i = 0; i < params.length; i++) {
            const [key, value] = params[i].split('=');
            obj[key] = value;
        }
        if (!headers['Cookie']) {
            $.logErr(`京喜写入Token失败，未从headers中获取到cookie`);
        }
        if (!obj.apptoken || !obj.phoneID || !obj.pgtimestamp) {
            $.logErr(`京喜写入Token失败，未获取到token请手动完成其他任务`);
        }
        let pin = headers['Cookie'].match(/pt_pin\=(\S*)\;/)[1];
        pin = decodeURIComponent(pin.split(';')[0]);
        const payload = {
            farm_jstoken: obj.apptoken,
            pin,
            phoneid: obj.phoneID,
            timestamp: obj.pgtimestamp,
        };
        writeToken(payload);
    } catch (err) {
        $.logErr(`京喜农场写入Token失败，执行异常：${err}。`);
        $.msg($.name, '❌京喜农场写入Token失败');
    }
}

if (cfdTokenRegex.test(url)) {
    try {
        const query = url.split('?')[1];
        const params = query.split('&');
        let obj = {};
        for (let i = 0; i < params.length; i++) {
            const [key, value] = params[i].split('=');
            obj[key] = value;
        }
        if (!headers['Cookie']) {
            $.logErr(`京喜写入Token失败，未从headers中获取到cookie`);
        }
        if (!obj.strPgUUNum || !obj.strPhoneID || !obj.strPgtimestamp) {
            $.logErr(`京喜写入Token失败，未获取到token请手动完成其他任务`);
        }
        let pin = headers['Cookie'].match(/pt_pin\=(\S*)\;/)[1];
        pin = decodeURIComponent(pin.split(';')[0]);
        const payload = {
            farm_jstoken: obj.strPgUUNum,
            pin,
            phoneid: obj.strPhoneID,
            timestamp: obj.strPgtimestamp,
        };
        writeToken(payload);
    } catch (err) {
        $.logErr(`京喜写入Token失败，执行异常：${err}。`);
        $.msg($.name, '❌京喜写入Token失败');
    }
}

function writeToken(obj) {
    const {pin, phoneid, timestamp} = obj;
    const result = {farm_jstoken: obj['farm_jstoken'], phoneid, timestamp, pin};
    let tokens = JSON.parse($.getdata(jxTokens) || '[]');

    const token1 = JSON.parse($.getdata(jxNcTokenKey1) || '{}');
    const token2 = JSON.parse($.getdata(jxNcTokenKey2) || '{}');
    if (token2 && token2.pin) {
        const token = tokens.find(x => x.pin === token2.pin);
        if (token) {
            $.setdata('', jxNcTokenKey2);
            tokens.unshift(token);
        }
    }
    if (token1 && token1.pin) {
        const token = tokens.find(x => x.pin === token1.pin);
        if (token) {
            $.setdata('', jxNcTokenKey1);
            tokens.unshift(token);
        }
    }

    let tokenIndex = tokens.findIndex(x => x.pin === pin);
    let tip = '写入';
    if (tokenIndex === -1) {
        tokenIndex = tokens.length + 1;
        tokens.push(result);
    } else {
        tokens[tokenIndex] = result;
        tokenIndex = tokenIndex + 1;
        tip = '更新';
    }
    tokens = uniq(tokens);
    $.setdata(JSON.stringify(tokens), jxTokens);
    $.log(`京喜【账号 ${tokenIndex}】: ${pin} \ntoken: ${JSON.stringify(result)}`);
    $.msg($.name, `账号: ${pin} 设备: ${obj.phoneid.slice(0, 10)}...`, `${tip}京喜【账号 ${tokenIndex}】Token成功 🎉`);
}

function uniq(array) {
    let hash = {};
    const result = array.filter(x => !!x.pin).reduce((arr, current) => {
        hash[current.pin] ? '' : hash[current.pin] = true && arr.push(current);
        return arr
    }, [])
    return result;
}

$.done();

// prettier-ignore
function Env(name, opts) {
    class Http {
        constructor(env) {
            this.env = env
        }

        send(opts, method = 'GET') {
            opts = typeof opts === 'string' ? {url: opts} : opts
            let sender = this.get
            if (method === 'POST') {
                sender = this.post
            }
            return new Promise((resolve, reject) => {
                sender.call(this, opts, (err, resp, body) => {
                    if (err) reject(err)
                    else resolve(resp)
                })
            })
        }

        get(opts) {
            return this.send.call(this.env, opts)
        }

        post(opts) {
            return this.send.call(this.env, opts, 'POST')
        }
    }

    return new (class {
        constructor(name, opts) {
            this.name = name
            this.http = new Http(this)
            this.data = null
            this.dataFile = 'box.dat'
            this.logs = []
            this.isMute = false
            this.isNeedRewrite = false
            this.logSeparator = '\n'
            this.startTime = new Date().getTime()
            Object.assign(this, opts)
            this.log('', `🔔${this.name}, 开始!`)
        }

        isNode() {
            return 'undefined' !== typeof module && !!module.exports
        }

        isQuanX() {
            return 'undefined' !== typeof $task
        }

        isSurge() {
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
        }

        isLoon() {
            return 'undefined' !== typeof $loon
        }

        isShadowrocket() {
            return 'undefined' !== typeof $rocket
        }

        toObj(str, defaultValue = null) {
            try {
                return JSON.parse(str)
            } catch {
                return defaultValue
            }
        }

        toStr(obj, defaultValue = null) {
            try {
                return JSON.stringify(obj)
            } catch {
                return defaultValue
            }
        }

        getjson(key, defaultValue) {
            let json = defaultValue
            const val = this.getdata(key)
            if (val) {
                try {
                    json = JSON.parse(this.getdata(key))
                } catch {
                }
            }
            return json
        }

        setjson(val, key) {
            try {
                return this.setdata(JSON.stringify(val), key)
            } catch {
                return false
            }
        }

        getScript(url) {
            return new Promise((resolve) => {
                this.get({url}, (err, resp, body) => resolve(body))
            })
        }

        runScript(script, runOpts) {
            return new Promise((resolve) => {
                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
                const [key, addr] = httpapi.split('@')
                const opts = {
                    url: `http://${addr}/v1/scripting/evaluate`,
                    body: {script_text: script, mock_type: 'cron', timeout: httpapi_timeout},
                    headers: {'X-Key': key, 'Accept': '*/*'}
                }
                this.post(opts, (err, resp, body) => resolve(body))
            }).catch((e) => this.logErr(e))
        }

        loaddata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                if (isCurDirDataFile || isRootDirDataFile) {
                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
                    try {
                        return JSON.parse(this.fs.readFileSync(datPath))
                    } catch (e) {
                        return {}
                    }
                } else return {}
            } else return {}
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                const jsondata = JSON.stringify(this.data)
                if (isCurDirDataFile) {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                } else if (isRootDirDataFile) {
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)
                } else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                }
            }
        }

        lodash_get(source, path, defaultValue = undefined) {
            const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
            let result = source
            for (const p of paths) {
                result = Object(result)[p]
                if (result === undefined) {
                    return defaultValue
                }
            }
            return result
        }

        lodash_set(obj, path, value) {
            if (Object(obj) !== obj) return obj
            if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
            path
                .slice(0, -1)
                .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                path[path.length - 1]
                ] = value
            return obj
        }

        getdata(key) {
            let val = this.getval(key)
            // 如果以 @
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objval = objkey ? this.getval(objkey) : ''
                if (objval) {
                    try {
                        const objedval = JSON.parse(objval)
                        val = objedval ? this.lodash_get(objedval, paths, '') : val
                    } catch (e) {
                        val = ''
                    }
                }
            }
            return val
        }

        setdata(val, key) {
            let issuc = false
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objdat = this.getval(objkey)
                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
                try {
                    const objedval = JSON.parse(objval)
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                } catch (e) {
                    const objedval = {}
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                }
            } else {
                issuc = this.setval(val, key)
            }
            return issuc
        }

        getval(key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.read(key)
            } else if (this.isQuanX()) {
                return $prefs.valueForKey(key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                return this.data[key]
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        setval(val, key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.write(val, key)
            } else if (this.isQuanX()) {
                return $prefs.setValueForKey(val, key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                this.data[key] = val
                this.writedata()
                return true
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        initGotEnv(opts) {
            this.got = this.got ? this.got : require('got')
            this.cktough = this.cktough ? this.cktough : require('tough-cookie')
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            if (opts) {
                opts.headers = opts.headers ? opts.headers : {}
                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
                    opts.cookieJar = this.ckjar
                }
            }
        }

        get(opts, callback = () => {
        }) {
            if (opts.headers) {
                delete opts.headers['Content-Type']
                delete opts.headers['Content-Length']
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {'X-Surge-Skip-Scripting': false})
                }
                $httpClient.get(opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {hints: false})
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {statusCode: status, statusCode, headers, body} = resp
                        callback(null, {status, statusCode, headers, body}, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                this.got(opts)
                    .on('redirect', (resp, nextOpts) => {
                        try {
                            if (resp.headers['set-cookie']) {
                                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                                if (ck) {
                                    this.ckjar.setCookieSync(ck, null)
                                }
                                nextOpts.cookieJar = this.ckjar
                            }
                        } catch (e) {
                            this.logErr(e)
                        }
                        // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                    })
                    .then(
                        (resp) => {
                            const {statusCode: status, statusCode, headers, body} = resp
                            callback(null, {status, statusCode, headers, body}, body)
                        },
                        (err) => {
                            const {message: error, response: resp} = err
                            callback(error, resp, resp && resp.body)
                        }
                    )
            }
        }

        post(opts, callback = () => {
        }) {
            const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
            if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
            if (opts.headers) delete opts.headers['Content-Length']
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {'X-Surge-Skip-Scripting': false})
                }
                $httpClient[method](opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                opts.method = method
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {hints: false})
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {statusCode: status, statusCode, headers, body} = resp
                        callback(null, {status, statusCode, headers, body}, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                const {url, ..._opts} = opts
                this.got[method](url, _opts).then(
                    (resp) => {
                        const {statusCode: status, statusCode, headers, body} = resp
                        callback(null, {status, statusCode, headers, body}, body)
                    },
                    (err) => {
                        const {message: error, response: resp} = err
                        callback(error, resp, resp && resp.body)
                    }
                )
            }
        }

        /**
         *
         * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
         *    :$.time('yyyyMMddHHmmssS')
         *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
         *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
         * @param {string} fmt 格式化参数
         * @param {number} 可选: 根据指定时间戳返回格式化日期
         *
         */
        time(fmt, ts = null) {
            const date = ts ? new Date(ts) : new Date()
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (let k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            return fmt
        }

        /**
         * 系统通知
         *
         * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
         *
         * 示例:
         * $.msg(title, subt, desc, 'twitter://')
         * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         *
         * @param {*} title 标题
         * @param {*} subt 副标题
         * @param {*} desc 通知详情
         * @param {*} opts 通知参数
         *
         */
        msg(title = name, subt = '', desc = '', opts) {
            const toEnvOpts = (rawopts) => {
                if (!rawopts) return rawopts
                if (typeof rawopts === 'string') {
                    if (this.isLoon()) return rawopts
                    else if (this.isQuanX()) return {'open-url': rawopts}
                    else if (this.isSurge()) return {url: rawopts}
                    else return undefined
                } else if (typeof rawopts === 'object') {
                    if (this.isLoon()) {
                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                        return {openUrl, mediaUrl}
                    } else if (this.isQuanX()) {
                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                        return {'open-url': openUrl, 'media-url': mediaUrl}
                    } else if (this.isSurge()) {
                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
                        return {url: openUrl}
                    }
                } else {
                    return undefined
                }
            }
            if (!this.isMute) {
                if (this.isSurge() || this.isLoon()) {
                    $notification.post(title, subt, desc, toEnvOpts(opts))
                } else if (this.isQuanX()) {
                    $notify(title, subt, desc, toEnvOpts(opts))
                }
            }
            if (!this.isMuteLog) {
                let logs = ['', '==============📣系统通知📣==============']
                logs.push(title)
                subt ? logs.push(subt) : ''
                desc ? logs.push(desc) : ''
                console.log(logs.join('\n'))
                this.logs = this.logs.concat(logs)
            }
        }

        log(...logs) {
            if (logs.length > 0) {
                this.logs = [...this.logs, ...logs]
            }
            console.log(logs.join(this.logSeparator))
        }

        logErr(err, msg) {
            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            if (!isPrintSack) {
                this.log('', `❗️${this.name}, 错误!`, err)
            } else {
                this.log('', `❗️${this.name}, 错误!`, err.stack)
            }
        }

        wait(time) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }

        done(val = {}) {
            const endTime = new Date().getTime()
            const costTime = (endTime - this.startTime) / 1000
            this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
            this.log()
            if (this.isSurge() || this.isQuanX() || this.isLoon()) {
                $done(val)
            }
        }
    })(name, opts)
}