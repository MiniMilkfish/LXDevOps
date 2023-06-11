import CONSTANT_DATA from '../../utils/constantData';

export default {
    notification: {
        message: "",
        description: "",
        type: CONSTANT_DATA.NOTIFICATION_TYPES.ERROR,
        tick: 1,
    },
    spinning: false,
    marketingContractList: [],

    //#region 字典表数据
    deviceQualitTyleList: [],                               // 质检报告类型
    marketingContractBillingStatusList: [],                 // 销售合同开票状态
    marketingContractReturnStatusList: [],                  // 回访状态
    productStatusList: [],                                  // 产品状态
    sparepartStatusList: [],                                // 配件状态
    operationAndMaintenanceStatusList: [],                  // 运维状态
    operationAndMaintenanceWorkContentList: [],             // 运维工作内容
    marketingContractStatusList: [],                        // 销售合同状态
    invoiceStatusList: [],                                  // 发票开票状态
    deviceLevelList: [],                                    // 设备等级 {text: '', value: ''}
    //#endregion

    productTypeList: [
        // {id: 0, typename: '产品类别名称'}
    ],                                                      // 产品类别列表
};