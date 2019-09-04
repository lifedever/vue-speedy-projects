export const setSiteTitle = (title, reset = false) => {
    if(reset){
        document.title = title
    }else{
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
        if (object[key])
            formData.append(key, object[key])
    })
    return formData
}
