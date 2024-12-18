/**
 * 将数字转为中文字符
 * @param num 待转换的数字
 * @return 数字对应的中文字符
 */
export const num2Cn = (num: number) => {
  return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][num]
}
