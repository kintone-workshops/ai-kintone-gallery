import './style.css';
import postToMedium from './requests/post_api';

interface Event {
  appId: number;
  recordId: number;
  record: kintone.types.SavedFields;
}

(function () {
  "use strict";
  kintone.events.on('app.record.detail.show', function (event: Event) {

    const body = {
      title: event.record.title.value,
      contentFormat: "markdown",
      content: event.record.body.value,
      tags: ["kintone", "typescript", "low-code"],
      publishStatus: "public"
    }

    // Create a button
    var mySpaceFieldButton = document.createElement('button');
    mySpaceFieldButton.id = 'publishToMedium';
    mySpaceFieldButton.className = 'uploadButton';
    mySpaceFieldButton.innerHTML = 'Publish To Medium';

    //Run a function when the button is clicked
    mySpaceFieldButton.onclick = function () {
      console.log("button clicked!")
      postToMedium(body);
    };
    //Set button on the Blank space field
    kintone.app.record.getSpaceElement('publishToMedium')!.appendChild(mySpaceFieldButton);
  });
})();