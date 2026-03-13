import { describe, it, expect } from 'vitest'
import { sn, SNumber } from './index'

describe('sn()', () => {
  it('should create an SNumber instance', () => {
    const n = sn(42)
    expect(n).toBeInstanceOf(SNumber)
    expect(n.valueOf()).toBe(42)
  })
})

describe('arithmetic', () => {
  it('add', () => expect(sn(1).add(2).valueOf()).toBe(3))
  it('sub', () => expect(sn(5).sub(3).valueOf()).toBe(2))
  it('mul', () => expect(sn(3).mul(4).valueOf()).toBe(12))
  it('div', () => expect(sn(10).div(4).valueOf()).toBe(2.5))
  it('mod', () => expect(sn(10).mod(3).valueOf()).toBe(1))
  it('pow', () => expect(sn(2).pow(10).valueOf()).toBe(1024))

  it('should chain multiple operations', () => {
    expect(sn(1).add(2).mul(3).sub(1).div(2).valueOf()).toBe(4)
  })

  it('should return new instances (immutability)', () => {
    const a = sn(10)
    const b = a.add(5)
    expect(a.valueOf()).toBe(10)
    expect(b.valueOf()).toBe(15)
  })
})

describe('Math methods', () => {
  it('abs', () => {
    expect(sn(-5).abs().valueOf()).toBe(5)
    expect(sn(5).abs().valueOf()).toBe(5)
  })

  it('ceil', () => expect(sn(1.2).ceil().valueOf()).toBe(2))
  it('floor', () => expect(sn(1.8).floor().valueOf()).toBe(1))
  it('round', () => {
    expect(sn(1.4).round().valueOf()).toBe(1)
    expect(sn(1.5).round().valueOf()).toBe(2)
  })
  it('trunc', () => expect(sn(1.9).trunc().valueOf()).toBe(1))

  it('sqrt', () => expect(sn(9).sqrt().valueOf()).toBe(3))
  it('cbrt', () => expect(sn(27).cbrt().valueOf()).toBe(3))

  it('sign', () => {
    expect(sn(10).sign().valueOf()).toBe(1)
    expect(sn(-10).sign().valueOf()).toBe(-1)
    expect(sn(0).sign().valueOf()).toBe(0)
  })

  it('log', () => expect(sn(Math.E).log().valueOf()).toBeCloseTo(1))
  it('log2', () => expect(sn(8).log2().valueOf()).toBe(3))
  it('log10', () => expect(sn(1000).log10().valueOf()).toBe(3))
  it('exp', () => expect(sn(1).exp().valueOf()).toBeCloseTo(Math.E))

  it('sin', () => expect(sn(Math.PI / 2).sin().valueOf()).toBeCloseTo(1))
  it('cos', () => expect(sn(0).cos().valueOf()).toBe(1))
  it('tan', () => expect(sn(0).tan().valueOf()).toBe(0))
  it('asin', () => expect(sn(1).asin().valueOf()).toBeCloseTo(Math.PI / 2))
  it('acos', () => expect(sn(1).acos().valueOf()).toBeCloseTo(0))
  it('atan', () => expect(sn(0).atan().valueOf()).toBe(0))
})

describe('min / max / clamp', () => {
  it('min returns the smallest value', () => {
    expect(sn(5).min(3, 8).valueOf()).toBe(3)
    expect(sn(1).min(3, 8).valueOf()).toBe(1)
  })

  it('max returns the largest value', () => {
    expect(sn(5).max(3, 8).valueOf()).toBe(8)
    expect(sn(10).max(3, 8).valueOf()).toBe(10)
  })

  it('clamp constrains value to range', () => {
    expect(sn(15).clamp(0, 10).valueOf()).toBe(10)
    expect(sn(-5).clamp(0, 10).valueOf()).toBe(0)
    expect(sn(5).clamp(0, 10).valueOf()).toBe(5)
  })
})

describe('fixed', () => {
  it('rounds to N decimal places (default Math.round)', () => {
    expect(sn(3.1415926).fixed(2).valueOf()).toBe(3.14)
    expect(sn(3.1415926).fixed(4).valueOf()).toBe(3.1416)
  })

  it('supports custom rounding function', () => {
    expect(sn(3.1415926).fixed(2, Math.ceil).valueOf()).toBe(3.15)
    expect(sn(3.1415926).fixed(2, Math.floor).valueOf()).toBe(3.14)
  })

  it('works with 0 digits', () => {
    expect(sn(3.7).fixed(0).valueOf()).toBe(4)
  })
})

describe('percent', () => {
  it('calculates percentage', () => {
    expect(sn(30).percent(200).valueOf()).toBe(15)
    expect(sn(1).percent(3).valueOf()).toBe(33.33)
  })

  it('returns 0 when total is 0', () => {
    expect(sn(10).percent(0).valueOf()).toBe(0)
  })

  it('supports custom digits', () => {
    expect(sn(1).percent(3, 4).valueOf()).toBe(33.3333)
  })

  it('supports custom rounding function', () => {
    expect(sn(1).percent(3, 2, Math.floor).valueOf()).toBe(33.33)
    expect(sn(1).percent(3, 2, Math.ceil).valueOf()).toBe(33.34)
  })
})

describe('thousandSeparator', () => {
  it('adds comma separators by default', () => {
    expect(sn(1234567).thousandSeparator()).toBe('1,234,567')
  })

  it('handles decimals', () => {
    expect(sn(1234567.89).thousandSeparator()).toBe('1,234,567.89')
  })

  it('supports custom separator', () => {
    expect(sn(1234567).thousandSeparator({ separator: '_' })).toBe('1_234_567')
  })

  it('formats decimal part when integerOnly is false', () => {
    expect(sn(1234.567891).thousandSeparator({ integerOnly: false }))
      .toBe('1,234.567,891')
  })

  it('handles numbers with no decimal part', () => {
    expect(sn(100).thousandSeparator()).toBe('100')
  })

  it('handles small numbers', () => {
    expect(sn(999).thousandSeparator()).toBe('999')
  })
})

describe('output methods', () => {
  it('valueOf returns raw number', () => {
    expect(sn(42).valueOf()).toBe(42)
  })

  it('toNumber returns raw number', () => {
    expect(sn(42).toNumber()).toBe(42)
  })

  it('toFixed returns fixed-precision number', () => {
    expect(sn(3.1415926).toFixed(2)).toBe('3.14')
  })

  it('toFixed with pad forces trailing zeros', () => {
    expect(sn(3.1).toFixed(4, { pad: true })).toBe('3.1000')
    expect(sn(5).toFixed(2, { pad: true })).toBe('5.00')
    expect(sn(1.005).toFixed(2, { pad: true })).toBe('1.00')
  })

  it('toFixed without pad returns number (no trailing zeros)', () => {
    expect(sn(3.1).toFixed(4)).toBe('3.1')
    expect(sn(5).toFixed(2)).toBe('5')
  })

  it('toString returns string', () => {
    expect(sn(42).toString()).toBe('42')
    expect(sn(3.14).toString()).toBe('3.14')
  })

  it('format replaces %s with value', () => {
    expect(sn(42).format('The answer is %s!')).toBe('The answer is 42!')
    expect(sn(3.14).format('%s + %s')).toBe('3.14 + 3.14')
  })
})

describe('Symbol.toPrimitive', () => {
  it('returns number for numeric context', () => {
    expect(+sn(42)).toBe(42)
  })

  it('returns string for string context', () => {
    expect(`${sn(42)}`).toBe('42')
  })
})

describe('sn static helpers', () => {
  it('sn.floor is Math.floor', () => expect(sn.floor).toBe(Math.floor))
  it('sn.ceil is Math.ceil', () => expect(sn.ceil).toBe(Math.ceil))
  it('sn.round is Math.round', () => expect(sn.round).toBe(Math.round))
  it('sn.trunc is Math.trunc', () => expect(sn.trunc).toBe(Math.trunc))

  it('can be used as roundFn', () => {
    expect(sn(3.7).fixed(0, sn.floor).valueOf()).toBe(3)
    expect(sn(3.2).fixed(0, sn.ceil).valueOf()).toBe(4)
  })
})

describe('chaining complex operations', () => {
  it('arithmetic + fixed', () => {
    expect(sn(1.1).add(2.2).fixed(1).valueOf()).toBe(3.3)
  })

  it('percent + format', () => {
    expect(sn(75).percent(300).format('%s%')).toBe('25%')
  })

  it('multi-step chain', () => {
    const result = sn(100)
      .div(3)
      .fixed(2)
      .mul(3)
      .fixed(2)
      .valueOf()
    expect(result).toBe(99.99)
  })
})
