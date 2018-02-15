/**
 * 解析url参数
 * @example ?id=12345&a-b
 * @return Object {id: 12345, a:b}

 */

export function urlParse(argument) {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if(arr) {
    arr.forEach((item) => {
       let tempArr = item.substring(1).split('=')  // 将第一位去掉，然后用等号分割
       let key = decodeURIComponent(tempArr[0])  // URI对于utf-8格式会转码，所以这里需要解码
       let val = decodeURIComponent(tempArr[1])
       obj[key] = val;
    })
  }
  return obj
}

/**
 * 读取url的所有参数,例如http://a.com/?id=12345&a=b的?id=12345&a=b
 * 然后进行正则匹配,/[?&][^?&]+=[^?&]+/g,以?id=12345&a=b为举例:
 * [?&] 先匹配?和&的,url参数都是有这个2个字符作为连接符,就是指匹配?
 * [^?&]+ 然后匹配非?和&的多个,就是指匹配id
 * = 匹配等号
 * [^?&]+ 然后匹配非?和&的多个,就是指匹配12345
 * 加起来就是能够匹配?id=12345&a=b
 * 用对象返回,方便处理.
**/
