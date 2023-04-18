# Completed Version of [main.js](../src/main.js)

```js
import './style.css';
import generateImages from './requests/aiPOSTRequest';
import updateKintone from './requests/kintonePUTRequest';
import { Spinner } from 'spin.js';

(function () {
  'use strict';

  kintone.events.on('app.record.detail.show', function (event) {

    //A function for converting base64 to blob format.
    const b64toBlob = (base64, type = 'image/png') =>
      fetch(`data:${type};base64,${base64}`).then(res => res.blob())

    //The text we will give to the Open AI API
    const promptBuilder = () => {
      let promptString = `A cute ${event.record.animal.value} who looks ${event.record.emotion.value} holding a ${event.record.random.value} wearing `;

      let clothesArray = event.record.clothes.value;
      clothesArray.forEach((option, index) => {
        if (index == 0) {
          promptString += `${option}`;
        } else {
          promptString = promptString + ` and ${option}`;
        }
      });
      return promptString
    }
    // Spinner Options. Not too important.
    var opts = {
      lines: 13, // The number of lines to draw
      length: 38, // The length of each line
      width: 17, // The line thickness
      radius: 45, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      speed: 1, // Rounds per second
      rotate: 0, // The rotation offset
      animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000000', // CSS color or array of colors
      fadeColor: 'transparent', // CSS color or array of colors
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: '0 0 1px transparent', // Box-shadow for the lines
      zIndex: 2000000000, // The z-index (defaults to 2e9)
      className: 'spinner', // The CSS class to assign to the spinner
      position: 'absolute', // Element positioning
    };

    //The PostBody to send to the OpenAI API
    const postBody = {
      prompt: promptBuilder(),
      n: 1,
      size: "512x512",
      response_format: "b64_json"
    }

    // Create a div for our loading spinner.
    const spinnerTarget = document.createElement('div');
    spinnerTarget.id = "spinner"
    // Create a button for our AI API call
    const generateButton = document.createElement('button');
    generateButton.id = 'generateButton'; 
    // Our "Element ID" from our Blank Space in the Kintone App.
    // Give it an id & class (for CSS), and text on the button.
    generateButton.className = "uploadButton"
    generateButton.innerHTML = 'Generate Images!';

    // Run a function when the button is clicked
    generateButton.onclick = () => {
      // Start the spinner.
      var spinner = new Spinner(opts).spin();
      spinnerTarget.appendChild(spinner.el);
      // We need to call our API POST function with request's body... 🧐
      generateImages(postBody).then(async (result) => {

        // The OpenAI API gives us a response with a timestamp, and an image in base64 format
        const unixTimestamp = result.created;
        // Let's format the timestamp from unix time to a local timezone string.
        const date = new Date(unixTimestamp * 1000); // multiply by 1000 to convert to milliseconds
        const isoDateString = date.toISOString();

        // We convert the base64 to a blob.
        let imageBlob = await b64toBlob(result.data[0].b64_json)
        // And designate it as a file.
        let file = new File([imageBlob], "test.png", { type: 'image/png', lastModified: isoDateString })
        // Then we want to update our record with our new picture!
        await updateKintone(event.recordId, file, isoDateString)
      }).finally(() => {
        // When the async api call is finished, reload the page to see our new image.
        window.location.reload();
      })
    };
    // Set button and Spinner on the Blank Space field
    kintone.app.record.getSpaceElement('generateButton').appendChild(generateButton);
    kintone.app.record.getSpaceElement('spinner').appendChild(spinnerTarget);
  });
})();
```
