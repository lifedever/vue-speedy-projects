import lscache from 'lscache'
import Cookies from 'js-cookie'

const TOKEN_KEY = "Token"
const OPEN_TOKEN_KEY = "UserToken"
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

export const localClear = () => {
    lscache.flush()
}

export const setToken = (token, expires) => {
    Cookies.set(TOKEN_KEY, token, { expires: expires })
}

export const getToken = () => {
    return Cookies.get(TOKEN_KEY)
}

export const removeToken = () => {
    return Cookies.remove(TOKEN_KEY)
}


export const setOpenToken = (token, expires) => {
    Cookies.set(OPEN_TOKEN_KEY, token, { expires: expires })
}

export const getOpenToken = () => {
    return Cookies.get(OPEN_TOKEN_KEY)
}

export const removeOpenToken = () => {
    return Cookies.remove(OPEN_TOKEN_KEY)
}

export const cookieSet = (key, value, expires) => {
    Cookies.set(key, value, { expires: expires })
}

export const cookieGet = (key) => {
    return Cookies.get(key)
}

export const removeCookie = (key) => {
    return Cookies.remove(key)
}


export const setHolder = (holder, expires) => {
    console.log(holder, expires)
    Cookies.set(HOLDER_KEY, holder, { expires: expires })
}


export const getHolder = () => {
    return Cookies.get(HOLDER_KEY)
}

export const removeHolder = () => {
    return Cookies.remove(HOLDER_KEY)
}