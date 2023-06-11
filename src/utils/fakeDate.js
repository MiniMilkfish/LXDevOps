/**
 * 测试假数据集
 */
import CONSTANT_DATA from './constantData';
const pageList = CONSTANT_DATA.PAGE_LISTS;

export default {
    // 路由列表，包含功能页 (.vue 地址)
    routeList: [
        {
            title: "首页",
            url: pageList.DASHBOARD,
            id: 1,
            pid: 0,
            sub: []
        }
    ]
}