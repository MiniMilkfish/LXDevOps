import fetch from 'isomorphic-fetch';
import jsonSafeStringify from 'json-stringify-safe';
import jsonSafeParse from 'safe-json-parse/tuple';
import Iconv from 'iconv-lite';
import RES_STATUS from './serverResStatus';

//跳过解码警告
Iconv.skipDecodeWarning = true;

/**
 * HTTP POST请求
 * @param {String} url
 * @param {Object} body
 * @param {Function} callback
 * @param {Object} extra
 * @param {Boolean} [isFullRes=false] true 返回配置文件原内容的json对象;false 返回后端res.data 的json对象
 * */
export function fetchPost(url, body = {}, callback, extra, isFullRes) {
    let fetchParam = {
        mode: "cors",
        timeout: 20 * 1000,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": 'Bearer ' + getItem('t')
        },
        method: 'POST',
        body: jsonStringify(body)
    };

    return fetch(
        url,
        fetchParam
    ).then(
        response => checkFetchStatus(response)
    ).then(json => {
        handlerFetchResponse(url, json, extra, isFullRes, callback);
    }).catch(error => {
        handlerFetchError(url, error, extra);
    });
}

/**
 * HTTP POST form-data 提交文件
 * @param {String} url
 * @param {Object} body
 * @param {Function} callback
 * @param {Object} extra
 * @param {Boolean} [isFullRes=false] true 返回配置文件原内容的json对象;false 返回后端res.data 的json对象
 * */
export function fetchPost_FormData(url, body = {}, callback, extra, isFullRes) {
    let formData = new FormData();
    Object.keys(body).map(item => {
        formData.append(item, body[item]);
        return true;
    });

    let fetchParam = {
        mode: "cors",
        timeout: 20 * 1000,
        headers: {
            "Authorization": 'Bearer ' + getItem('t')
        },
        method: 'POST',
        body: formData
    };

    return fetch(
        url,
        fetchParam
    ).then(
        response => checkFetchStatus(response)
    ).then(json => {
        handlerFetchResponse(url, json, extra, isFullRes, callback);
    }).catch(error => {
        handlerFetchError(url, error, extra);
    });
}

/**
 * HTTP GET请求
 * @param {String} url
 * @param {Object} body
 * @param {Function} callback
 * @param {Object} extra
 * @param {Boolean} [isFullRes=false] true 返回配置文件原内容的json对象;false 返回后端res.data 的json对象
 * */
export function fetchGet(url, body = {}, callback, extra, isFullRes, download = false) {
    let fetchParam = {
        mode: "cors",
        timeout: 20 * 1000,
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            "Authorization": 'Bearer ' + getItem('t')
        },
        method: 'GET'
    };

    if (download) {
        return fetch(
            combineQueryUrl(url, body),
            fetchParam,
        ).then(
            response => response.blob().then(blob => {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(blob);
                var filename = response.headers.get('Content-Disposition');
                if (filename) {
                    //文件名前后移除双引号
                    filename = filename.slice(filename.indexOf('=') + 1, filename.length);
                    if (filename.indexOf('"') >= 0 && filename.lastIndexOf('"') >= 0) {
                        filename = filename.slice(1, filename.length - 1);
                    }

                    //解码
                    filename = Iconv.decode(filename, 'gbk');
                }
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
            })).catch(error => {
                handlerFetchError(url, error, extra);
            });
    } else {
        return fetch(
            combineQueryUrl(url, body),
            fetchParam,
        ).then(
            response => checkFetchStatus(response)
        ).then(json => {
            handlerFetchResponse(url, json, extra, isFullRes, callback);
        }).catch(error => {
            handlerFetchError(url, error, extra);
        });
    }
}

/**
 * 请求响应状态校验
 * @param {Object} response
 * */
function checkFetchStatus(response) {
    if (response.status !== void 0)
        return response.json();
    else
        return { "ERROR": "HTTP 请求异常" };
}

/**
 * 请求响应处理
 * @param {String} url
 * @param {Object} json
 * @param {Object} extra
 * @param {Boolean} isFullRes
 * @param {Function} callback
 * */
function handlerFetchResponse(_url, json, extra, isFullRes, callback) {
    if (json.code !== void 0) {
        if (json.code === RES_STATUS.SUCCESS) {
            callback(isFullRes? json: json.data);	                //成功的回调函数

            if (extra.actionSuccess !== void 0 && extra.route !== void 0) {
                //操作成功,页面跳转
                console.log('handlerFetchResponse: ', '操作成功,页面跳转')
                return true;
            }
            else if (extra.actionSuccess !== void 0) {
                //页面通知
                extra.actionSuccess(json.msg || '操作成功');
                return true;
            }
            else {
                // -仅作为数据展示,除非协议统一做预处理
                return true;
            }
        } else {
            extra.actionFailure(json.msg || '操作失败');
            return true;
        }
    } else {
        extra.actionFailure(jsonStringify(json));
        return true;
    }
}

/**
 * 请求错误处理
 * @param {String} url
 * @param {Object} error
 * @param {Object} extra
 * */
function handlerFetchError(url, error, extra) {
    console.log('handlerFetchError: ', url, error, extra)
    // if (extra.actionFailure) {
    // dispatch(extra.actionFailure(error.msg + '. 多半是GM服务端没开,抓紧的……'));

    // dispatch({ type: ACTION_TYPE.MASTER_NO_CHANGE });
    // }
}

/**
 * 合并GET请求字符串
 * @param {String} url 服务路径
 * @param {Object} params
 * @param {Boolean} encode 是否对字符Urlencode 编码
 */
export function combineQueryUrl(url, params, encode = true) {
    encode = encode == void 0 ? true : encode;

    let parts = [];
    for (let i in params) {
        if (params[i]) {
            encode ?
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]))
                :
                parts.push(i + "=" + params[i]);
        }
    }
    if (parts.length === 0) return url;
    return url + "?" + parts.join("&");
}

/**
 * 反序列化为JSON字符串
 *
 * @param {Object} obj
 * */
export function jsonStringify(obj) {
    let ret;
    try {
        ret = JSON.stringify(obj);
    } catch (e) {
        ret = jsonSafeStringify(obj);
    }
    return ret;
}

/**
 * 序列化为JSON对象
 *
 * @param {String} str
 * */
export function jsonParse(str) {
    let ret;
    try {
        ret = JSON.parse(str);
    } catch (e) {
        ret = jsonSafeParse(str)[1];
    }
    return ret;
}

/**
 * 获取现在的时间并格式化
 * @param {String} type
 *      a  标准时间格式 2015-10-10 10:10:10 (默认)
 *      b  14位时间格式 20151010101010
 *      c  13 位数时间戳
 *      d  10 位数时间戳
 *      e  2015.10.10
 * 		f  2015-10-10 10:10
 * 		g  8位时间格式 20151010
 *      h  2015-10-10
 *      u  ISO 时间格式 2018-04-08T02:43:12.511Z
 *      ff 小时：分钟, 示例：10:10
 *      默认格式为标准格式
 * @param {String} [date] 10、13位时间戳、UTC时间、ISO时间
 * */
export function getFormatDateNew(type, date) {
    if (/^1\d{9}/.test(date) && date.toString().length === 10) date = date * 1000;
    if (/^1\d{9}/.test(date) || /^1\d{12}/.test(date)) {
        date = typeof date === 'number' ? date : parseInt(date, 10);
    }
    let D = date !== void 0 ? new Date(date) : new Date();
    const _ = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'],
        y = D.getFullYear(),
        m = D.getMonth() + 1,
        d = D.getDate(),
        h = D.getHours(),
        i = D.getMinutes(),
        s = D.getSeconds();
    switch (type) {
        case 'a':
            return [y, _[m] || m, _[d] || d].join('-') + ' ' + [_[h] || h, _[i] || i, _[s] || s].join(':');
        case 'b':
            return [y, _[m] || m, _[d] || d, _[h] || h, _[i] || i, _[s] || s].join('');
        case 'c':
            return Number(D);
        case 'd':
            return Math.floor(Number(D) / 1000);
        case 'e':
            return [y, _[m] || m, _[d] || d].join('.');
        case 'f':
            return [y, _[m] || m, _[d] || d].join('-') + ' ' + [_[h] || h, _[i] || i].join(':');
        case 'g':
            return [y, _[m] || m, _[d] || d].join('');
        case 'h':
            return [y, _[m] || m, _[d] || d].join('-');
        case 'u':
            return D.toISOString();
        case 'ff':
            return [_[h] || h, _[i] || i].join(':');
        default:
            return [y, _[m] || m, _[d] || d].join('-') + ' ' + [_[h] || h, _[i] || i, _[s] || s].join(':');
    }
}

/**
 * 客户端缓存（Cookie）管理
 * 该部分实现已经由localStorage 替换
 * */
/**
 * set cookie
 * @param {String} key    [key]
 * @param {String} val    [value]
 * @param {String} days   [days]
 * @param {String} path   [path]
 * @param {String} domain [domain]
 */
export function setCookie(key, val, days, path, domain) {
    var expire = new Date();
    expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 30 * 24 * 60 * 60 * 1000)); // 默认1个月
    document.cookie = key + '=' + encodeURIComponent(val.toString()) + ';expires=' + expire.toGMTString() + ';path=' +
        (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
}

/**
 * del cookie
 * @param  {String} key    [key]
 * @param  {String} path   [path]
 * @param  {String} domain [domain]
 */
export function delCookie(key, path, domain) {
    var expires = new Date(0);
    document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ?
        ('domain=' + domain + ';') : '');
}

/**
 * get cookie
 * @param  {[type]} key [key]
 * @return {String}     [cookie value]
 */
export function getCookie(key) {
    var r = new RegExp("(?:^|;+|\\s+)" + key + "=([^;]*)");
    var m = window.document.cookie.match(r);
    return (!m ? "" : m[1]) || null;
}

/**
 * clear cookie
 * @param {String} key        [key]
 * */
export function clearCookie(key) {
    setCookie(key, '', 1);
}


/**
 * 客户端数据存储（LocalStorage）管理
 * */
/**
 * set localStorage
 * @param {String} key [key]
 * @param {String} val [value]
 */
export function setItem(key, val) {
    val = val.toString();
    if (typeof (window.Storage) !== 'undefined') {
        localStorage.setItem(key, val);
    }
    else {
        setCookie(key, val);
    }
}

/**
 * get localStorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getItem(key) {
    if (typeof (window.Storage) !== 'undefined') {
        return localStorage.getItem(key);
    }
    else {
        return getCookie(key);
    }
}

/**
 * delete localStorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function delItem(key) {
    if (typeof (window.Storage) !== 'undefined') {
        delete localStorage[key];
    }
    else {
        delCookie(key);
    }
}

/**
 * clear localStorage
 * @param {String} key    [key]
 * */
export function clearItem(key = null) {
    if (window.Storage !== void 0)
        localStorage.clear();
    else
        clearCookie(key);
}

/**
 * 该部分为JS数据类型的校验
 */
export function isType(type, obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}

export function isBoolean(obj) {
    return isType('Boolean', obj);
}

export function isNumber(obj) {
    return isType('Number', obj);
}

export function isString(obj) {
    return isType('String', obj);
}

export function isFunction(obj) {
    return isType('Function', obj);
}

export function isArray(obj) {
    return isType('Array', obj);
}

export function isDate(obj) {
    return isType('Date', obj);
}

export function isRegExp(obj) {
    return isType('RegExp', obj);
}

export function isObject(obj) {
    return isType('Object', obj);
}

export function isError(obj) {
    return isType('Error', obj);
}

/**
 * Object的深度拷贝
 * @param {Object} Obj
 * */
export function Clone(Obj) {
    if (Obj === null || 'object' !== typeof Obj) return Obj;
    if (Obj instanceof Date) {
        let copy = new Date();
        copy.setTime(Obj.getTime());
        return copy;
    }
    if (Obj instanceof Array) {
        let copy = [];
        for (let i = 0, len = Obj.length; i < len; i++) {
            copy[i] = Clone(Obj[i]);
        }
        return copy;
    }
    if (Obj instanceof Object) {
        let copy = {};
        for (let attr in Obj) {
            if (Obj[attr]) copy[attr] = Clone(Obj[attr]);
        }
        return copy;
    }
    throw new Error("Clone Error, Obj's type is not support!");
}

/**
 * DataUrl 转 Blob
 * @param {String} dataUrl
 * */
export function DataUrlToBlob(dataUrl) {
    let arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*);/)[1],
        bStr = atob(arr[1]),
        n = bStr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bStr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * 将 colorcode 转换为rgb()字符串。
 * // hexToRgb(‘#27ae60‘) -> ‘rgb(39, 174, 96)‘
 * // hexToRgb(‘#acd‘) -> ‘rgb(170, 204, 221)‘
 * @param {String} hex
 * */
export const hexToRgb = hex => {
    const extendHex = shortHex =>
        '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map(x => x + x).join('');
    const extendedHex = hex.slice(hex.startsWith('#') ? 1 : 0).length === 3 ? extendHex(hex) : hex;
    return `rgb(${parseInt(extendedHex.slice(1), 16) >> 16}, ${(parseInt(extendedHex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendedHex.slice(1), 16) & 0x0000ff})`;
};

/**
 * 将 RGB 组件的值转换为 colorcode
 * // RGBToHex(255, 165, 1) -> ‘ffa501‘
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * */
export const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

/**
 * 字符串转HTML避免XSS攻击
 * @param {String} str
 * */
export function strToHtmlEscape(str) {
    return str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

/**
 * 处理字符类型的参数
 * @return {String}
 * */
export function DealStringParamBeAString(str) {
    if (str === void 0 || str === null) {
        return '';
    }
    return str;
}

/**
 * 处理数组字符串为数组
 * @return {Array}
 * */
export function DealArrayStrParamBeAArray(arrStr, delimiter = ',') {
    if (arrStr === void 0 || arrStr === null) {
        return [];
    } else if (arrStr instanceof Array) {
        return arrStr;
    } else if (typeof arrStr === 'string' || typeof arrStr === 'number') {
        let arr = jsonParse(arrStr);
        if (arr === void 0 || arr === null) {
            return [];
        } else if (arr instanceof Array) {
            return arr;
        } else if (typeof arr === 'string' || typeof arr === 'number') {
            return arr.toString().split(delimiter);
        } else {
            let arrs = [];
            for (let i in arrStr) {
                arrs.push(arrStr[i]);
            }
            return arrs;
        }
    } else {
        let arrs = [];
        for (let i in arrStr) {
            arrs.push(arrStr[i]);
        }
        return arrs;
    }
}

/**
 * 验证对象的有效性
 * @param {Object||Array||String} obj
 */
export function validateObject(obj) {
    return (obj !== void 0 && obj !== null && obj !== 'null' && obj !== 'undefined');
}
