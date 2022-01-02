'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  let body = event.body
  if (event.isBase64Encoded) {
    body = Buffer.from(body)
  }
  const list = await db.collection('system')
    .doc('79550af260f83242286a017e23bd8ffc')
    .get()
  const access_token = list.data[0].access_token
  console.log(body.toString('ascii'))
  const r = await uniCloud.httpclient.request(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${access_token}`, {
    method: 'POST',
    data: JSON.stringify({
      content: body.toString('ascii')
    })
  })
  return JSON.parse(r.data.toString('ascii'))
}
