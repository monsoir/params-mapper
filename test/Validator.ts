class Validator {
  /**
   * 判断不为空字符串
   * @returns 参数为零值时，返回 false, 否则返回 true, 其中包含了空字符串
   */
  notEmptyString = ($0: string) => !!$0

  /**
   * 判断不为空数组
   * @returns 参数是数组且数组元素大于 0 时，返回 true, 否则返回 false
   */
  notEmptyArray = ($0: any[]) => Array.isArray($0) && $0.length > 0

  /**
   * 判断字符串不等于某一个特定的字符串
   * @param { value } 待检验值
   * @param { prohibitedString } 被禁止的值
   * @returns 当 value 不为空且为 prohibitedString 时，返回 false, 否则返回 true
   */
  stringNotEqualTo = (value: string, prohibitedString: string) => !!value && value !== prohibitedString

  /**
   * 判断字符串不等于 '0'
   * @returns 当参数不等于字符串 0 时，返回 true, 否则返回 false
   */
  stringNotEqualTo0 = ($0: string) => this.stringNotEqualTo($0, '0')

  /**
   * 判断数组中的每个元素都不等于 '0'
   * @returns 当参数为数组，且数组中的元素全都不等于字符串 0 时，返回 true, 否则返回 false
   */
  elementInArrayNotEqualTo0 = ($0: any[]) => Array.isArray($0) && !$0.some(ele => ele === '0')

  /**
   * 检验是否为手机号码
   */
  isTelephone = ($0: string) => /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/.test($0)
}

export default new Validator();
