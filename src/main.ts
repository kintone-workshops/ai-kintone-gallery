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

      //TODO
      title: event.record.title.value, // The title of our article from our kintone record
      contentFormat: 'markdown', // String: The format we use: "markdown" or "html"
      content: event.record.body.value, // String: The body of our article, from our kintone record.
      tags: ['kintone', 'medium', 'low-code'], // Array: String "tags" for our article. Optional!
      publishStatus: 'public', // String: The status of our article: "public", "draft", or "unlisted"
      notifyFollowers: false // Boolean: Sends a notification after publishing.
    }

    // Create a button
    const mySpaceFieldButton = document.createElement('button');
    //TODO
    // Give it an id, class (for CSS), and text on the button.
    mySpaceFieldButton.id = 'publishToMedium'; // Our "element ID" from our blank space in the kintone app.
    mySpaceFieldButton.className = 'uploadButton';
    mySpaceFieldButton.innerHTML = 'Publish to Medium!';

    // TODO
    //Run a function when the button is clicked
    mySpaceFieldButton.onclick = function () {
      // We need to call our API POST function, and give it our post body data... 🧐
      postToMedium(body);
    };
    //Set button on the Blank space field
    kintone.app.record.getSpaceElement('publishToMedium')!.appendChild(mySpaceFieldButton);
  });
})();