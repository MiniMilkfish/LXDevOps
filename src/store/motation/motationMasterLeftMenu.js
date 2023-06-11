import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    /**
     * 左侧菜单栏点击事件
     * @param {Object} state 
     * @param {Object} payload 
     * @param {String} payload.key
     * @param {Array} payload.keyPath
     * @param {Array} payload.rootKey
     */
    [ACTION_TYPES.MASTER_LEFT_MENU_ITEM_ON_CLICK](state, payload) {
        let targetPath = payload.key.split("_");
        if (targetPath[1] === void 0 || targetPath[1] === 'undefined') targetPath[1] = '';
        let keyPaths = payload.keyPath;
        keyPaths[keyPaths.length - 1] = targetPath[0];

        state.menuRootPath = keyPaths;
        state.menuRoot = payload.rootKey;
        state.currentMenuPageUrl = targetPath[1];
    },
    [ACTION_TYPES.CLEAR_CURRENT_MENU_PAGE_URL](state) {
        state.currentMenuPageUrl = '';
    }
}