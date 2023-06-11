import ACTION_TYPES from '../constantActionTypes';
import CONSTANT_DATA from '../../utils/constantData';

/**
 * 处理同步请求
 */
export default {
    // 全局提醒通知
    [ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW](state, payload) {
        state.notification = {
            ...payload,
            tick: Math.random()
        }
    },
    // 全局Loading 显示
    [ACTION_TYPES.GLOBAL_SPINNING_SHOW](state) {
        state.spinning = true;
    },
    // 全局Loading 隐藏
    [ACTION_TYPES.GLOBAL_SPINNING_HIDE](state) {
        state.spinning = false;
    },
    /**
     * 销售合同字典表查询
     */
    [ACTION_TYPES.GLOBAL_MARKETING_CONTRACT_SHORT_LIST](state, json) {
        state.marketingContractList = [].concat(json);
    },
    /**
     * 设备等级字典表查询
     * @param {String} state 
     * @param {Object} payload 
     * @param {Object} payload.json
     * @param {Number} payload.typeid
     */
    [ACTION_TYPES.GLOBAL_DICTS_BY_TYPE_ID](state, payload) {
        switch (payload.typeid) {
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.DEVICE_QUALIT_TYPE.key:
                // 质检报告类型
                state.deviceQualitTyleList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.MARKETING_CONTRACT_BILLING_STATUS.key:
                // 销售合同开票状态
                state.marketingContractBillingStatusList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.MARKETING_CONTRACT_RETURN_STATUS.key:
                // 回访状态
                state.marketingContractReturnStatusList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.PRODUCT_STATUS.key:
                // 产品状态
                state.productStatusList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.SPAREPART_STATUS.key:
                // 配件状态
                state.sparepartStatusList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.OPERATION_AND_MAINTENANCE_STATUS.key:
                // 运维状态
                state.operationAndMaintenanceStatusList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.OPERATION_AND_MAINTENANCE_WORK_CONTENT.key:
                // 运维工作内容
                state.operationAndMaintenanceWorkContentList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.MARKETING_CONTRACT_STATUS.key:
                // 销售合同状态
                state.marketingContractStatusList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.INVOICE_STATUS.key:
                // 发票开票状态
                state.invoiceStatusList = payload.json;
                break;
            case CONSTANT_DATA.DICT_TYPE_ID_LIST.DEVICE_LEVEL.key:
                // 设备等级
                state.deviceLevelList = payload.json;
                break;
        }
    },
    // 产品类别
    [ACTION_TYPES.GLOBAL_PRODUCT_TYPE_LIST](state, json) {
        state.productTypeList = [].concat(json.data);
    }
}