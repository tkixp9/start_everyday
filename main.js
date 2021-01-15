
const __main__ = () => {
  console.log('-------------divider--------------')
  placeFlowers([1, 0, 0, 0, 0, 0, 1, 0, 0])
  // canPlaceFlowers([0], 1)
  // max2Profit([7, 1, 5, 3, 6, 4])
  // maxProfit1([3, 2, 9, 1, 2, 8])
  // mergeOrders([4,5,6,0,0,0], 3, [1,2,3],3)
  // climbStairs1(6)
  // longestCommonPrefix2(['flower', 'flow', 'flight'])
  // isPalindrome(1234321)
  // reverseNum2(-2147483642) // 002
  // reverseNum(3840) // 002
  // elementForSum([1, 2,7,11,15], 9) // 001
}


/* 9. 题目：（LeetCode 122）种花问题：假设有一个很长的花坛，一部分地块种植了花，
             另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
             给你一个整数数组  flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，
             1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则
             返回 true ，不能则返回 false。

            输入：flowerbed = [1,0,0,0,1], n = 1
            输出：true
*/
const canPlaceFlowers = (flowerbed, n) => {
  console.log('canPlaceFlowers datas: ', flowerbed, n)
  if (n < 1) {
    console.log('canPlaceFlowers result: true')
    return true
  }
  const len = flowerbed.length
  const findBlock = (nums, pos) => { // 从pos位置开始，找到第一块空地
    let start = -1
    let end = -1
    let i = pos
    while (i < len && (start === -1 || flowerbed[i] === 0)) {
      const item = flowerbed[i]
      if (item === 0) {
        if (start === -1) {
          start = i // 记录空地开始位置 
        }
        end = i // 更新空地结束位置
      }
      i++
    }
    return { start, end, len: end - start + 1 }
  }
  let i = 0
  let nowN = 0
  while (i < len) {
    const result = findBlock(flowerbed, i) // 寻找空地 
    let tmp = result.len
    if (result.start === 0) {
      tmp++
    }
    if (result.end === len - 1) {
      tmp++
    }
    nowN += Number.parseInt(tmp / 2 - .5) // 计算找到的空地可以中几盆花
    if (nowN >= n) { // 已经种够了
      console.log('canPlaceFlowers result: true')
      return true
    }
    if (result.end === -1) { // 找不到空地了
      break
    }
    i = result.end + 2 // 下一块空地开始的位置
  }
  console.log('canPlaceFlowers result: false')
  return false
}

const placeFlowers = (flowerbed) => {
  console.log('placeFlowers flowerbed: ', flowerbed)
  const len = flowerbed.length
  const findBlock = (nums, pos) => {
    let start = -1
    let end = -1
    let i = pos
    while (i < len && (start === -1 || flowerbed[i] === 0)) {
      const item = flowerbed[i]
      if (item === 0) {
        if (start === -1) {
          start = i
        }
        end = i
      }
      i++
    }
    return { start, end, len: end - start + 1 }
  }
  let i = 0
  let nowN = 0
  while (i < len) {
    const result = findBlock(flowerbed, i)
    let tmp = result.len
    if (result.start === 0) {
      tmp++
    }
    if (result.end === len - 1) {
      tmp++
    }
    nowN += Number.parseInt(tmp / 2 - .5)
    if (result.end === -1) {
      break
    }
    i = result.end + 2
  }
  console.log('placeFlowers result: ', nowN)
  return nowN
}
/* 8. 题目：（LeetCode 122）给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
             设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
             注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

            输入: [7,1,5,3,6,4]
            输出: 7
            解释: 在第 2 天（股票价格 = 1）的时候买入，
                  在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
                  随后，在第 4 天（股票价格 = 3）的时候买入，
                  在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
*/
const max2Profit = (prices) => {
  console.log('max2Profit prices: ', prices)
  if (prices.length < 2) {
    return 0
  }
  let buy = prices[0] // 记录新的买点
  let sell = -1 // 可能的卖点
  let result = 0 // 记录最大利润
  let i = 1
  const len = prices.length
  while (i <= len) {
    const tmp = prices[i]
    if (tmp < buy || tmp < sell) { // 发现更低点，更新买点
      const newResule = sell - buy
      if (newResule > 0) { // 存在利润，完成一次买卖
        result += newResule
      }
      buy = tmp
      sell = -1
    } else if (tmp > sell) { // 发现高点，更新卖点
      sell = tmp
    }
    i++
  }
  const newResule = sell - buy
  if (newResule > 0) { // 完成最后一次买卖
    result += newResule
  }
  console.log('max2Profit result: ', result)
  return result
}

/* 7. 题目：（LeetCode 121）给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
            如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

            注意：你不能在买入股票前卖出股票。
            示例：输入: [7,1,5,3,6,4]
                  输出: 5
                  解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
*/
const maxProfit = (prices) => {
  console.log('maxProfit prices: ', prices)
  // buy和sell的0位置记录前一个低点买入获取最大利润的位置
  // buy和sell的1位置记录下一个更低点的位置
  const buy = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const sell = [-1, -2]
  let i = 0
  const len = prices.length
  while (i <= len) {
    const tmp = prices[i]
    if (tmp < buy[1]) { // 寻找到一个更低点
      if (sell[1] - buy[1] > sell[0] - buy[0]) { // 判断是否更新上一个最大利润的位置
        sell[0] = sell[1]
        buy[0] = buy[1]
      }
      buy[1] = tmp // 记录新的最低点
      sell[1] = -2
    } else if (tmp > sell[1]) { // 更新高点
      sell[1] = tmp
    }
    i++
  }
  const result = Math.max(sell[0] - buy[0], sell[1] - buy[1], 0)
  console.log('maxProfit result: ', result)
  return result
}

const maxProfit1 = (prices) => {
  console.log('maxProfit prices: ', prices)
  if (prices.length < 2) {
    return 0
  }
  let buy = prices[0] // 记录新的买点
  let sell = prices[1] // 记录新的卖点
  let result = 0 // 记录最大利润
  let i = 1
  const len = prices.length
  while (i <= len) {
    const tmp = prices[i]
    if (tmp < buy) { // 更新买点
      const newResule = sell - buy
      if (newResule > result) { // 判断是否更新新低点钱的最大利润
        result = newResule
      }
      buy = tmp
      sell = -1
    } else if (tmp > sell) { // 更新卖点
      sell = tmp
    }
    i++
  }
  result = Math.max(sell - buy, result, 0) // 最后一次更新利润
  console.log('maxProfit result: ', result)
  return result
}

/* 6. 题目：（LeetCode 88）给你两个有序整数数组 nums1 和 nums2，
             请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
             初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假
             设 nums1 有足够的空间（空间大小等于 m + n）来保存 nums2 中的元素。

              示例：输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
                    输出：[1,2,2,3,5,6]
*/
const mergeOrders = (num1, m, num2, n) => {
  console.log('mergeOrders data: ', num1, m, num2, n)
  let i = m - 1
  let j = n - 1
  let k = m + n - 1
  while (j >= 0) {
    if (i < 0) {
      num1[k--] = num2[j--]
      continue
    }
    if (num2[j] > num1[i]) {
      num1[k--] = num2[j--]
    } else {
      num1[k--] = num1[i--]
    }
  }
  console.log('mergeOrders result: ', num1)
  return num1
}

/* 5. 题目：（LeetCode 70）假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
            每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

            注意：给定 n 是一个正整数。
*/
const climbStairs = (num) => { // climbStairs(n) = climbStairs(n - 1) + climbStairs(n - 2)
  console.log('climbStairs num: ', num)
  if (num === 1) {
    return 1
  }
  if (num === 2) {
    return 2
  }
  const result = climbStairs(num - 1) + climbStairs(num - 2)
  console.log('climbStairs result: ', result)
  return result
}

const climbStairs1 = (num) => { // climbStairs(n) = climbStairs(n - 1) + climbStairs(n - 2)
  console.log('climbStairs num: ', num)
  if (num === 1) {
    return 1
  }
  if (num === 2) {
    return 2
  }
  let last = 1 // n - 2
  let result = 2 // n - 1
  let tmp = 0
  for (let i = 3; i <= num; i++) {
    tmp = result
    result += last
    last = tmp
  }
  console.log('climbStairs result: ', result)
  return result
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
