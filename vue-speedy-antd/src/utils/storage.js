import lscache from 'lscache'
import Cookies from 'js-cookie'

const TOKEN_KEY = "Token"
const HOLDER_KEY = "Holder"

/**
 * 本地保存
 */
export const localSave = (key, value) => {
    lscache.set(key, value)
}
/**
 * 本地获取
 */
export const localGet = (key) => {
    return lscache.get(key)
}
/**
 * 本地删除
 */
export const localRemove = (key) => {
    lscache.remove(key)
}

export const setToken = (token, expires) => {
    Cookies.set(TOKEN_KEY, token, {expires: expires})
}

export const getToken = () => {
    return Cookies.get(TOKEN_KEY)
}

export const removeToken = () => {
    return Cookies.remove(TOKEN_KEY)
}


export const setHolder = (holder, expires) => {
    console.log(holder, expires)
    Cookies.set(HOLDER_KEY, holder, {expires: expires})
}


export const getHolder = () => {
    return Cookies.get(HOLDER_KEY)
}

export const removeHolder = () => {
    return Cookies.remove(HOLDER_KEY)
}