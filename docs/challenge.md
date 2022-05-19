# Challenges - Next Step for You

- Tags: The `tags` field of our API POST body are hard coded right now. Try to add a [Multi-choice](https://get.kintone.help/k/en/user/app_settings/form/form_parts/multi_choice.html) field to your kintone app, and pull the tags for an article from there.

- Refactor the app to a reactive, stateful framework: Right now, our app has no "state". By using a custom view, a reactive framework like `React` expanding the app will become much easier.

- [Show a spinner](https://kintone.dev/en/tutorials/miscellaneous/display-an-animated-loading-spinner/) while the API call is in progress

- Notify the user when the upload fails, and why. Hint: Right now our `kintone.proxy` function in [../src/requests/post_api.ts](../src/requests/post_api.ts) is simply logging success or error codes to the console.

- The [Medium API supports image uploading](https://github.com/Medium/medium-api-docs#34-images) as well. Write a new API call that uploads an image, gets the URL of that image, and then inserts it into the markdown of your post before publishing.

- Story successfully published? Try to disable the publish button based on the status of the record!
