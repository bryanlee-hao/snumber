# snumber

[![npm version](https://img.shields.io/npm/v/snumber.js)](https://www.npmjs.com/package/snumber.js)
[![gzip size](https://img.shields.io/badge/gzip-0.8kB-brightgreen)](https://github.com/bryanlee-hao/snumber)

Tired of writing `Math.round(value * 100) / 100` over and over? **snumber** gives you a clean, chainable API for everyday number operations — arithmetic, rounding, formatting, and more — all in **under 1kB gzipped**.

No dependencies. No magic. Just a better way to work with numbers.

[中文文档](./README.zh-CN.md)

## Install

```bash
npm install snumber.js
```

## Quick Start

```ts
import { sn } from 'snumber.js'

// Chainable arithmetic
sn(1.1).add(2.2).mul(3).valueOf()          // 9.9

// Fixed-precision with custom rounding
sn(3.1415926).fixed(2).valueOf()           // 3.14
sn(3.1415926).fixed(2, sn.ceil).valueOf()  // 3.15

// Percentage
sn(75).percent(300).valueOf()              // 25

// Thousand separator
sn(1234567.89).thousandSeparator()         // "1,234,567.89"

// Zero-padded output
sn(3.1).toFixed(4, { pad: true })          // "3.1000"

// String formatting
sn(99.5).format('Score: %s pts')           // "Score: 99.5 pts"
```

## API

### `sn(value: number): SNumber`

Creates a chainable `SNumber` instance. Every method returns a new instance — the original value is immutable.

---

### Arithmetic

```ts
sn(10).add(3)   // 13
sn(10).sub(3)   // 7
sn(10).mul(3)   // 30
sn(10).div(3)   // 3.333...
sn(10).mod(3)   // 1
sn(2).pow(10)   // 1024
```

---

### Math

All methods apply the corresponding `Math.*` operation and return a new `SNumber`:

| Method | Description |
|--------|-------------|
| `.abs()` | Absolute value |
| `.ceil()` | Round up |
| `.floor()` | Round down |
| `.round()` | Round to nearest |
| `.trunc()` | Truncate decimals |
| `.sqrt()` | Square root |
| `.cbrt()` | Cube root |
| `.sign()` | Sign (−1 / 0 / 1) |
| `.log()` `.log2()` `.log10()` | Logarithms |
| `.exp()` | e to the power of n |
| `.sin()` `.cos()` `.tan()` | Trigonometric |
| `.asin()` `.acos()` `.atan()` | Inverse trigonometric |

---

### Range

```ts
sn(5).min(3, 8)       // 3  — minimum
sn(5).max(3, 8)       // 8  — maximum
sn(15).clamp(0, 10)   // 10 — clamp to [0, 10]
```

---

### Precision & Formatting

#### `.fixed(digits, roundFn?)`

Round to `digits` decimal places. Returns `SNumber` (chainable).

```ts
sn(3.1415).fixed(2).valueOf()              // 3.14
sn(3.1415).fixed(2, sn.ceil).valueOf()     // 3.15
sn(3.1415).fixed(2, sn.floor).valueOf()    // 3.14
```

#### `.percent(total, digits?, roundFn?)`

Calculate percentage: `(value / total) × 100`, defaults to 2 decimal places. Returns 0 when `total` is 0.

```ts
sn(30).percent(200).valueOf()              // 15
sn(1).percent(3).valueOf()                 // 33.33
sn(1).percent(3, 4).valueOf()              // 33.3333
```

#### `.thousandSeparator(options?)`

Add thousand separators. Returns a string.

| Option | Default | Description |
|--------|---------|-------------|
| `separator` | `","` | Separator character |
| `integerOnly` | `true` | Set `false` to also separate the decimal part |

```ts
sn(1234567).thousandSeparator()                           // "1,234,567"
sn(1234567).thousandSeparator({ separator: '_' })         // "1_234_567"
sn(1234.567891).thousandSeparator({ integerOnly: false }) // "1,234.567,891"
```

---

### Output

| Method | Returns | Description |
|--------|---------|-------------|
| `.valueOf()` | `number` | Raw numeric value |
| `.toNumber()` | `number` | Same as `valueOf()` |
| `.toFixed(digits, { pad? })` | `string` | Fixed decimal places; `pad: true` pads with zeros |
| `.toString()` | `string` | String representation |
| `.format(fmt)` | `string` | Replace `%s` with the value |

```ts
sn(3.1).toFixed(4)                   // "3.1"
sn(3.1).toFixed(4, { pad: true })    // "3.1000"
sn(42).format('The answer is %s')    // "The answer is 42"
```

---

### Rounding Helpers

`sn.floor` `sn.ceil` `sn.round` `sn.trunc`

Shortcuts for `Math.*`, designed to be passed as the `roundFn` argument:

```ts
sn(3.1415).fixed(2, sn.floor)   // 3.14
sn(3.1415).fixed(2, sn.ceil)    // 3.15
```

## License

MIT
