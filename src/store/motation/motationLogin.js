import ACTION_TYPES from '../constantActionTypes';
import FAKE_DATE from "../../utils/fakeDate";
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

const topHeaderHeight = 64,
    breadcrumbHeight = 42,
    contentMarginPaddingHeight = 36;

/**
 * 处理同步请求
 */
export default {
    // 窗体Resize
    [ACTION_TYPES.WINDOWS_ON_RESIZE](state, payload) {
        state.LoginFormDimensions.sWidth = payload.width;
        state.LoginFormDimensions.sHeight = payload.height;
        state.LoginFormDimensions.isMobile = state.defaultSize > payload.width;

        const breadcrumbShow = FAKE_DATE.routeList.filter(
            item =>
                item.title ===
                payload.currentHeaderTabTag &&
                item.sub.length > 0 &&
                payload.menuRootPathL > 0
        )[0];

        state.LoginFormDimensions.pageContentHeight = payload.height - topHeaderHeight - (breadcrumbShow ? breadcrumbHeight : 0) - contentMarginPaddingHeight;
    },
    // 登录窗体信息提交
    [ACTION_TYPES.LOGIN_FORM_SUBMIT](state, payload) {
        state.AuthInfo.authName = payload.name;
        state.AuthInfo.authPass = payload.pass;
        state.AuthInfo.validated = true;
    },
    // 退出当前系统
    [ACTION_TYPES.MASTER_EXIST_PLATFORM](state) {
        state.AuthInfo.authName = '';
        state.AuthInfo.authPass = '';
        state.AuthInfo.validated = false;
    },
    // 刷新验证码
    [ACTION_TYPES.REFRESH_VARIFICATION_CODE](state) {
        let seedCode = parseInt(Math.random() * 10000);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.LOGIN_GET_VALIDGRAPHIC}`,
            reqParam = { seed: seedCode };

        state.Varification.seed = seedCode;
        state.Varification.link = common.combineQueryUrl(reqUrl, reqParam);
    }
}