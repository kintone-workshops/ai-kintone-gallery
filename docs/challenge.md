# Challenges - Next Step for You

Here are some challenges for you to tackle next in this project! 💪

<!-- omit in toc -->
<!-- markdownlint-disable MD007 -->
* [Disable the Publish Button](#disable-the-publish-button)
* [Improve the Tags](#improve-the-tags)
* [Refactor the Code](#refactor-the-code)
* [Add a Spinner](#add-a-spinner)
* [Adding Error Messages](#adding-error-messages)
* [Add Image Support](#add-image-support)
<!-- markdownlint-enable MD007 -->

## Disable the Publish Button
Story successfully published? Try to disable the publish button based on the status of the record!

## Improve the Tags
Tags: The `tags` field of our API POST body are hard coded right now. Try to add a [Multi-choice](https://get.kintone.help/k/en/user/app_settings/form/form_parts/multi_choice.html) field to your kintone app, and pull the tags for an article from there.

## Refactor the Code
Refactor the code to a reactive, stateful framework: Right now, our app has no "state". By using a custom view, a reactive framework like `React` expanding the app will become much easier.

## Add a Spinner
[Show a spinner](https://kintone.dev/en/tutorials/miscellaneous/display-an-animated-loading-spinner/) while the API call is in progress

## Adding Error Messages
Notify the user when the upload fails, and why. Hint: Right now our `kintone.proxy` function in [../src/requests/post_api.ts](../src/requests/post_api.ts) is simply logging success or error codes to the console.

## Add Image Support
The [Medium API supports image uploading](https://github.com/Medium/medium-api-docs#34-images) as well. Write a new API call that uploads an image, gets the URL of that image, and then inserts it into the markdown of your post before publishing.
