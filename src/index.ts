/**
 * 一个用于计算高精度小数的工具类
 *
 * 1. 集成 Math 对象的所有方法
 * 2. 支持函数式调用
 * 3. 支持链式调用
 * 4. 支持保留小数位数
 *
 * usage:
 *
 * let number = 1.234567890123456789
 * let fix2value = sn(number).toFixed(2).valueOf()
 * sn(number).add(1).mul(2).div(3).pow(4).sqrt()
 * sn(number).fixed(10).valueOf()
 * sn(number).fixed(10, Math.floor).valueOf()
 *
 * // to string
 * sn(number).toString()
 */

type RoundingFn = (x: number) => number

class SNumber {
  private _value: number

  constructor(value: number) {
    this._value = value
  }

  add(n: number) { return new SNumber(this._value + n) }
  sub(n: number) { return new SNumber(this._value - n) }
  mul(n: number) { return new SNumber(this._value * n) }
  div(n: number) { return new SNumber(this._value / n) }
  mod(n: number) { return new SNumber(this._value % n) }
  pow(n: number) { return new SNumber(Math.pow(this._value, n)) }

  abs()   { return new SNumber(Math.abs(this._value)) }
  ceil()  { return new SNumber(Math.ceil(this._value)) }
  floor() { return new SNumber(Math.floor(this._value)) }
  round() { return new SNumber(Math.round(this._value)) }
  sqrt()  { return new SNumber(Math.sqrt(this._value)) }
  cbrt()  { return new SNumber(Math.cbrt(this._value)) }
  trunc() { return new SNumber(Math.trunc(this._value)) }
  sign()  { return new SNumber(Math.sign(this._value)) }
  log()   { return new SNumber(Math.log(this._value)) }
  log2()  { return new SNumber(Math.log2(this._value)) }
  log10() { return new SNumber(Math.log10(this._value)) }
  exp()   { return new SNumber(Math.exp(this._value)) }
  sin()   { return new SNumber(Math.sin(this._value)) }
  cos()   { return new SNumber(Math.cos(this._value)) }
  tan()   { return new SNumber(Math.tan(this._value)) }
  asin()  { return new SNumber(Math.asin(this._value)) }
  acos()  { return new SNumber(Math.acos(this._value)) }
  atan()  { return new SNumber(Math.atan(this._value)) }

  min(...args: number[]) {
    return new SNumber(Math.min(...args.concat(this._value)))
  }
  max(...args: number[]) {
    return new SNumber(Math.max(...args.concat(this._value)))
  }
  clamp(min: number, max: number) {
    return new SNumber(Math.min(Math.max(this._value, min), max))
  }

  /**
   * 保留小数位数
   * @param digits 小数位数
   * @param roundFn 取整策略，默认 Math.round
   */
  fixed(digits: number, roundFn: RoundingFn = Math.round) {
    const factor = Math.pow(10, digits)
    return new SNumber(roundFn(this._value * factor) / factor)
  }

  /**
   * 计算百分比
   * @param total 总数
   * @param digits 小数位数
   * @param roundFn 取整策略
   * @returns 百分比
   */
  percent(total: number, digits = 2, roundFn?: RoundingFn) {
    if (total === 0) return new SNumber(0)
    return new SNumber(this._value).div(total).mul(100).fixed(digits, roundFn)
  }

  /**
   * 添加千分位分隔符
   * @param options.separator 分隔符，默认 ","
   * @param options.integerOnly 是否只对整数部分添加，默认 true；false 时小数部分也添加
   */
  thousandSeparator(options: { separator?: string; integerOnly?: boolean } = {}) {
    const { separator = ',', integerOnly = true } = options
    const str = String(this._value)
    const [intPart, decPart] = str.split('.')

    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator)

    if (decPart === undefined) return formattedInt

    const formattedDec = integerOnly
      ? decPart
      : decPart.replace(/(\d{3})\B/g, `$1${separator}`)

    return `${formattedInt}.${formattedDec}`
  }

  /**
   * output methods
   */
  valueOf()  { return this._value }
  toNumber() { return this._value }
  toFixed(digits: number, options?: { pad?: boolean; roundFn?: RoundingFn }): string {
    const val = this.fixed(digits, options?.roundFn).valueOf()
    return options?.pad ? val.toFixed(digits) : String(val)
  }
  toString() { return String(this._value) }
  format(format: string) {
    return format.replace(/%s/g, this.toString())
  }

  /**
   * check if the value is NaN or Infinity
   */
  isNaN() { return Number.isNaN(this._value) }
  isFinite() { return Number.isFinite(this._value) }
  isSafeInteger() { return Number.isSafeInteger(this._value) }
  isInteger() { return Number.isInteger(this._value) }

  [Symbol.toPrimitive](hint: string) {
    return hint === 'string' ? this.toString() : this._value
  }
}

function sn(x: number): SNumber {
  return new SNumber(x)
}

sn.floor = Math.floor
sn.ceil = Math.ceil
sn.round = Math.round
sn.trunc = Math.trunc

export { sn, SNumber }
export type { RoundingFn }