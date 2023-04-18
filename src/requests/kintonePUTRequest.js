// kintonePUTRequest.js
const uploadFile = async (blob, name) => {
  const formData = new FormData();
  formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
  formData.append('file', blob, name);

  const fileKey = await fetch(kintone.api.url('/k/v1/file.json', true), {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
  }).then(res => res.json()).then(({ fileKey }) => fileKey);
  return fileKey;
};

export default async function updateKintone(recordID, image, dateTime) {
  const fileKey = await uploadFile(image, 'image.png');
  const putBody = {
    app: import.meta.env.VITE_KINTONE_APPID,
    id: recordID,
    record: {
      result: {
        value: [{
          fileKey
        }]
      },
      dateTime: {
        value: dateTime
      }
    }
  };
  console.log(putBody)
  const response = await kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', putBody);
  console.log(response)
  return response;
}