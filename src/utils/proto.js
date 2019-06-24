import protoRoot from '@/proto/proto'
// import protobuf from 'protobufjs'
// 响应体的message
const MessageResponse = protoRoot.lookup('sputnik.pb.FrameResult')

export function isArrayBuffer(obj) {
  return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

export function transformSubmit(rawRequest, boxes) {
  try {
    var errMsg = MessageResponse.verify(rawRequest)
    if (errMsg) { throw Error(errMsg) }
    const encodeRequest = MessageResponse.encode(MessageResponse.create(rawRequest)).finish()
    return encodeRequest
  } catch (err) {
    return err
  }
}

export function transformResponse(rawResponse) {
  rawResponse = new Uint8Array(atob(rawResponse).split('').map(function(c) {
    return c.charCodeAt(0)
  }))
  try {
    const buf = rawResponse // protobuf.util.newBuffer(rawResponse)
    var errMsg = MessageResponse.verify(buf)
    if (errMsg) { throw Error(errMsg) }
    const decodedResponse = MessageResponse.decode(buf)
    return decodedResponse
  } catch (err) {
    return err
  }
}

// function utf2buffer(utfstr) {
//   var buf = new ArrayBuffer(utfstr.length)
//   var bufView = new Uint8Array(buf)
//   for (var i = 0, strlen = utfstr.length; i < strlen; i++) {
//     bufView[i] = utfstr.charCodeAt(i)
//   }
//   return buf
// }

// function base64toBlob(base64, type) {
//   // 将base64转为Unicode规则编码
//   const bstr = atob(base64, type)
//   let n = bstr.length
//   const u8arr = new Uint8Array(n)
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n) // 转换编码后才可以使用charCodeAt 找到Unicode编码
//   }
//   return u8arr
// }
