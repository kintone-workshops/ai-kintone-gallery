import './style.css';
import postToMedium from './requests/post_api';

// Type definitions for kintone record events
// These are defined in the fields.d.ts file.
interface Event {
  appId: number;
  recordId: number;
  record: kintone.types.SavedFields;
}

(function () {
  "use strict";
  kintone.events.on('app.record.detail.show', function (event: Event) {

    // The body of our API POST request
    const body = {
      title: event.record.title.value, // The title of our article
      contentFormat: "markdown", // The format: "markdown" or "html"?
      content: event.record.body.value, // The body of our article.
      tags: ["kintone", "typescript", "low-code"], // An array of string "tags" for our article.
      publishStatus: "public", // The status of our article: "public", "draft", or "unlisted"
      notifyFollowers: false // Sends a notification after publishing. For testing, we'll keep it false.
    }

    // Create a button
    var mySpaceFieldButton = document.createElement('button');
    // Give it an id, class (for CSS), and text on the button.
    mySpaceFieldButton.id = 'publishToMedium';
    mySpaceFieldButton.className = 'uploadButton';
    mySpaceFieldButton.innerHTML = 'Publish To Medium';

    //Run a function when the button is clicked
    mySpaceFieldButton.onclick = function () {
      // Our function, imported above from ./requests/post_api.ts
      postToMedium(body);
    };
    //Set button on the Blank space field
    kintone.app.record.getSpaceElement('publishToMedium')!.appendChild(mySpaceFieldButton);
  });
})();