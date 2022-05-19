  // Our POST API request. This function takes in a "postBody", which must be an object.
  // The object (our article details) is defined in main.ts and passed here.
export default async function postToMedium(postBody: object){

  const authorID = import.meta.env.VITE_AUTHOR_ID; // Our medium.com author ID
  const postUrl = `https://api.medium.com/v1/users/${authorID}/posts`; // The URL for our request
  const apiToken = import.meta.env.VITE_API_TOKEN; // Our medium.com "integration token"
  const headers = {
    'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + apiToken
  }

  // We use kintone.proxy in order to get around CORS errors.
  // This sends a POST request to the medium.com API.
  // When we get a response we designate it as "response" and then log it to the console.
  kintone.proxy(postUrl, 'POST', headers, postBody).then(function(response) {
    //response[0] -> body(string)
    //response[1] -> status(number) 
    // 200 -> Success, 400 -> Error with your post body, 401 -> bad API token, 403 -> Wrong Author ID
    //response[2] -> headers(object)
    console.log(response[1]);
    console.log(JSON.parse(response[0]));
    console.log(response[2]);
  })
};