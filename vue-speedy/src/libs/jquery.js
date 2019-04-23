import jQuery from 'jquery'
const install = function (Vue, opts = {}) {
    window.jQuery = jQuery
    window.$ = jQuery
    window.jquery = jQuery
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {install};   // eslint-disable-line no-undef
