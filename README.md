# Logcat JSON Formatter

这是一个 VS Code 插件，用于帮助格式化 Android Studio 中 Logcat 输出的 JSON 日志。

从 Logcat 输出的 JSON 日志通常包含时间戳、日志级别等前缀信息，此插件可以自动移除这些前缀，并调用 JSON Pretty 插件进行格式化。

## 功能

- 自动检测第一行 JSON 开始的位置（`{` 或 `[` 符号）
- 移除所有行的相同前缀
- 自动调用 JSON Pretty 格式化

## 使用方法

1. 选择需要格式化的日志文本（或不选择，将格式化整个文档）
2. 按 `Cmd+Shift+P` (macOS) 或 `Ctrl+Shift+P` (Windows/Linux) 打开命令面板
3. 输入 `Format Logcat JSON` 并执行

## 安装

### 从源码安装

1. 克隆或下载此项目
2. 在项目目录中运行：
   ```bash
   npm install -g vsce
   npm install
   vsce package
   ```
3. 在 VS Code 中，打开扩展面板，点击 `...` 菜单，选择 `Install from VSIX...`
4. 选择生成的 `.vsix` 文件

## 调试

1. 在 VS Code 中打开本项目
2. 按 `F5` 启动 Extension Development Host 窗口
3. 在新窗口中打开或粘贴 Logcat 日志，执行 `Format Logcat JSON` 命令进行测试

## 要求

- VS Code 版本 >= 1.80.0

## 依赖

需要安装 [JSON Tools](https://marketplace.visualstudio.com/items?itemName=eriklynd.json-tools) 插件来执行最终的 JSON 格式化。

## 示例

**格式化前：**
```
2024-01-01 10:00:00 INFO {"name":"test",
2024-01-01 10:00:01 INFO "value":123}
```

**格式化后：**
```json
{
  "name": "test",
  "value": 123
}
```
