import {LANGUAGE_KEY} from "../../../vue-speedy/src/const";
import _endsWith from 'lodash/endsWith'
import _startsWith from 'lodash/startsWith'

export const setSiteTitle = (title, reset = false) => {
    if (reset) {
        document.title = title
    } else {
        let titles = document.title.split('|')
        document.title = title + ' | ' + titles[titles.length - 1]
    }
}

/**
 * 将对象转化成表单参数 FormData
 * @param object
 * @returns {FormData}
 */
export const toFormData = (object) => {
    let formData = new FormData()
    Object.keys(object).forEach(key => {
        formData.append(key, object[key])
    })
    return formData
}

/**
 * 清理Object，将值为空的属性去掉
 * @param obj
 */
export const clearObj = obj => {
    let target = {};
    Object.keys(obj).forEach(key => {
        if (obj[key])
            target[key] = obj[key]
    });
    return target;
};


/**
 * 获取response error code
 * @param err
 * @returns {*}
 */
export const getErrorCode = (err) => {
    if (err.response && err.response.data && err.response.data.code) {
        return err.response.data.code
    } else {
        return null
    }
}

export const _map = (list, key) => {
    let temp = [];
    (list || []).forEach(o => {
        temp.push(o[key])
    })
    return temp
}


/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

export const setLocale = (language) => {
    window.localStorage.setItem(LANGUAGE_KEY, language)
}

export const getLocale = () => {
    return window.localStorage.getItem(LANGUAGE_KEY)
}

export const appendPath = (prefix, path) => {
    if (_endsWith(prefix, '/')) {
        prefix = prefix.slice(0, -1)
    }
    if (_startsWith(path, '/')) {
        path = path.slice(1)
    }
    return prefix + '/' + path
}
