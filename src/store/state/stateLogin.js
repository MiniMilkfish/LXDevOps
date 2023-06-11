export default {
    LoginFormDimensions: {
        defaultSize: 769,
        sWidth: 412,
        sHeight: 732,
        isMobile: true,
        pageContentHeight: 610
    },
    AuthInfo: {
        authName: '',
        authPass: '',
        validated: false,               // 账户是否有效
        authUserDetail: {}
    },
    ErrorPanel: {
        // 用于打开notification组件
        display: false,
        message: "",	// 标题
        description: "",	// 详细描述
    },
    Varification: {
        seed: '',
        link: ''
    }
};