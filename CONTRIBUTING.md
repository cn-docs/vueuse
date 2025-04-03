# 贡献指南

感谢您对本项目感兴趣！

> **警告**: **⚠️ 新功能开发放缓**
>
> 随着 VueUse 的用户群体不断增长，我们收到了大量的功能请求和 Pull Request。因此，维护项目变得越来越具有挑战性，已经达到了我们的能力极限。因此，在不久的将来，我们可能需要放缓新功能的接受速度，优先考虑现有功能的稳定性和质量。**请注意，目前可能不会接受 VueUse 的新功能。**如果您有任何新想法，我们建议您首先将其整合到自己的代码库中，根据您的需求进行迭代，并评估其通用性。如果您坚信您的想法对社区有益，您可以提交 Pull Request 并附上您的用例，我们很乐意审查和讨论它们。感谢您的理解。

## 开发

### 环境搭建

克隆此仓库到您的本地机器并安装依赖。

```bash
pnpm install
```

我们使用 VitePress 进行快速开发和文档编写。您可以通过以下命令在本地启动：

```bash
pnpm dev
```

### 测试

```bash
pnpm test:unit # 运行单元测试
```

如果您想使用实验性的浏览器测试，需要先安装 playwright 依赖。

```bash
nlx playwright install --with-deps
```

然后运行

```bash
pnpm test:browser
```

## 贡献方式

### 现有功能

欢迎增强现有功能。请尽量不要引入破坏性更改。

### 新功能

添加新功能时需要注意以下几点：

- 在开始工作之前，最好先开一个 issue 进行讨论。
- 实现应该放在 `packages/core` 目录下作为一个文件夹，并在 `index.ts` 中导出。
- 在 `core` 包中，尽量不要引入第三方依赖，因为这个包的目标是尽可能轻量。
- 如果您想引入第三方依赖，请贡献到 [@vueuse/integrations](https://github.com/vueuse/vueuse/tree/main/packages/integrations) 或创建一个新的插件。
- 您可以在 `packages/core/_template/` 下找到函数模板，详细信息在 [函数文件夹](#function-folder) 部分中说明。
- 在编写函数文档时，`<!--FOOTER_STARTS-->` 和 `<!--FOOTER_ENDS-->` 会在构建时自动更新，所以不需要手动更新它们。

> 请注意，您不需要更新包的 `index.ts`。它们是自动生成的。

### 新插件

新插件非常受欢迎！

- 在 `packages/` 下创建一个新文件夹，以您的插件名称命名。
- 在 `scripts/packages.ts` 中添加插件详情。
- 在该文件夹下创建 `README.md`。
- 像在核心包中一样添加函数。
- 提交并提交 PR。

## 项目结构

### 单仓库

我们使用单仓库来管理多个包

```
packages
  shared/         - 跨包共享的工具
  core/           - 核心包
  firebase/       - Firebase 插件
  [...addons]/    - 命名的插件
```

### 函数文件夹

函数文件夹通常包含这 4 个文件：

> 您可以在 `packages/core/_template/` 下找到模板

```bash
index.ts            # 函数源代码本身
demo.vue            # 文档演示
index.test.ts       # vitest 单元测试
index.md            # 文档
```

对于 `index.ts`，您应该使用命名导出函数。

```ts
// 正确做法
export { useMyFunction }

// 错误做法
export default useMyFunction
```

对于 `index.md`，第一句话将作为函数列表中的简短介绍显示，所以请尽量简洁明了。

```markdown
# useMyFunction

这将是介绍。详细描述...
```

阅读更多关于[指南](https://vueuse.org/guidelines)的内容。

## 代码风格

只要您安装了开发依赖，就不必担心代码风格。Git hooks 会在提交时自动格式化和修复它们。

## 感谢

再次感谢您对本项目感兴趣！您太棒了！
