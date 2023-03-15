import './style.css';
import generateImages from './requests/aiPOSTRequest';
import updateKintone from './requests/kintonePUTRequest';

(function () {
  'use strict';

  kintone.events.on('app.record.detail.show', function (event) {

    const b64ToArrayBuffer = (base64) => {
      var binary_string = window.atob(base64);
      console.log("binary string");
      console.log(binary_string)
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }

    const boundary = '---------------------------20111107kintone20111107cybozucom';

    let metaData = `--${boundary}\r\n
    Content-Disposition: form-data; name="file"; filename="image.png"\r\n
    Content-Type: 'application/octet-stream\r\n\r\n`

    const buildArrayBufferFromUnit8 = (str) => {
      const length = str.length;
      const buffer = new ArrayBuffer(length);
      const bufView = new Uint8Array(buffer);
      Array(length).fill(null).forEach((_, i) => {
        bufView[i] = str.charCodeAt(i);
      });
      return buffer;
    };

    const appendBuffer = (buffer1, buffer2) => {
      const uint8Array = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
      uint8Array.set(new Uint8Array(buffer1), 0);
      uint8Array.set(new Uint8Array(buffer2), buffer1.byteLength);
      return uint8Array.buffer;
    };

    //AI APIに投げるテキスト
    const promptBuilder = () => {
      let promptString = `A ${event.record.animal.value} who looks ${event.record.emotion.value} holding a ${event.record.random.value} wearing `;

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

    //AI API用
    const postBody = {
      prompt: promptBuilder(),
      n: 1,
      size: "512x512",
      response_format: "b64_json"
    }

    // Create a button for our AI API call
    const generateButton = document.createElement('button');
    //TODO
    generateButton.id = 'generateButton'; // Our "Element ID" from our Blank Space in the Kintone App.
    // Give it an id & class (for CSS), and text on the button.
    generateButton.className = "uploadButton"
    generateButton.innerHTML = 'Generate Images!';

    // Run a function when the button is clicked
    generateButton.onclick = () => {
      // We need to call our API POST function with request's body... 🧐
      generateImages(postBody).then(async (result) => {
        let imageCreatedDateTime = new Date(result.created * 1000).toISOString()
        let arrayBufferBlob = await b64ToArrayBuffer(result.data[0].b64_json);
        console.log("array buffer blob")
        console.log(arrayBufferBlob);
        let arrayBufferMeta = await buildArrayBufferFromUnit8(metaData)
        console.log("array buffer meta")
        console.log(arrayBufferMeta);
        let rawBlob = await appendBuffer(arrayBufferBlob, arrayBufferMeta)
        console.log(rawBlob)
        let finalBuffer = appendBuffer(rawBlob, buildArrayBufferFromUnit8(
          `\r\n--${boundary}--`
        ));

        let file = new File([finalBuffer], "test.png", { type: 'image/png' })
        console.log(imageCreatedDateTime);
        console.log(event.appId);
        console.log(file)
        updateKintone(event.recordId, file, imageCreatedDateTime)
      })
    };
    // Set button on the Blank Space field
    kintone.app.record.getSpaceElement('generateButton').appendChild(generateButton);
  });
})();