import { createStore, createLogger } from 'vuex';
import moduleGlobal from './module/moduleGlobal';
import moduleLogin from './module/moduleLogin';
import moduleMasterHeader from './module/moduleMasterHeader';
import moduleMasterLeftMenu from './module/moduleMasterLeftMenu';

export default createStore({
    modules: {
        moduleGlobal,
        moduleLogin,
        moduleMasterHeader,
        moduleMasterLeftMenu,
    },
    plugins: [createLogger()]
});