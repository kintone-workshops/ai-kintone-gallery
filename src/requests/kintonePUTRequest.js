export default async function updateKintone(recordID, image, dateTime) {

  // Our Kintone API token
  const apiToken = import.meta.env.VITE_KINTONE_TOKEN;
  // レコード更新URL
  const updateURL = `https://${import.meta.env.VITE_KINTONE_SUBDOMAIN}.kintone.com/k/v1/record.json`;
  // ファイルアップURL
  const fileURL = `https://${import.meta.env.VITE_KINTONE_SUBDOMAIN}.kintone.com/k/v1/file.json`;
  const boundary = '---------------------------20111107kintone20111107cybozucom';
  const headers = {
    "X-Cybozu-API-Token": apiToken,
  }
  headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;

  let fileUploadResponse = await kintone.proxy.upload(fileURL, 'POST', headers, { 'format': 'RAW', 'value': image })
    .then(res => {
      console.log(res);
      console.log("res from upload")
      return res
    })
  console.log(fileUploadResponse)
  let fileKey = await JSON.parse(fileUploadResponse[0]).fileKey
  console.log("updating kintone...")

  var putBody = {
    'app': import.meta.env.VITE_KINTONE_APPID,
    'id': recordID,
    'record': {
      result: {
        value: [{
          "fileKey": fileKey
        }]
      },
      'dateTime': {
        'value': dateTime
      }
    }
  };
  console.log(putBody)

  headers['Content-Type'] = `application/json`;

  // We use kintone.proxy in order to get around CORS errors.
  // This sends a PUT request to our Kintone Record to update with our new image.
  await kintone.proxy(updateURL, 'PUT', headers, JSON.stringify(putBody)).then(function (response) {
    console.log("kintoneProxy...")
    console.log(response)
    let data = JSON.parse(response[0])
  })
};