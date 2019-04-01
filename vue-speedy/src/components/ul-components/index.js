import Container from './container';
import DataContainer from './data-container';
import SplitContainer from './split-container';
import {UlTable, UlTableColumn} from './ul-table';

const ul = {
    Container,
    SplitContainer,
    DataContainer,
    UlTableColumn,
    UlTable
};

const install = function (Vue, opts = {}) {

    Object.keys(ul).forEach((key) => {
        Vue.component(key, ul[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default Object.assign(ul, {install});   // eslint-disable-line no-undef
