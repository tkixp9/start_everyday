
const __main__ = () => {
  console.log('-------------divider--------------')
  canJump2([2, 1, 3, 1, 4])
  // multiply('3', '2')
  // isValidSudoku([[".",".",".",".","5",".",".","1","."],[".","4",".","3",".",".",".",".","."],[".",".",".",".",".","3",".",".","1"],["8",".",".",".",".",".",".","2","."],[".",".","2",".","7",".",".",".","."],[".","1","5",".",".",".",".",".","."],[".",".",".",".",".","2",".",".","."],[".","2",".","9",".",".",".",".","."],[".",".","4",".",".",".",".",".","."]])
  // divide(2147483647, 1)
  // maxArea2([1, 8, 6, 2, 5, 4, 8, 3, 7])
  // threeSum2([1,-1,-1,0])
  // lengthOfLongestSubstring2('cdd')
  // distributeCandies([1, 1, 5, 1, 3, 6])
  // canPlaceFlowers2([1,0,0,0,0,1], 2)
  // placeFlowers([1, 0, 0, 0, 0, 0, 1, 0, 0])
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


/* 16. 题目：（LeetCode 55）跳跃游戏：给定一个非负整数数组 nums ，你最初位于
              数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最
              大长度。判断你是否能够到达最后一个下标。
 
              示例：

              输入：nums = [2, 3, 1, 1, 4]
              输出：true
              解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

*/

const canJump2 = (nums) => {
  console.log('canJump nums1: ', nums)
  const end = nums.length - 1
  const drops = new Set() // 存放已经遍历过的下标，也可以考虑不存储
  let i = 0
  while (i < end) {
    drops.add(i)
    const current = i
    if (!nums[i]) {
      while (true) {
        if (--i <= 0) { // 找不到合适的位置
          console.log('canJump result: ', false)
          return false
        }
        if (!drops.has(i)) {
          drops.add(i)
          if (i + nums[i] > current) { // 找到合适的位置
            break
          }
        }
      }
    }
    i += nums[i]
  }
  console.log('canJump result: ', true)
  return true
}

const canJump = (nums) => {
  console.log('canJump nums1: ', nums)
  const end2 = nums.length - 1
  let maxIndex = 0 // 记录可以到达的最大位置
  let i = 0
  while (maxIndex < end) {
    const tmp = nums[i] + i
    if (tmp > maxIndex) {
      maxIndex = tmp
    }
    if (++i > maxIndex) { // 无法到达下一个位置
      console.log('canJump result: ', false)
      return false
    }
  }
  console.log('canJump result: ', true)
  return true
}

/* 15. 题目：（LeetCode 43）字符串相乘：给定两个以字符串形式表示的非负
              整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积
              也表示为字符串形式。
              
              示例:
                  输入: num1 = "2", num2 = "3"
                  输出: "6"
              说明：

                  num1 和 num2 的长度小于110。
                  num1 和 num2 只包含数字 0-9。
                  num1 和 num2 均不以零开头，除非是数字 0 本身。
                  不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

*/

const multiply = (num1, num2) => {
  console.log('multiply nums: ', num1, num2)
  if (num1 === '0' || num2 === '0') {
    return '0'
  }
  const len1 = num1.length
  const len2 = num2.length
  const result = new Array(len1 + len2).fill(0) // 记录结果
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      const sum = num1[i] * num2[j] + result[i + j + 1]
      console.log('tkyj++++', sum)
      result[i + j + 1] = sum % 10
      result[i + j] += Number.parseInt(sum / 10)
    }
  }
  if (!result[0]) { // 结果可能有两种位数
    result.shift()
  }
  console.log('multiply result: ', result.join(''))
  return result.join('')
}


const multiply1 = (num1, num2) => {
  console.log('multiply nums: ', num1, num2)
  if (num1 === '0' || num2 === '0') {
    return '0'
  }
  const end1 = num1.length - 1
  const end2 = num2.length - 1
  const max = end1 + end2 + 1
  const result = new Array(max + 1) // 记录结果
  let moveIndex = 0 // 循环步数，记录结果的每一位
  let sum = 0 // 计算每一位的结果
  while (moveIndex <= max) { // m位 * n位的结果为m+n位或者m+n-1位
    let moveTmp = moveIndex
    while (moveTmp >= 0) { 
      const index2 = end2 - moveTmp // 对位计算
      if (index2 < 0) {
        moveTmp += index2
        continue
      }
      const index1 = end1 - moveIndex + moveTmp // 对位计算
      if (index1 > end1 || index1 < 0) {
        break
      }
      sum += num1[index1] * num2[index2] // 对位计算
      moveTmp--
    }
    result[max - moveIndex] = sum % 10 // 保存结算结果
    sum = Number.parseInt(sum / 10) // 进位
    moveIndex++
  }
  if (!result[0]) { // 结果可能有两种位数
    result.shift()
  }
  console.log('multiply result: ', result.join(''))
  return result.join('')
}


/* 14. 题目：（LeetCode 36）有效数独：判断一个 9x9 的数独是否有效。
              只需要根据以下规则，验证已经填入的数字是否有效即可。
              数字 1-9 在每一行只能出现一次。
              数字 1-9 在每一列只能出现一次。
              数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

              示例:
                   输入:
                        [
                          ["5","3",".",".","7",".",".",".","."],
                          ["6",".",".","1","9","5",".",".","."],
                          [".","9","8",".",".",".",".","6","."],
                          ["8",".",".",".","6",".",".",".","3"],
                          ["4",".",".","8",".","3",".",".","1"],
                          ["7",".",".",".","2",".",".",".","6"],
                          [".","6",".",".",".",".","2","8","."],
                          [".",".",".","4","1","9",".",".","5"],
                          [".",".",".",".","8",".",".","7","9"]
                        ]
                    输出: true
*/

const isValidSudoku = (nums) => {
  console.log('isValidSudoku nums: ', nums)
  const blockMap = new Array(9).fill({})
  const columnMap = new Array(9).fill({})
  for (let i = 0; i < 9; i++) {
    let rowMap = {}
    for (let j = 0; j < 9; j++) {
      const item = nums[i][j]
      if (item === '.') {
        continue
      }
      if (rowMap[item] || columnMap[j][item]) {
        console.log('isValidSudoku result: false')
        return false
      }
      const tmp = blockMap[Number.parseInt(i / 3) * 3 + Number.parseInt(j / 3)]
      if (tmp[item]) {
        console.log('isValidSudoku block result: false')
        return false
      }
      rowMap[item] = columnMap[j][item] = tmp[item] = true
    }
  }
  console.log('isValidSudoku result: true')
  return true
}


const isValidSudoku2 = (nums) => {
  console.log('isValidSudoku nums: ', nums)
  const checkRow = (i, j) => {
    const item = nums[i][j]
    for (let k = j + 1; k < 9; k++) { // 只需要与后面的进行比较
      if (item === nums[i][k]) {
        return false
      }
    }
    return true
  }
   const checkColumn = (i, j) => {
    const item = nums[i][j]
    for (let k = i + 1; k < 9; k++) { // 只需要与后面的进行比较
      if (item === nums[k][j]) {
        return false
      }
    }
    return true
  }
  const checkBlock = (i, j) => {
    const item = nums[i][j]
    while (true) {
      j++ // 列加1
      const jMode = j % 3
      if (jMode === 0) { // 列超出块
        j -= 3 // 列回到原来的块初始位置
        i++ // 行加1
        if (i % 3 === 0) { // 行超出块，检查完成
          return true
        }
      }
      if (item === nums[i][j]) { // 发现有相同的
        return false
      }
    }
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (nums[i][j] === '.') {
        continue
      }
      if (!checkRow(i, j) || !checkColumn(i, j) || !checkBlock(i, j)) {
        console.log('isValidSudoku result: false')
        return false
      }
    }
  }
  console.log('isValidSudoku result: true')
  return true
}

const isValidSudoku1 = (nums) => {
  console.log('isValidSudoku nums: ', nums)
  const checkLine = (index) => {
    const tmpRow = {} // 存储行的数据
    const tmpColumn = {} // 存储列的数据
    for (let i = 0; i < 9; i++) {
      const rowItem = nums[index][i]
      const columnItem = nums[i][index]
      const rowInt = rowItem !== '.'
      const columnInt = columnItem !== '.'
      if ((rowInt && tmpRow[rowItem]) || (columnInt && tmpColumn[columnItem])) { // 发现重复
        return false
      }
      rowInt && (tmpRow[rowItem] = true) // 记录行数据
      columnInt && (tmpColumn[columnItem] = true) // 记录列数据
    }
    return true
  }
  const checkBlock = (index) => {
    const tmp = {}
    // 计算块开始 的位置
    const start = { r: Number.parseInt(index / 3) * 3, c: Number.parseInt(index % 3) * 3 }
    for (let i = 0; i < 9; i++) {
      // 计算块中的元素
      const item = nums[start.r + Number.parseInt(i / 3)][start.c + Number.parseInt(i % 3)]
      if (item === '.') {
        continue
      }
      if (tmp[item]) { // 发现重复
        return false
      }
      tmp[item] = true // 记录块数据
    }
    return true
  }
  for (let i = 0; i < 9; i++) {
    if (!checkLine(i) || !checkBlock(i)) {
      console.log('isValidSudoku result: false')
      return false
    }
  }
  console.log('isValidSudoku result: true')
  return true
}


/* 14. 题目：（LeetCode 29）两数相除：给定两个整数，被除数 dividend 和除数 divisor。
              将两数相除，要求不使用乘法、除法和 mod 运算符。返回被除数
               dividend 除以除数 divisor 得到的商。整数除法的结果应当截去
              （truncate）其小数部分，例如：truncate(8.345) = 8 以及 
              truncate(-2.7335) = -2

              示例:
                  输入: dividend = 10, divisor = 3
                  输出: 3
              解释: 10/3 = truncate(3.33333..) = truncate(3) = 3

              提示：
                  被除数和除数均为 32 位有符号整数。
                  除数不为 0。
                  假设我们的环境只能存储 32 位有符号整数，
                  其数值范围是 [−231,  231 − 1]。本题中，如果除法
                  结果溢出，则返回 231 − 1。

*/
const divide = (dividend, divisor) => {
  console.log('divide nums: ', dividend, divisor)
  if (!divisor) { // 除数为0
    return NaN
  }
  const minus = dividend > 0 ^ divisor > 0 // 结果为负数
  // 被除数和除数转为负数,使用负数，避免溢出
  divisor = divisor < 0 ? divisor : -divisor
  dividend = dividend < 0 ? dividend : -dividend
  if (dividend === divisor) { // 相等返回
    return minus ? -1 : 1
  }
  const min = -1 << 31 // 最小数
  if (dividend === min && divisor === -1 && !minus) {
    return -(min + 1) // 溢出的返回结果
  }
  if (dividend > divisor) {
    return 0
  }
  if (divisor === -1) {
    return -dividend * (minus ? -1 : 1)
  }
  const singleDivide = (first, second) => { // 一次算术式除法
    first = Number.parseInt(first)
    second = Number.parseInt(second)
    let result = 0
    while (first >= second) {
      first -= second
      result++
    }
    return { quotient: result, remainder: String(first) }
  }
  const result = []
  let org = String(dividend)
  org = org.substring(1, org.length)
  const maxLen = org.length
  let second = String(divisor)
  second = second.substring(1, second.length)
  let i = second.length
  let first = org.substring(0, i) // 转换为字符串进行截取操作
  while (true) {
    const tmp = singleDivide(first, second)
    result.push(tmp.quotient) // 一次试商
    i++ // 右边加一位
    if (i > maxLen) {
      break
    }
    first = tmp.remainder + org[i - 1] // 一次余数加上下一位
  }
  console.log('divide result: ', Number.parseInt(result.join('')) * (minus ? -1 : 1))
  return Number.parseInt(result.join('')) * (minus ? -1 : 1)
}

const divide2 = (dividend, divisor) => {
  console.log('divide nums: ', dividend, divisor)
  if (!divisor) {
    return NaN
  }
  const minus = dividend > 0 ^ divisor > 0
  divisor = divisor < 0 ? divisor : -divisor
  dividend = dividend < 0 ? dividend : -dividend
  if (dividend === divisor) {
    return minus ? -1 : 1
  }
  const min = -1 << 31
  if (dividend === min && divisor === -1 && !minus) {
    return -(min + 1)
  }
  if (dividend > divisor) {
    return 0
  }
  if (divisor === -1) {
    return -dividend * (minus ? -1 : 1)
  }
  const realDivide = (first, second) => {
    if (first < second) {
      return 0
    }
    let result = 1
    let tmp = second
    while (tmp + tmp < first) { // 试减数
      tmp += tmp // 减数翻倍
      result += result // 结果翻倍
    }
    return result + realDivide(first - tmp, second) // 剩余继续处理
  }
  dividend -= divisor // 先减去一次，避免溢出
  const result = realDivide(-dividend, -divisor) + 1 // 加上减去的一次
  console.log('divide result: ', result * (minus ? -1 : 1))
  return result * (minus ? -1 : 1)
}

const divide3 = (dividend, divisor) => {
  console.log('divide nums: ', dividend, divisor)
  if (!divisor) {
    return NaN
  }
  const minus = dividend > 0 ^ divisor > 0
  divisor = divisor < 0 ? divisor : -divisor
  dividend = dividend < 0 ? dividend : -dividend
  if (dividend === divisor) {
    return minus ? -1 : 1
  }
  const min = -1 << 31
  if (dividend === min && divisor === -1 && !minus) {
    return -(min + 1)
  }
  if (dividend > divisor) {
    return 0
  }
  if (divisor === -1) {
    return -dividend * (minus ? -1 : 1)
  }
  dividend -= divisor // 先减去一次，避免溢出
  dividend = -dividend
  divisor = -divisor
  let count = 0
  while (dividend >> 1 >= divisor) { // 左移
    count++
    divisor <<= 1
  }
  let result = 0
  while (count >= 0) {
    if (divisor <= dividend) { // 试商
      result += 1 << count
      dividend -= divisor
    }
    divisor >>= 1 // 右移
    --count // 商结果移位
  }
  result++ // 加上减去的一次
  console.log('divide result: ', result  * (minus ? -1 : 1))
  return result  * (minus ? -1 : 1)
}

/* 13. 题目：（LeetCode 11）盛最多水的容器： 给你 n 个非负整数 a1，a2，...，an，
              每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直
              线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得
              它们与 x 轴共同构成的容器可以容纳最多的水。

              说明：你不能倾斜容器。
              示例：
                    输入：[1,8,6,2,5,4,8,3,7]
                    输出：49 
              解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。
              在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

*/
const maxArea = (nums) => {
  console.log('maxArea nums: ', nums)
  const len = nums.length
  let max = 0
  for (let i = 0; i < len; i++) {
    const current = nums[i]
    let left = 0
    let right = len - 1
    while (!(right === i && left === i)) { // 不断寻找
      const lenLeft = i - left
      const lenRight = right - i
      if (lenLeft >= lenRight) { // 左边比较远
        if (current <= nums[left]) { // 找到比nums[i]大的值
          max = Math.max(max, current * (i - left))
          break
        }
        left++
      } else { // 右边比较远
        if (current <= nums[right]) {
          max = Math.max(max, current * (right - i))
          break
        }
        right--
      }
    }
  }
  console.log('maxArea result: ', max)
  return max
}

const maxArea2 = (nums) => {
  console.log('maxArea nums: ', nums)
  const len = nums.length
  let left = 0
  let right = len - 1
  let max = 0
  while (left < right) {
    const flag = nums[left] < nums[right] // 左边的值小
    const tmp = (right - left) * (flag ? nums[left] : nums[right]) // 当前容器
    tmp > max && (max = tmp)
    flag ? left++ : right-- // 继续移动
  }
  console.log('maxArea result: ', max)
  return max
}
/* 12. 题目：（LeetCode 15）三数之和： 给你一个包含 n 个整数的数组 nums，
              判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
              请你找出所有和为 0 且不重复的三元组。

              注意：答案中不可以包含重复的三元组。

              示例 :
                    输入：nums = [-1,0,1,2,-1,-4]
                    输出：[[-1,-1,2],[-1,0,1]]
*/
const threeSum = (nums) => {
  console.log('threeSum nums: ', nums)
  let len = nums.length
  if (len < 3) { // 边界情况
    console.log('threeSum result: ', [])
    return []
  }
  nums.sort((a, b) => a - b) // 排序
  const findRest = (result, flag, start, end) => { // 根据flag寻找另外两个
    let left = start
    let right = end
    while (left < right) {
      const tmp = { left: nums[left], right: nums[right] }
      if (tmp.right < 0) {
        break
      }
      const sum = tmp.left + tmp.right + flag // 计算三个位置的值
      if (sum === 0) {
        result.push([flag, tmp.left, tmp.right])
        while (left < right && tmp.left === nums[++left]) {} // 避免重复
        while (left < right && tmp.right === nums[--right]) {} // 避免重复
      } else if (sum > 0) {
        while (left < right && tmp.right === nums[--right]) {} // 避免重复
      } else {
        while (left < right && tmp.left === nums[++left]) {} // 避免重复
      }
    }
  }
  const result = []
  let i = 0
  while (i < len - 2 && nums[i] <= 0) {
    const first = nums[i]
    if (first !== nums[i - 1]) { // 避免 重复
      findRest(result, first, i + 1, len - 1) // 确定i为第一个
    }
    i++
  }
  console.log('threeSum result: ', result)
  return result
}

const threeSum2 = (nums) => {
  console.log('threeSum nums: ', nums)
  let len = nums.length
  if (len < 3) { // 边界情况
    console.log('threeSum result: ', [])
    return []
  }
  nums.sort((a, b) => a - b) // 排序
  const result = []
  let first, second, third
  for (let i = 0; i < len - 2; i++) {
    second = third = null
    if (first === nums[i]) { // 避免重复
      continue
    }
    first = nums[i]
    for (let j = i + 1; j < len - 1; j++) {
      third = null
      if (second === nums[j]) {
        continue
      }
      second = nums[j]
      for (let k = j + 1; k < len; k++) {
        if (third === nums[k]) {
          continue
        }
        third = nums[k]
        if (first + second + third === 0) {
          result.push([first, second, third])
        }
      }
    }
  }
  console.log('threeSum result: ', result)
  return result
}

/* 11. 题目：（LeetCode 3）无重复字符的最长子串: 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
              示例 :
                    输入: s = "abcabcbb"
                    输出: 3 
              解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
*/
const lengthOfLongestSubstring2 = (str) => {
  console.log('lengthOfLongestSubstring str: ', str)
  const splitAll = (indexes, org, lastMax) => { // 一次寻找重复字符，分割子串
     // start:开始位置，end：结束位置，current：当前寻找重复字符的位置
    const { start, end, current } = indexes[0]
    if (current >= end || lastMax > end - start + 1) { // 整个子串寻找结束：寻找完成或者子串太短
      indexes.shift()
      return end - start + 1 // 当前子串没有重复字符，可以是最后结果 
    }
    const flag = org[current] // 判断的重复字符
    let pos = current
    let last = start - 1
    while (true) {
      const tmp = pos
      pos = org.indexOf(flag, pos + 1) // 寻找下一个重复字符
      if (pos !== -1 && pos <= end) { // 找到一个重复字符
        if (lastMax < pos - last - 1) { // 足够长的重复字符分割的子串放入待判断子串数组中
          indexes.push({ start: last + 1, end: pos - 1, current: last + 1 })
        }
        indexes[0].drop = true
        last = tmp
      } else {
        break
      }
    }
    if (indexes[0].drop) {
      // 最后一个重复字符到end的子串放入待判断子串数组中
      lastMax < end - last && indexes.push({ start: last + 1, end, current: last + 1 })
      indexes.shift() // 当前子串中已经判断有重复字符，删除
    } else {
      indexes[0].current++ // 还未找到重复字符，继续判断下一个位置
      return current - start + 1
    }
    console.log('lengthOfLongestSubstring abcabcbbab indexes: ', JSON.stringify(indexes))
  } 
  const indexes = [{ start: 0, end: str.length - 1, current: 0 }] //初始位置子串
  let result = 0
  while (indexes.length) {
    result = Math.max(splitAll(indexes, str, result) || 0, result)
  }
  console.log('lengthOfLongestSubstring result: ', result)
  return result
}

const lengthOfLongestSubstring = (str) => {
  console.log('lengthOfLongestSubstring str: ', str)
  const len = str.length
  if (!len) {
    return 0
  }
  let count = 0 // 最后的结果
  let start = 0 // 当前不重复字符串的开始位置
  let last = {} // 用来存储当前的不重复字符
  last[str[0]] = 0
  let end = 1 // 当前的位置
  while (end < len) {
    const item = str[end]
    const index = last[item]
    if (index >= start) { // 发现重复字符
      count = Math.max(count, end - start) // 记录已经得到的最大长度
      start = index + 1 // 下一次开始的位置
    }
    last[item] = end // 记录新字符
    end++ // 继续遍历
  }
  count = Math.max(count, end - start)
  console.log('lengthOfLongestSubstring result: ', count)
  return count
}

/* 10. 题目：（LeetCode 575）分糖果: 给定一个偶数长度的数组，其中不同的数字代表着不同种类的糖果，
              每一个数字代表一个糖果。你需要把这些糖果平均分给一个弟弟和一个妹妹。
              返回妹妹可以获得的最大糖果的种类数。
              示例 :
              输入: candies = [1,1,2,2,3,3]
              输出: 3
              解析: 一共有三种种类的糖果，每一种都有两个。
                   最优分配方案：妹妹获得[1,2,3],弟弟也获得[1,2,3]。这样使妹妹获得糖果的种类数最多。
*/
const distributeCandies = (nums) => {
  console.log('distributeCandies nums: ', nums)
  const max = nums.length / 2
  const set = new Set() // 存放妹妹的糖果
  let count =  0 // 也可以直接使用set.size
  for (const item of nums) {
    if (!set.has(item)) { // 只分给妹妹没有的糖果
      if (++count === max) { // 妹妹是否分完糖果
        console.log('distributeCandies result: ', count)
        return count
      }
      set.add(item) // 分给妹妹
    }
  }
  console.log('distributeCandies result: ', count)
  return count
}
const distributeCandies1 = (nums) => {
  console.log('distributeCandies nums: ', nums)
  const result = Math.min(nums.length / 2, new Set(nums).size)
  console.log('distributeCandies result: ', result)
  return result
}

/* 9. 题目：（LeetCode 605）种花问题：假设有一个很长的花坛，一部分地块种植了花，
             另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
             给你一个整数数组  flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，
             1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则
             返回 true ，不能则返回 false。

            输入：flowerbed = [1,0,0,0,1], n = 1
            输出：true
*/
const canPlaceFlowers2 = (flowerbed, n) => {
  console.log('canPlaceFlowers2 datas: ', flowerbed, n)
  if (n < 1) {
    console.log('canPlaceFlowers2 result: true')
    return true
  }
  const len = flowerbed.length
  let count = 0
  let prev = 0
  let next = flowerbed[0]
  let i = 0
  while (count < n && i < len) {
    const current = next
    next = flowerbed[i + 1]
    if (prev === 0 && current === 0 && next !== 1) { // 可以种花的条件
      if (++count >= n) {
        console.log('canPlaceFlowers result: true')
        return true
      }
      i += 2 // 比较位置整体向后移动两位
      prev = next
      next = flowerbed[i]
    } else {
      i++ // 比较位置整体向后移动一位
      prev = current
    }
  }
  console.log('canPlaceFlowers result: false')
  return false
}

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
    if (result.start === 0) { // 开始边界情况
      tmp++
    }
    if (result.end === len - 1) { // 结尾边界情况
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
