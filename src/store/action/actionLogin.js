import ACTION_TYPES from '../constantActionTypes';
// import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    [ACTION_TYPES.LOGIN_FORM_SUBMIT]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);

        // let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.LOGIN_AUTH}`,
        //     _extraTools = {
        //         actionFailure: payload.actionFailure,
        //     },
        //     reqParam = {
        //         userName: payload.name,
        //         password: payload.pass,
        //         seed: payload.seed,
        //     };

        // common.fetchGet(reqUrl, reqParam, function (result) {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            
            let token = 'KJSHFKASDF1283YHDKFASKLJDFALKH'; // result.token;
            common.setItem('t', token);
            commit({ type: ACTION_TYPES.LOGIN_FORM_SUBMIT, ...payload })
        // }, _extraTools)
    }
}