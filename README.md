## 使用Express搭建一个多人博客

> 参考地址：https://github.com/nswbmw/N-blog 完成一个完整的项目流程

记录学习到的知识点，取人之长 补己之短

### 项目基础知识准备阶段

`require`这个commonjs的模块规范，其加载过程是同步的，也就是不能异步输出模块或者对象

- `require`目录的机制是:
  - 如果目录下有`package.json`并指定了`main`字段，则用之
  - 如果不存在`package.json`，则依次尝试加载目录下的`index.js`和`index.node`
- `require`过的文件会加载到缓存，所以多次`require`同一个文件（模块）不会重复加载
- 判断是否是程序的入口文件有两种方式:
  - `require.main === module`（推荐）
  - `module.parent === null`

如果发生了循环引用，导致未准备好的模块返回了一个空对象，然后就容易报`undefined is not a function`这个错误

`npm`新学到的：

- `npm config set`命令将配置写到了 ~/.npmrc 文件，运行`npm config list`可以查看
- 为了锁定当前依赖的版本呢，除了`save-exact`之外，我们可以把内层依赖版本一并锁定要使用`npm shrinkwrap`
- 生成的`npm-shrinkwrap.json`里面包含了通过`node_modules`计算出的模块的依赖树及版本
- `npm shrinkwrap` 只会生成`dependencies`的依赖，不会生成`devDependencies`的

### 项目框架的前备知识

在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用`supervisor`可以解决这个繁琐的问题

express路由基本知识：

`req.query`: 解析后的`url`中的`querystring`，如`?name=haha`，`req.query`的值为`{name: 'haha'}`
`req.params`: 解析`url`中的占位符，如`/:name`，访问`/haha`，`req.params`的值为`{name: 'haha'}`
`req.body`: 解析后请求体，需使用相关的模块，如`body-parser`，请求体为`{"name": "haha"}`，则`req.body`为`{name: 'haha'}`

当确定了使用`ejs`模板后，需要在`index.js`中设置存放模板文件的目录和设置渲染的模板引擎

ejs模板的基本语法：

1. `<% code %>`：运行`JavaScript`代码，不输出
2. `<%= code %>`：显示转义后的`HTML`内容
3. `<%- code %>`：显示原始`HTML`内容
4. 使用`includes`来完成模板的精确拆分和组合~

*PS: 当 code 比如为 <h1>hello</h1> 这种字符串时，<%= code %> 会原样输出 <h1>hello</h1>，而 <%- code %> 则会显示 H1 大的 hello 字符串。*

### 搭建真正的博客项目

教程：https://github.com/nswbmw/N-blog
进阶参考：https://github.com/ZJH9Rondo/Blog-Node

`ESLint`的配置流程：

1. 电脑上全局安装`eslint`: `npm i eslint -g`
2. 运行`eslint --lint`，初始化配置，依次选择-> Use a popular style guide -> Standard -> JSON
3. `eslint`会创建一个`.eslintrc.json`的配置文件，同时自动安装并添加相关的模块到`devDependencies`。
4. `VS Code`需要装`ESLint`插件

`EditorConfig`配置方法：

1. `VS Code`需要装一个插件：`EditorConfig for VS Code`
2. 在项目根目录下新建`.editorconfig`文件，并添加格式内容

内容样例：

```yml
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2 # 使用两个空格缩进
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true # 在代码最后自动插入一个空的换行
tab_width = 2

[*.md]
trim_trailing_whitespace = false  # 不删除每一行多余得空格

[Makefile]
indent_style = tab
```

针对路由的设计应该都作为注释写到`routes/index.js`中，方便维护和代码编写。
