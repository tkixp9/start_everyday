
const __main__ = () => {
  console.log('---------------------------')
  // reverseNum2(-2147483642) // 002
  // reverseNum(3840) // 002
  // elementForSum([1, 2,7,11,15], 9) // 001
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
