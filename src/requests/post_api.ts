export default async function postToMedium(postBody: object){

  const authorID = "1df66a8dd2779709d3ca3b3526a4a0190972b8fe95afc7412eebdc4d0030f0549";
  const postUrl = `https://api.medium.com/v1/users/${authorID}/posts`;
  const apiToken = '26a1c60c10c1e578fcbe7e04707ebf415c9c3d01066c09d7b2d0a15a438ae5a5a'

  let response = await fetch(postUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(postBody),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://sean.kintone.com',
      'Authorization': 'Bearer ' + apiToken } 
  });
  
  if (!response.ok) 
  { 
      console.error("Error");
  } else {
    console.log(response);
  }

};
