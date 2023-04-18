export default async function generateImages(postBody) {

  const apiToken = import.meta.env.VITE_OPEN_AI_TOKEN; // Our Open AI API token
  const postUrl = `https://api.openai.com/v1/images/generations`; // The URL for our request
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + apiToken
  }
  let data;
  // We use kintone.proxy in order to get around CORS errors.
  // This sends a POST request to the Open AI DALL-E API.
  // When we get a response we designate it as "response" and then log it to the console, then return it.
  await kintone.proxy(postUrl, 'POST', headers, postBody).then(function (response) {
    data = JSON.parse(response[0])
  })
  return data;
};
