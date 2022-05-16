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
      title: null, // The title of our article from our kintone record
      contentFormat: null, // String: The format we use: "markdown" or "html"
      content: null, // String: The body of our article, from our kintone record.
      tags: null, // Array: String "tags" for our article. Optional!
      publishStatus: null, // String: The status of our article: "public", "draft", or "unlisted"
      notifyFollowers: null // Boolean: Sends a notification after publishing.
    }

    // Create a button
    const mySpaceFieldButton = document.createElement('button');
    // Give it an id, class (for CSS), and text on the button.
    mySpaceFieldButton.id = 'null';
    mySpaceFieldButton.className = 'null';
    mySpaceFieldButton.innerHTML = 'null';

    //Run a function when the button is clicked
    mySpaceFieldButton.onclick = function () {
      // Our function, imported above from ./requests/post_api.ts
      null
    };
    //Set button on the Blank space field
    kintone.app.record.getSpaceElement('publishToMedium')!.appendChild(mySpaceFieldButton);
  });
})();