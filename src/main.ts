import './style.css';
import postToMedium from './requests/post_api';

// Type definitions for Kintone record events
// These are defined in the fields.d.ts file.
interface Event {
  appId: number;
  recordId: number;
  record: kintone.types.SavedFields;
}

(function () {
  'use strict';
  kintone.events.on('app.record.detail.show', function (event: Event) {

    // API POST request's body
    const body = {

      //TODO
      title: null, // String: Article's title (from our Kintone record)
      contentFormat: null, // String: 'markdown' or 'html' (writing format)
      content: null, // String: Article's body (from our Kintone record)
      tags: null, // Array: String "tags" for our article. Optional!
      publishStatus: null, // String: The status of our article: 'public', 'draft', or 'unlisted'
      notifyFollowers: null // Boolean: Sends a notification after publishing.
    }

    // Create a button
    const mySpaceFieldButton = document.createElement('button');
    //TODO
    // Give it an id & class (for CSS), and text on the button.
    mySpaceFieldButton.id = 'null'; // Our "Element ID" from our Blank Space in the Kintone App.
    mySpaceFieldButton.className = 'null';
    mySpaceFieldButton.innerHTML = 'null';

    // TODO
    // Run a function when the button is clicked
    mySpaceFieldButton.onclick = function () {
      // We need to call our API POST function with request's body... 🧐
      null;
    };
    // Set button on the Blank Space field
    kintone.app.record.getSpaceElement('publishToMedium')!.appendChild(mySpaceFieldButton);
  });
})();