import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    /**
     * 文件上传
     * @param {Object} param0 
     * @param {Object} payload 
     * @param {Object} payload.file
     * @param {String} payload.file.filetype - 文件类型 1 文档类；2 图片类
     * @param {String} payload.file.filename - 文件名称
     * @param {String} payload.file.filepath - 文件路径
     * @param {String} payload.motationType 
     * @param {Function} payload.actionFailure
     * @param {Function} payload.actionSuccess
     */
    [ACTION_TYPES.GLOBAL_UPLOAD_FILE]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.UPLOAD_FILE}`,
            _extraTools = {
                actionFailure: payload && payload.actionFailure ? payload.actionFailure : new Function(),
                actionSuccess: payload && payload.actionSuccess ? payload.actionSuccess : new Function(),
            },
            reqParam = { file: payload.file };

        common.fetchPost_FormData(reqUrl, reqParam, function (fileData) {
            if (fileData) {
                commit(payload.motationType, { fileData, ...payload });
            }
        }, _extraTools)
    },
    /**
     * 销售合同字典表查询
     * @param {*} param0 
     * @param {*} payload  
     * @param {Function} payload.actionFailure
     * @param {Function} payload.actionSuccess
     */
    [ACTION_TYPES.GLOBAL_MARKETING_CONTRACT_SHORT_LIST]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.MARKETING_CONTRACT_SHORT_LIST}`,
            _extraTools = {
                actionFailure: payload && payload.actionFailure ? payload.actionFailure: new Function(),
                actionSuccess: payload && payload.actionSuccess ? payload.actionSuccess: new Function(),
            };

        common.fetchGet(reqUrl, {}, function (json) {
            if (json) {
                commit(ACTION_TYPES.GLOBAL_MARKETING_CONTRACT_SHORT_LIST, json);
            }
        }, _extraTools)
    },
    /**
     * 设备等级字典表查询
     * @param {*} param0 
     * @param {Object} payload
     * @param {Number} payload.typeid - 字典类型编号 
     * @param {Function} payload.actionFailure
     * @param {Function} payload.actionSuccess
     */
    [ACTION_TYPES.GLOBAL_DICTS_BY_TYPE_ID]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.GET_DICTS_BY_TYPE_ID}`,
            _extraTools = {
                actionFailure: payload && payload.actionFailure ? payload.actionFailure: new Function(),
                actionSuccess: payload && payload.actionSuccess ? payload.actionSuccess: new Function(),
            };

        common.fetchGet(reqUrl, { typeid: payload.typeid }, function (json) {
            if (json) {
                commit(ACTION_TYPES.GLOBAL_DICTS_BY_TYPE_ID, { json, typeid: payload.typeid });
            }
        }, _extraTools)
    },
    /**
     * 产品类别列表查询
     * @param {*} param0 
     * @param {Object} payload
     * @param {Function} payload.actionCallback 
     * @param {Function} payload.actionFailure
     * @param {Function} payload.actionSuccess
     */
    [ACTION_TYPES.GLOBAL_PRODUCT_TYPE_LIST]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.GET_PRODUCT_TYPE_LIST}`,
            reqParam = {
                page: 1,
                rows: 9999
            },
            _extraTools = {
                actionFailure: payload && payload.actionFailure ? payload.actionFailure: new Function(),
                actionSuccess: payload && payload.actionSuccess ? payload.actionSuccess: new Function(),
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json && json.rows) {
                if (payload.actionCallback) payload.actionCallback(json.rows[0].id);

                commit(ACTION_TYPES.GLOBAL_PRODUCT_TYPE_LIST, { data: json.rows });
            }
        }, _extraTools)
    }
}