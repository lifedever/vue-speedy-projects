import {appendPath} from "../utils/common";

export default {
    install(Vue, option) {
        String.prototype.appendPath = appendPath
    }
}