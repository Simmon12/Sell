// 存储
// 传入三个参数， seller 的id， 要存储的key和value
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__ // 使用__只是一种标记写法,标记是自定义的某种编码规范,这里代表这只是seller的数据
  if(!seller) {  // 第一次生成seller的时候初始化
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)  // json 字符串需要解析
    if(!seller[id]) {            // 不同seller的时候初始化
      seller[id] = {}
    }
  }
  seller[id][key] = value       //生成当前的seller对象
  // localStorage只能存储字符串，需要转成json字符串
  window.localStorage.__seller__ = JSON.stringify(seller)
}

// 读取
// 三个参数，seller的id，之前存储的key，和一个默认值
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  if(!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if(!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def    //解析成功但是没有这个seller的id的也返回默认值
}
