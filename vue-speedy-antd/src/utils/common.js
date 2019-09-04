export const setSiteTitle = (title, reset = false) => {
    if(reset){
        document.title = title
    }else{
        let titles = document.title.split('|')
        document.title = title + ' | ' + titles[titles.length - 1]
    }
}