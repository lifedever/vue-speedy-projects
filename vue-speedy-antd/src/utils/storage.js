import lscache from 'lscache'
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