import ACTION_TYPES from '../constantActionTypes';
import CONSTANT_DATA from '../../utils/constantData';

/**
 * 处理同步请求
 */
export default {
    //  顶部标题选中事件
    [ACTION_TYPES.MASTER_HEADER_TAB_ON_CLICK](state, payload) {
        state.currentHeaderTabTag = payload.key;
        state.currentHeaderTabDashboardPageUrl = payload.url;
    },
    [ACTION_TYPES.MASTER_GO_BACK_HOME](state) {
        state.currentHeaderTabTag = "首页";
        state.currentHeaderTabDashboardPageUrl = CONSTANT_DATA.PAGE_LISTS.DASHBOARD;
    },
    [ACTION_TYPES.CLEAR_CURRENT_HEADER_TAB_PAGE_URL](state) {
        state.currentHeaderTabDashboardPageUrl = "";
    }
}