export const setSiteTitle = (title) => {
    let titles = document.title.split('|')
    document.title = title + ' | ' + titles[titles.length - 1]
}