export default async function postToMedium(postBody: object){

  const authorID = import.meta.env.VITE_AUTHOR_ID;
  const postUrl = `https://api.medium.com/v1/users/${authorID}/posts`;
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const headers = {
    'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + apiToken
  }

  kintone.proxy(postUrl, 'POST', headers, postBody).then(function(response) {
    /*  args[0] -> body(string)
     *  args[1] -> status(number)
     *  args[2] -> headers(object)
     */
    console.log(response[1], JSON.parse(response[0]), response[2]);
  })
};