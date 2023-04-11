# Completed Version of [main.ts](../src/main.ts)

```js
import './style.css';
import postToMedium from './requests/post_api';

// Type definitions for Kintone record events
// These are defined in the fields.d.ts file.
interface Event {
  appId: number;
  recordId: number;
  record: kintone.fieldTypes.CustomFields;
}

// Type definitions for our medium POST API data
interface PostBody {
  title: string | null;
  contentFormat: string | null;
  content: string | null;
  tags: Array<string> | null;
  publishStatus: string | null;
  notifyFollowers: boolean | null;
}

(function () {
  'use strict';
  kintone.events.on('app.record.detail.show', function (event: Event) {

    // API POST request's body
    const body: PostBody = {

      //TODO
      title: event.record.title.value, // Article's title (from our Kintone record)
      contentFormat: 'markdown', // 'markdown' or 'html' (writing format)
      content: event.record.body.value, // Article's body (from our Kintone record)
      tags: ['kintone', 'medium', 'low-code'], // String "tags" for our article. Optional!
      publishStatus: 'public', // The status of our article: 'public', 'draft', or 'unlisted'
      notifyFollowers: false // Sends a notification after publishing.
    }

    // Create a button
    const mySpaceFieldButton: HTMLElement = document.createElement('button');
    //TODO
    mySpaceFieldButton.id = 'publishToMedium'; // Our "Element ID" from our Blank Space in the Kintone App.
    // Give it an id & class (for CSS), and text on the button.
    mySpaceFieldButton.className = 'uploadButton';
    mySpaceFieldButton.innerHTML = 'Click me to Publish!';

    // TODO
    // Run a function when the button is clicked
    mySpaceFieldButton.onclick = function () {
      // We need to call our API POST function with request's body... 🧐
      postToMedium(body);
    };
    // Set button on the Blank Space field
    kintone.app.record.getSpaceElement('publishToMedium')!.appendChild(mySpaceFieldButton);
  });
})();
```
