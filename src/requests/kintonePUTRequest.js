export default async function updateKintone(recordID, image, dateTime) {

  // Our Kintone API token
  const apiToken = import.meta.env.VITE_KINTONE_TOKEN; 
  // レコード更新URL
  //const url = `https://${import.meta.env.VITE_KINTONE_SUBDOMAIN}.kintone.com/k/v1/record.json`;
  // ファイルアップURL
  const fileURL = `https://${import.meta.env.VITE_KINTONE_SUBDOMAIN}.kintone.com/k/v1/file.json`;

  const boundary = '---------------------------20111107kintone20111107cybozucom';
  const headers = {
    "X-Cybozu-API-Token": apiToken,
  }
  headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;

  console.log("updating kintone...")

  // var putBody = {
  //   'app': import.meta.env.VITE_KINTONE_APPID,
  //   'id': recordID,
  //   'record': {
  //     'Attachment': {
  //       'value': image
  //     },
  //     'dateTime': {
  //       'value': dateTime
  //     }
  //   }
  // };

  //console.log(putBody)

  // let data;
  // // We use kintone.proxy in order to get around CORS errors.
  // // This sends a POST request to the Open AI DALL-E API.
  // // When we get a response we designate it as "response" and then log it to the console.
  // await kintone.proxy(url, 'PUT', fetchOptions, JSON.stringify(putBody)).then(function (response) {
  //   console.log("kintoneProxy...")
  //   console.log(response)
  //   data = JSON.parse(response[0])
  // })

  kintone.proxy.upload(fileURL, 'POST', headers, {'format': 'RAW', 'value': image}).then(function (args) {
    console.log(args)
  }, function (error) {
    console.log(error);
  });
};
