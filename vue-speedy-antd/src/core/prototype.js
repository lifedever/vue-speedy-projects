import {appendPath} from "../utils/common";

export default {
    install(Vue, option) {
        String.prototype.appendPath = function (path) {
            return appendPath(this, path)
        }
    }
}