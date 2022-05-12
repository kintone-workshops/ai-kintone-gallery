export default async function postToMedium(postBody: object){

  const authorID = "1df66a8dd2779709d3ca3b3526a4a0190972b8fe95afc7412eebdc4d0030f0549";
  const postUrl = `https://api.medium.com/v1/users/${authorID}/posts`;
  const apiToken = '26a1c60c10c1e578fcbe7e04707ebf415c9c3d01066c09d7b2d0a15a438ae5a5a'
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
