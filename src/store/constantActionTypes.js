/**
 * Motation && Action 事件类型
 */
export default {
    INCREMENT: 'INCREMENT',

    MASTER_GO_BACK_HOME: 'MASTER_GO_BACK_HOME',                                         // 返回主页
    MASTER_EXIST_PLATFORM: 'MASTER_EXIST_PLATFORM',                                     // 退出当前系统

    //#region Global
    GLOBAL_NOTIFICATION_SHOW: 'GLOBAL_NOTIFICATION_SHOW',                               // 全局提醒
    GLOBAL_SPINNING_SHOW: 'GLOBAL_SPINNING_SHOW',                                       // loading 展示
    GLOBAL_SPINNING_HIDE: 'GLOBAL_SPINNING_HIDE',                                       // loading 隐藏
    GLOBAL_UPLOAD_FILE: 'GLOBAL_UPLOAD_FILE',                                           // 文件上传
    GLOBAL_MARKETING_CONTRACT_SHORT_LIST: 'GLOBAL_MARKETING_CONTRACT_SHORT_LIST',       // 销售合同列表
    GLOBAL_DICTS_BY_TYPE_ID: 'GLOBAL_DICTS_BY_TYPE_ID',                                 // 字典列表
    GLOBAL_PRODUCT_TYPE_LIST: 'GLOBAL_PRODUCT_TYPE_LIST',                               // 产品类别
    //#endregion

    // #region 平台头部
    MASTER_HEADER_TAB_ON_CLICK: 'MASTER_HEADER_TAB_ON_CLICK',                           // 头Tab页点击事件
    CLEAR_CURRENT_HEADER_TAB_PAGE_URL: 'CLEAR_CURRENT_HEADER_TAB_PAGE_URL',             // 清理当前TAB页的垃圾数据
    // #endregion

    // #region 平台左侧菜单
    MASTER_LEFT_MENU_ITEM_ON_CLICK: 'MASTER_LEFT_MENU_ITEM_ON_CLICK',                   //  左侧菜单菜单项点击事件
    CLEAR_CURRENT_MENU_PAGE_URL: 'CLEAR_CURRENT_MENU_PAGE_URL',                         //  清理当前菜单栏的垃圾数据
    // #endregion

    // #region 登录页
    WINDOWS_ON_RESIZE: 'WINDOWS_ON_RESIZE',                                             // 窗体窗口调整事件
    LOGIN_FORM_SUBMIT: 'LOGIN_FORM_SUBMIT',                                             // 登录窗体提交
    REFRESH_VARIFICATION_CODE: 'REFRESH_VARIFICATION_CODE',                             // 更新验证码
    //#endregion
};