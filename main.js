
const __main__ = () => {
  console.log('-------------divider--------------')
  // longestCommonPrefix2(['flower', 'flow', 'flight'])
  // isPalindrome(1234321)
  // reverseNum2(-2147483642) // 002
  // reverseNum(3840) // 002
  // elementForSum([1, 2,7,11,15], 9) // 001
}


/* 4. 题目：编写一个函数来查找字符串数组中的最长公共前缀。
            如果不存在公共前缀，返回空字符串 ""。

      示例：输入: strs = ['flower', 'flow', 'flight']
            输出: 'fl'
*/
const longestCommonPrefix = (strs) => {
  console.log('longestCommonPrefix strs: ', strs)
  if (strs.length === 0) { // 空数组，直接返回''
   console.log('longestCommonPrefix result: for empty strs')
    return ''
  }
  if (strs.length === 1) { // 单个元素，直接返回
    console.log('longestCommonPrefix result: for single strs')
    return strs[0]
  }
  let short = Number.MAX_SAFE_INTEGER 
  for (const tmp of strs) {
    const len = tmp.length
    if (len < short) {
      short = len // 计算最短的元素
    }
  }
  if (short === 0) { // 有空元素，直接返回''
   console.log('longestCommonPrefix result: for empty element')
   return ''
  }
  const compareSingle = (pos) => { // 比较所有元素中的某个位置的值
    const s = strs[0][pos]
    for (let i = 1; i < strs.length; i++) {
      if (s !== strs[i][pos]) {
        return false // 有一个不同，直接返回false
      }
    }
    return true
  }
  const compare = (start, end) => { // 返回最大共同前缀的最后下标 
    if (start > end) {
      return start - 1 // 如果开始下标大于结束下标，返回前一个下标 
    }
    const pos = start + Number.parseInt((end - start) / 2) // 中间下标
    const posTmp = compareSingle(pos) // 比较最中间下标的值
    if (start === end) { // 前后下标相同，根据结果返回值
       return posTmp ? pos : pos - 1
    }
    const startResult = compare(start, pos - 1) // 比较中间下标左边的部分
    if (!posTmp || startResult + 1 < pos) {
      return startResult // 中间下标不同，或者左边不完全相同，直接返回左边的结果为 最后结果
    }
    return compare(pos + 1, end) // 中间下标和左边部分都相同，则计算右边部分，返回
  }
  const resultPos = compare(0, short - 1)
  const result = resultPos > -1 ? strs[0].substring(0, resultPos + 1) : ''
  console.log('longestCommonPrefix result: ', result)
  return result
}

const longestCommonPrefix2 = (strs) => {
  console.log('longestCommonPrefix strs: ', strs)
  if (strs.length === 0) { // 空数组，直接返回''
   console.log('longestCommonPrefix result: for empty strs')
    return ''
  }
  const compareSingle = (datas, start, end) => { // 计算两个字符串的最长公共前缀
    let i = 0
    for (; i < datas[start].length; i++) { // 逐个比较，可以考虑采用二分法进行比较
      if (datas[start][i] === undefined || datas[start][i] !== datas[end][i]) {
        break
      }
    }
    if (i) {
      return datas[start].substring(0, i)
    }
    return ''
  }
  const longestCommonPrefixReal = (datas, start, end) => { // 分组计算最长公共前缀
    if (end === start) { // 只有一个元素的情况
      return datas[start]
    }
    if (end - start === 1) { // 两个元素的情况
      return compareSingle(datas, start, end)
    }
    const pos = start + Number.parseInt((end - start) / 2) //中间位置
    const leftStr = longestCommonPrefixReal(datas, start, pos)
    if (leftStr) { // 左半部分的结果不为空，需要再和右半部分进行
      const rightStr = longestCommonPrefixReal(datas, pos + 1, end)
      return longestCommonPrefixReal([leftStr, rightStr], 0, 1)
    } else { // 左半部分为空，直接返回''
      return ''
    }
  }
  const result = longestCommonPrefixReal(strs, 0, strs.length - 1)
  console.log('longestCommonPrefix result: ', result)
  return result
}
/* 3. 题目：判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）
            读都是一样的整数。你能不将整数转为字符串来解决这个问题吗？

      示例：输入: 121
            输出: true

            输入: -121
            输出: false
            解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
*/
const isPalindrome = (num) => {
  console.log('reverseNum num: ', num)
  if (num < 0 || (num && !(num % 10))) { // 边界情况
    console.log('reverseNum result: false for minu or x0')
    return false
  }
  let next = 0
  let tmp = Number.parseInt(num / 10) // 记录num去掉最小一位
  // 反转到下一次反转不会出现num < next（也可以直接反转到第一次num<=next为止）
  while (num > next && num !== next && tmp !== next) {
    next = next * 10 + num % 10
    num = tmp
    tmp = Number.parseInt(num / 10)
  }
  console.log('reverseNum result: ', num === next || tmp === next)
  return num === next || tmp === next
}

/* 2. 题目：给出一个32位的有符号整数，你需要将这个整数中每位上的数字进行反转。
            假设我们的环境只能存储得下32位的有符号整数，则其数值范围为 
            [−2^31, 231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

      示例：输入 x = -120
            输出 -21
*/
const reverseNum = (num) => {
  console.log('reverseNum num: ', num)
  const CONST_NUM = Math.pow(2, 31)
  const LIMIT = { max: CONST_NUM - 1, min: -CONST_NUM }
  const minus = num < 0 // 记录正负
  let tmpNum = num
  if (minus) {
    tmpNum = -tmpNum // 对正数进行操作，减少逻辑复杂性
  }
  while (tmpNum && tmpNum % 10 === 0) {
    tmpNum /= 10 // 去除末尾的0，此步骤可以忽略不进行
  }
  if (tmpNum < 10) {
    console.log('reverseNum result: ', num)
    return tmpNum // 如果只有一位，直接return
  }
  tmpNum = new String(tmpNum)
  const first = Number.parseInt(tmpNum[0]) // 拿出结果的个位数，避免反转后益处
  tmpNum =  Number.parseInt(tmpNum.substring(1, tmpNum.lenth).split('').reverse().join('')) // 剩余位数反转
  if ((!minus && tmpNum > LIMIT.max / 10)
    || (minus && tmpNum > -LIMIT.min / 10)) { // 剩余反转后的值大于限制的对应值，直接返回0
    console.log('reverseNum result: 0 for big')
    return 0
   // 剩余反转后的值等于限制的对应值，但是个位数大于限制值的个位数，直接返回0
  } else if ((!minus && tmpNum === LIMIT.max / 10 && first > LIMIT.max % 10)
    || (minus && tmpNum === -LIMIT.min / 10 && first > -LIMIT.min % 10)) {
    console.log('reverseNum result: 0 for last num')
    return 0
  }
  tmpNum = (tmpNum * 10 + first) * (minus ? -1 : 1)
  console.log('reverseNum result: ', tmpNum)
  return tmpNum
}

const reverseNum2 = (num) => {
  console.log('reverseNum num: ', num)
  const CONST_NUM = Math.pow(2, 31)
  const LIMIT = { max: CONST_NUM - 1, min: -CONST_NUM }
  LIMIT.maxNext = Number.parseInt(LIMIT.max / 10)
  LIMIT.minNext = Number.parseInt(LIMIT.min / 10)
  let res = 0
  const minus = num < 0
  while (!minus && num >= 10 || minus && num <= -10) { // 除最高位，其他位先反转
    res = res * 10 + num % 10
    num = Number.parseInt(num / 10)
  }
  if (res > LIMIT.maxNext || (res === LIMIT.maxNext && num > LIMIT.max % 10)) {
    console.log('reverseNum result: 0 for big')
    return 0 // 已经反转的值和限制值的对应值对比，如果相等则对比剩余的一位
  }
  if (res < LIMIT.minNext || (res === LIMIT.minNext && num < LIMIT.min % 10)) {
    console.log('reverseNum result: 0 for small')
    return 0 // 已经反转的值和限制值的对应值对比，如果相等则对比剩余的一位
  }
  res = res * 10 + num
  console.log('reverseNum result: ', res)
  return res
}

/* 1. 题目：给定一个整数数组nums和一个整数目标值sum，请你在该数组中找出和为目
            标值的那两个整数，并返回它们的数组下标。你可以假设每种输入只会对应
            一个答案。但是，数组中同一个元素不能使用两遍。

      示例：输入 nums = [2, 7, 11, 15], sum = 9
            输出 [0, 1]
            解释 因为 nums[0] + nums[1] == 9 返回 [0, 1] 。
*/
const elementForSum = (nums, sum) => {
  const tmp = {} // 记录待检验结果，类似HashMap、dict等
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    if (tmp[item] >= 0) { // 待检验结果中存在当前的元素
      console.log('elementForSum result: ', [tmp[item], i])
      return [tmp[item], i] // 输出结果
    }
    tmp[sum - item] = i // 记录需要结果的下标
  }
  console.log('elementForSum result: not found!')
}

__main__()
