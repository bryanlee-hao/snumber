# snumber

[![npm version](https://img.shields.io/npm/v/snumber.js)](https://www.npmjs.com/package/snumber.js)
[![gzip size](https://img.shields.io/badge/gzip-0.8kB-brightgreen)](https://github.com/bryanlee-hao/snumber)

还在写 `Math.round(value * 100) / 100` 这种代码吗？**snumber** 提供了一套简洁的链式 API，覆盖日常数值计算、取整、格式化等场景，gzip 后仅 **不到 1kB**。

零依赖，无黑魔法，只是一种更优雅的数字处理方式。

[English](./README.md)

## 安装

```bash
npm install snumber.js
```

## 快速上手

```ts
import { sn } from 'snumber.js'

// 链式四则运算
sn(1.1).add(2.2).mul(3).valueOf()          // 9.9

// 保留小数 + 自定义取整策略
sn(3.1415926).fixed(2).valueOf()           // 3.14
sn(3.1415926).fixed(2, sn.ceil).valueOf()  // 3.15

// 百分比
sn(75).percent(300).valueOf()              // 25

// 千分位
sn(1234567.89).thousandSeparator()         // "1,234,567.89"

// 补零输出
sn(3.1).toFixed(4, { pad: true })          // "3.1000"

// 格式化字符串
sn(99.5).format('得分：%s 分')              // "得分：99.5 分"
```

## API

### `sn(value: number): SNumber`

创建一个可链式调用的 `SNumber` 实例。每个方法都返回新实例，原始值不可变。

---

### 四则运算

```ts
sn(10).add(3)   // 13
sn(10).sub(3)   // 7
sn(10).mul(3)   // 30
sn(10).div(3)   // 3.333...
sn(10).mod(3)   // 1
sn(2).pow(10)   // 1024
```

---

### 数学方法

所有方法均对当前值执行对应的 `Math.*` 操作并返回新的 `SNumber`：

| 方法 | 说明 |
|------|------|
| `.abs()` | 绝对值 |
| `.ceil()` | 向上取整 |
| `.floor()` | 向下取整 |
| `.round()` | 四舍五入 |
| `.trunc()` | 截断小数 |
| `.sqrt()` | 平方根 |
| `.cbrt()` | 立方根 |
| `.sign()` | 符号（-1 / 0 / 1） |
| `.log()` `.log2()` `.log10()` | 对数 |
| `.exp()` | e 的 n 次方 |
| `.sin()` `.cos()` `.tan()` | 三角函数 |
| `.asin()` `.acos()` `.atan()` | 反三角函数 |

---

### 范围

```ts
sn(5).min(3, 8)       // 3 — 取最小值
sn(5).max(3, 8)       // 8 — 取最大值
sn(15).clamp(0, 10)   // 10 — 限制在 [0, 10] 范围内
```

---

### 精度与格式化

#### `.fixed(digits, roundFn?)`

保留 `digits` 位小数，返回 `SNumber`（可继续链式调用）。

```ts
sn(3.1415).fixed(2).valueOf()              // 3.14
sn(3.1415).fixed(2, sn.ceil).valueOf()     // 3.15
sn(3.1415).fixed(2, sn.floor).valueOf()    // 3.14
```

#### `.percent(total, digits?, roundFn?)`

计算百分比：`(value / total) × 100`，默认保留 2 位小数。`total` 为 0 时返回 0。

```ts
sn(30).percent(200).valueOf()              // 15
sn(1).percent(3).valueOf()                 // 33.33
sn(1).percent(3, 4).valueOf()              // 33.3333
```

#### `.thousandSeparator(options?)`

添加千分位分隔符，返回字符串。

| 选项 | 默认值 | 说明 |
|------|--------|------|
| `separator` | `","` | 分隔符字符 |
| `integerOnly` | `true` | 设为 `false` 时小数部分也分隔 |

```ts
sn(1234567).thousandSeparator()                           // "1,234,567"
sn(1234567).thousandSeparator({ separator: '_' })         // "1_234_567"
sn(1234.567891).thousandSeparator({ integerOnly: false }) // "1,234.567,891"
```

---

### 输出

| 方法 | 返回类型 | 说明 |
|------|---------|------|
| `.valueOf()` | `number` | 原始数值 |
| `.toNumber()` | `number` | 同 `valueOf()` |
| `.toFixed(digits, { pad? })` | `string` | 保留小数位；`pad: true` 时补零 |
| `.toString()` | `string` | 字符串 |
| `.format(fmt)` | `string` | 将 `%s` 替换为数值 |

```ts
sn(3.1).toFixed(4)                   // "3.1"
sn(3.1).toFixed(4, { pad: true })    // "3.1000"
sn(42).format('答案是 %s')            // "答案是 42"
```

---

### 取整策略快捷方式

`sn.floor` `sn.ceil` `sn.round` `sn.trunc`

可作为 `fixed` / `percent` 的 `roundFn` 参数传入：

```ts
sn(3.1415).fixed(2, sn.floor)   // 3.14
sn(3.1415).fixed(2, sn.ceil)    // 3.15
```

## License

MIT
