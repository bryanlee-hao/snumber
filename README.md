# snumber

A chainable, functional number utility for precise decimal calculations.

## Install

```bash
npm install snumber
```

## Usage

```ts
import { sn } from 'snumber'

// Basic arithmetic (chainable)
sn(1.1).add(2.2).mul(3).valueOf()   // (1.1 + 2.2) * 3

// Fixed-precision rounding
sn(3.1415926).fixed(2).valueOf()          // 3.14
sn(3.1415926).fixed(2, Math.ceil).valueOf() // 3.15

// Chaining math operations
sn(100).div(3).fixed(4).toString()  // "33.3333"

// Percentage
sn(30).percent(200).valueOf()       // 15.00

// Thousand separator
sn(1234567.89).thousandSeparator()  // "1,234,567.89"

// Clamp
sn(15).clamp(0, 10).valueOf()       // 10

// Min / Max
sn(5).min(3, 8).valueOf()           // 3
sn(5).max(3, 8).valueOf()           // 8

// Math functions
sn(9).sqrt().valueOf()              // 3
sn(2).pow(10).valueOf()             // 1024
```

## API

### `sn(value: number): SNumber`

Creates a chainable `SNumber` instance.

### Arithmetic

| Method | Description |
|--------|------------|
| `.add(n)` | Addition |
| `.sub(n)` | Subtraction |
| `.mul(n)` | Multiplication |
| `.div(n)` | Division |
| `.mod(n)` | Modulo |
| `.pow(n)` | Power |

### Math

`.abs()` `.ceil()` `.floor()` `.round()` `.sqrt()` `.cbrt()` `.trunc()` `.sign()` `.log()` `.log2()` `.log10()` `.exp()` `.sin()` `.cos()` `.tan()` `.asin()` `.acos()` `.atan()`

### Range

| Method | Description |
|--------|------------|
| `.min(...args)` | Minimum of current value and args |
| `.max(...args)` | Maximum of current value and args |
| `.clamp(min, max)` | Clamp value to range |

### Formatting

| Method | Description |
|--------|------------|
| `.fixed(digits, roundFn?)` | Round to N decimal places |
| `.percent(total, digits?, roundFn?)` | Calculate percentage |
| `.thousandSeparator(options?)` | Add thousand separators |

### Output

| Method | Description |
|--------|------------|
| `.valueOf()` | Get raw number |
| `.toNumber()` | Get raw number |
| `.toFixed(digits)` | Fixed-precision number |
| `.toString()` | String representation |
| `.format(fmt)` | Replace `%s` with value |

### Rounding Helpers

`sn.floor` `sn.ceil` `sn.round` `sn.trunc` — shortcuts for `Math.*`, useful as `roundFn` argument.

## License

MIT
