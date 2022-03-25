import './style.css'

interface Event {
  appId: number;
  recordId: number;
  record: kintone.types.SavedFields;
}

(function () {
  "use strict";

  kintone.events.on('app.record.detail.show', function (event: Event) {
    const message = "Hello from Vite";
    console.log(message);
    console.log(event.record.title.value)
  });
})();