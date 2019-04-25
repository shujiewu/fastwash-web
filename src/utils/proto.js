import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'

// 响应体的message
const MessageResponse = protoRoot.lookup('sputnik.pb.FrameResult')

export function isArrayBuffer(obj) {
  return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

// function utf2buffer(utfstr) {
//   var buf = new ArrayBuffer(utfstr.length)
//   var bufView = new Uint8Array(buf)
//   for (var i = 0, strlen = utfstr.length; i < strlen; i++) {
//     bufView[i] = utfstr.charCodeAt(i)
//   }
//   return buf
// }

function set_item_box(item) {
  const box = {}
  box.x = 1
  box.y = 2
  box.w = 3
  box.h = 4
  item.box = box
  item.frameId = 11112
  return item
}

export function transformRequest(gt_item) {
  const item = {}
  set_item_box(item)
  const res = {
    version: '数傑',
    frameId: 11112,
    items: [item]
  }
  res.items = [item]
  // res.items.add()
  console.log(res)
  console.log(1111)
  return res
  // const gtboxes = gt_item['gtboxes']
  // gtboxes.forEach(box => {
  //   const item = protoRoot.lookupType('sputnik.pb.Item')
  //   item.item_text_utf8 = 'vec'
  //   set_item_box(item, box)
  // })
  // extra = None if "extra" not in gt else gt['extra']
  // tag = None if "tag" not in gt else gt['tag']
  //
  // # set attribute class
  // item.item_text_utf8 = tag
  // # set type for thing
  //   item.type = 6
  // item = set_item_box(item, gt['box'], -1 if extra is None else int(extra['ignore']))
}

export function transformResponse(rawResponse) {
  // 判断response是否是arrayBuffer
  // if (rawResponse == null || !isArrayBuffer(rawResponse)) {
  //   return rawResponse
  // }

  // const userInfo = protoRoot.lookupType('sputnik.pb.Box')
  // const infoData = {}
  // infoData.x = 1
  // infoData.y = 11
  // infoData.w = 24
  // infoData.h = 0

  // const userInfo = protoRoot.lookupType('sputnik.pb.FrameResult')
  // const infoData = transformRequest(1)
  // var errMsg = userInfo.verify(infoData)
  // if (errMsg) { throw Error(errMsg) }
  // console.log(userInfo.create(infoData))
  // const infoEncodeMessage = userInfo.encode(userInfo.create(infoData)).finish()
  // console.log(infoEncodeMessage)
  // const infoUnSerialized = userInfo.decode(infoEncodeMessage)
  // console.log('unserialized info message:')
  // console.log(infoUnSerialized)
  try {
    // console.log(rawResponse)
    // rawResponse = new Uint8Array(rawResponse)
    // if (rawResponse == null || !isArrayBuffer(rawResponse)) {
    //   console.log(1)
    //   return rawResponse
    // }
    const buf = protobuf.util.newBuffer(rawResponse)
    var errMsg = MessageResponse.verify(buf)
    if (errMsg) { throw Error(errMsg) }
    const decodedResponse = MessageResponse.decode(buf)
    console.log(decodedResponse)
    return decodedResponse
  } catch (err) {
    return err
  }
}
