# OpenAI Art Generator & Gallery Workshop Steps

## Outline <!-- omit in toc -->
* [1. Get Started - Clone the Repo \& Install Dependencies](#1-get-started---clone-the-repo--install-dependencies)
* [2. Create a Kintone Web Database App](#2-create-a-kintone-web-database-app)
* [3. Edit Your customize-manifest.json](#3-edit-your-customize-manifestjson)
* [4. Create a `.env` file](#4-create-a-env-file)
* [5. Create an OpenAI API Key](#5-create-an-openai-api-key)
* [Edit main.ts](#edit-maints)
  * [Format the Kintone Data for Medium API Call](#format-the-kintone-data-for-medium-api-call)
    * [Title, Content-Format, \& Content](#title-content-format--content)
    * [Tags](#tags)
    * [Publish Status \& Notify Followers](#publish-status--notify-followers)
  * [Append a Button in the Kintone App](#append-a-button-in-the-kintone-app)
* [Build \& Upload the customization](#build--upload-the-customization)
* [View Your Article](#view-your-article)
* [Check Your Work](#check-your-work)
<!-- markdownlint-enable MD007 -->

## 1. Get Started - Clone the Repo & Install Dependencies

First, clone the [kintone-workshops/ai-kintone-gallery](https://github.com/kintone-workshops/ai-kintone-gallery) repo!  🚀  
Then go inside the folder & install the dependencies!

```shell
cd Downloads

git clone https://github.com/kintone-workshops/ai-kintone-gallery

cd ai-kintone-gallery

npm install

npm install -g @kintone/customize-uploader
```

## 2. Create a Kintone Web Database App

Let's create an **AI Image Generator and Gallery** Kintone App!  
This is where you will generate and store images generated using OpenAI's DALL·E 2.

TODO: Finish this section

![img/kintone-app-setup.gif](img/kintone-app-setup.gif)

Here are the required fields & their configurations for our workshop:

| Field Type  | Field Name | Field Code        | Note                                    |
| ----------- | ---------- | ----------------- | --------------------------------------- |
| Text        | Title      | `title`           | The title of our medium.com article     |
| Text Area   | Body       | `body`            | The body text of our medium.com article |

Be sure to click the **Save** and **Activate App** buttons! 💪

Confused? 🤔 → Check out the [How to Create a Kintone Database App](https://youtu.be/pRtfn-8cf_I) video 📺

## 3. Edit Your customize-manifest.json

Next, we need to tell our uploading scripts which Kintone App we will be working on.

Open your [customize-manifest.json](../customize-manifest.json). It will look like this:

```json
{
    "app": "1",
    "scope": "ALL",
    "desktop": {
        "js": ["dist/KintoneCustomization.umd.js"],
        "css": []
    },
    "mobile": {
        "js": [],
        "css": []
    }
}
```

If this is NOT your first Kintone App, then you need to update the `"app"` variable with your App ID!

The App ID number can be easily found in the Kintone App's URL!

Go to the Kintone App and grab the URL.  
* Example: `https://devevents.kintone.com/k/52/`

Kintone App's URL follows this template:  
* `https://<SUBDOMAIN>.kintone.com/k/<App ID>/show#record=<RECORD ID>`

So then the `https://devevents.kintone.com/k/52/` URL tells us that this App's ID is `52`

![KintoneApp_URL.png](img/KintoneApp_URL.png)

## 4. Create a `.env` file

Using the [.env.example](./../.env.example) file as a temple, create a `.env` file that will contain your login credentials and API Key.

Here is what your `.env` might look like:

```txt
KINTONE_BASE_URL="https://example.kintone.com"
KINTONE_USERNAME="MyEmail@example.com"
KINTONE_PASSWORD="ILoveKintone!"
VITE_KINTONE_SUBDOMAIN="example"
VITE_KINTONE_TOKEN="abcd2ef3g3hij2kl1"
VITE_KINTONE_APPID="1"
VITE_OPEN_AI_TOKEN="1234567890"
```

### ⚠️ WARNING ⚠️ <!-- omit in toc -->

⚠️ DO NOT DELETE THE [.env.example](./../.env.example) FILE!  
[.env.example](./../.env.example) is used by env-cmd to verify that the `.env` file is correctly configured.

## 5. Create an OpenAI API Key

Head to [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) to access OpenAI's API Key settings page.

Then click the `Create new secret key` button to generate a new API Key.

![Create new secret key button highlighted on the Open AI API Key Settings page](img/openai_token_01.png)

Copy the API Key and paste it into your `.env` file.  
Paste your API Key from OpenAI into the `VITE_OPEN_AI_TOKEN` field.

---

## Edit main.ts

For this workshop, we will only be coding in [./src/main.ts](../src/main.ts).

However, our actual API POST request logic is contained in [./src/requests/post_api.ts](../src/requests/post_api.ts). You can check out that file to see how the POST request to the medium.com API is structured.

Lastly, some TypeScript-specific settings (type definitions!) are found in [./fields.d.ts](../fields.d.ts).  
If you want to expand on this demo (_like adding an image stored in Kintone to your article_), you will have to edit this file.

We have two goals for our coding:

1. Format our data (simply called `body` in [./src/main.ts](../src/main.ts)) to send to the `postToMedium` function

2. Create a button to click, and when clicked, fire the `postToMedium` function.

### Format the Kintone Data for Medium API Call

First, let's look at our post body.

![img/1-1.png](img/1-1.png)

```js
const body: PostBody = {
  title: null, // Article's title (from our Kintone record)
  contentFormat: null, // 'markdown' or 'html' (writing format)
  content: null, // Article's body (from our Kintone record)
  tags: null, // String "tags" for our article. Optional!
  publishStatus: null, // The status of our article: 'public', 'draft', or 'unlisted'
  notifyFollowers: null // Sends a notification after publishing.
}
```

For reference, the [Medium.com API docs](https://github.com/Medium/medium-api-docs#33-posts) on POST Requests are pretty simple!

#### Title, Content-Format, & Content

Our post title needs to come from our Kintone App.  
Remember that we set our `Title` field to have a lower-case `title` field code in our Kintone App.

![img/1-2.png](img/1-2.png)

We can access the information on the show page easily in our code:

```js
const body: PostBody = {
  title: events.record.title.value, // Article's title (from our Kintone record)
  contentFormat: null, // 'markdown' or 'html' (writing format)
  content: null, // Article's body (from our Kintone record)
  tags: null, // String "tags" for our article. Optional!
  publishStatus: null, // The status of our article: 'public', 'draft', or 'unlisted'
  notifyFollowers: null // Sends a notification after publishing.
}
```

Next, according to the documentation, Medium articles can be submitted in either Markdown or HTML formats! Pretty cool.  
Let's go with `markdown` this time:

```js
const body: PostBody = {
  title: events.record.title.value, // Article's title (from our Kintone record)
  contentFormat: 'markdown', // 'markdown' or 'html' (writing format)
  content: null, // Article's body (from our Kintone record)
  tags: null, // String "tags" for our article. Optional!
  publishStatus: null, // The status of our article: 'public', 'draft', or 'unlisted'
  notifyFollowers: null // Sends a notification after publishing.
}
```

The `content` parameter should be our `Body` field from our app, which we designated with the `body` field code:

![img/2.png](img/2.png)

Just like above, fill it in with the record variable:

```js
const body: PostBody = {
  title: events.record.title.value, // Article's title (from our Kintone record)
  contentFormat: 'markdown', // 'markdown' or 'html' (writing format)
  content: events.record.title.value, // Article's body (from our Kintone record)
  tags: null, // String "tags" for our article. Optional!
  publishStatus: null, // The status of our article: 'public', 'draft', or 'unlisted'
  notifyFollowers: null // Sends a notification after publishing.
}
```

Continue to fill in the body parameters.  

#### Tags

`tags` are up to you, depending on the contents of your article. The POST API accepts an `array` of `strings`. Here is an example:

```js
tags: ['kintone', 'markdown', 'medium', 'low-code'],
```

#### Publish Status & Notify Followers

`publishStatus` is the status of your article. We will be publishing immediately, but saving to your medium.com account's `drafts` is also possible!

`notifyFollowers` will do exactly that and takes a boolean, `true` or `false`. We're testing, so let's set it as `false` for now.

Our finished post body should look similar to this:

```js
const body: PostBody = {
  title: event.record.title.value, // Article's title (from our Kintone record)
  contentFormat: "markdown", // 'markdown' or 'html' (writing format)
  content: event.record.body.value, // Article's body (from our Kintone record)
  tags: ['kintone', 'markdown', 'medium', 'low-code'], // String "tags" for our article. Optional!
  publishStatus: 'public', // The status of our article: 'public', 'draft', or 'unlisted'
  notifyFollowers: false // Sends a notification after publishing.
    }
```

And done! This should be good data to pass to our API call...  
but we will need a button for our users to click to start the process.

### Append a Button in the Kintone App

Kintone allows you to append `HTML` elements to blank spaces in your Kintone App. When we built our App, we added a `blank space` and gave it the Element ID `publishToMedium`.

| Kintone App's Form Setting Page   | Blank Space Settings > Element ID |
| --------------------------------- | --------------------------------- |
| ![img/3-1.png](img/3-1.png) | ![img/3-2.png](img/3-2.png) |

We tell our App where to append our button by matching the `HTML` IDs.  
Give your button an ID that matches the field code: `publishToMedium`.

```js
// Create a button
const mySpaceFieldButton: HTMLElement = document.createElement('button');
//TODO
mySpaceFieldButton.id = 'publishToMedium'; // Our "Element ID" from our Blank Space in the Kintone App.
// Give it an id & class (for CSS), and text on the button.
mySpaceFieldButton.className = null;
mySpaceFieldButton.innerHTML = null;
```

Our App's custom `CSS` is contained in [./src/style.css](../src/style.css). We can style our button with a CSS class, `uploadButton`.

Lastly, give our button a nice label, so our users can know what it does.

⚡ You are free to set the button's `innerHTML` with any text you want ~  
Try including an emoji 💪!

⚡ Button's `className` is also up to you. If you set a different CSS class, be sure to update [./src/style.css](../src/style.css) ~

```js
// Create a button
const mySpaceFieldButton: HTMLElement = document.createElement('button');
//TODO
mySpaceFieldButton.id = 'publishToMedium'; // Our "Element ID" from our Blank Space in the Kintone App.
// Give it an id & class (for CSS), and text on the button.
mySpaceFieldButton.className = 'uploadButton';
mySpaceFieldButton.innerHTML = 'Click me to Publish!';
```

Last, we need our button to fire a function when clicked. That function should pass our post `body` data to the API function `postToMedium`.

In the button's `onClick` function, call the `postToMedium` function we imported from [./src/requests/post_api.ts](../src/requests/post_api.ts).

```js
mySpaceFieldButton.onclick = function () {
  // We need to call our API POST function with request's body... 🧐
  postToMedium(body);
};
```

## Build & Upload the customization

Save your work and run kintone-customize-uploader by entering `npm run start` in your terminal!  
Navigate to your app, create a record, write some Markdown, and click the publish button!

See the [slides.pdf](../slides.pdf) for more info!

## View Your Article

Navigate to your publications and bathe in your newfound journalistic fame!  
Go to [medium.com/me/stories/public](https://medium.com/me/stories/public)

## Check Your Work

Is your code not working?

Compare your [./src/main.ts](../src/main.ts) with the [completed-code.md](./completed-code.md) to see if it is all written correctly.

Still got a problem?

Check out README's [Debugging](../README.md#debugging---lets-fix-those-problems) section!

And finally, post your Kintone customization questions over at our community forum:  
[forum.kintone.dev](https://forum.kintone.dev/)

Good luck coding! 💪
