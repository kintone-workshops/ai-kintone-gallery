import './style.css';

(function () {
  'use strict';
  kintone.events.on('app.record.detail.show', function (event) {

    const postBody = {
      prompt: "A kitten smoking a cigarette.",
      n: 1,
      size: "512x512",
      response_format: "url"
    }

    const generateImages = async (postBody) => {

      const postUrl = `https://api.openai.com/v1/images/generations`; // The URL for our request
      const apiToken = import.meta.env.VITE_OPEN_AI_TOKEN; // Our Open AI API token
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + apiToken
      }

      // We use kintone.proxy in order to get around CORS errors.
      // This sends a POST request to the Open AI DALL-E API.
      // When we get a response we designate it as "response" and then log it to the console.
      kintone.proxy(postUrl, 'POST', headers, postBody).then(function (response) {
        console.log(response[1]);
        console.log(JSON.parse(response[0]));
        console.log(response[2]);
      })
    };

    // Create a button for our AI API call
    const generateButton = document.createElement('button');
    //TODO
    generateButton.id = 'generateButton'; // Our "Element ID" from our Blank Space in the Kintone App.
    // Give it an id & class (for CSS), and text on the button.
    generateButton.className = '.uploadbutton';
    generateButton.innerHTML = 'Generate Images!';

    // TODO
    // Run a function when the button is clicked
    generateButton.onclick = function () {
      // We need to call our API POST function with request's body... 🧐
      generateImages(postBody);
    };


    // Set button on the Blank Space field
    kintone.app.record.getSpaceElement('generateButton').appendChild(generateButton);
  });
})();