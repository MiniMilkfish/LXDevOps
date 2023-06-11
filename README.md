# LongXiang DevOps

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

--- 
## `Git Commit Message-Standard`

### git commit -m `'<type>(<scope>):<subject>'`

- ### `type` (必选，统一全部变成小写)

  - `feat/feature/add`：新功能
  - `fix/to`: 修复Bug
    - `fix`：产生Diff 并自动修复此问题（适合于一次提交直接修复问题）
    - `to`：只产生Diff 不自动修复此问题（适合于多次提交，最终修复问题提交时使用 `fix`）
  - `docs`：文档（documentation），比如README、CHANGELOG、CONTRIBUTE等
  - `style`：格式（不影响代码运行的变动）
  - `refactor`：重构（非新增功能或修改Bug的代码变动）
  - `perf`：优化相关，比如提升性能、体验
  - `test`：测试用例，包括单元测试、集成测试等
  - `chore/build`：构建过程或辅助工具（增加依赖库、工具等）的变动
  - `del`：移除文件
  - `revert`：回滚到上一个版本
  - `merge`：代码合并
  - `sync`：同步主线或分支的Bug
  
- ### `scope`（可选）：用于说明`commit` 影响的范围，如数据层、控制层、视图层等

- ### `subject`：用于本次提交的主题简短说明，可含主要模块的相关说明

---

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 学习参考
- [核心类库  - Vue.js ^3.0.0](https://v3.cn.vuejs.org/guide/introduction.html)

- [状态管理 - Vuex ^4.0.2](https://next.vuex.vuejs.org/zh/index.html)

- [路由管理 - Vue-router ^4.0.12](https://next.router.vuejs.org/zh/installation.html)

- [前端视图库 - AntDesign Vue ^3.0.0-alpha.14](https://next.antdv.com/components/overview-cn/)
