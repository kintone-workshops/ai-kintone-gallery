// kintonePUTRequest.js

// A function to upload the image file to Kintone. This returns a file key.
// The file key then needs to be uploaded to the record, to associate the file with the record.
// In short, it takes two steps to upload attachments.
const uploadFile = async (blob, name) => {
  // The Kintone attachment API specifies we need "multipart data."
  // One way of designating multipart data is by sending as formdata.
  const formData = new FormData();
  formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
  formData.append('file', blob, name);

  // We await the attachment API result from Kintone.
  const fileKey = await fetch(kintone.api.url('/k/v1/file.json', true), {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
  }).then(res => res.json()).then(({ fileKey }) => fileKey);
  // And return it from this function.
  return fileKey;
};

// A function to update our Kintone record all in one go. We'll be calling the uploadFile function above in here.
export default async function updateKintone(recordID, image, dateTime) {
  // Get our fileKey using the uploadFile function above...
  const fileKey = await uploadFile(image, 'image.png');
  // Put the fileKey in the putBody.
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
  const response = await kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', putBody);
  // Await the response from the update record API, and then return it.
  return response;
}