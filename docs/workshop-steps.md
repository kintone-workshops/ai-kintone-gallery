# Write, Review, and Publish directly to Medium.com with [Kintone Web Database](https://kintone.dev/en/)

## Outline <!-- omit in toc --> <!-- markdownlint-disable MD007 -->

* [Get Started](#get-started)
* [Create a Kintone Web Database App](#create-a-kintone-web-database-app)
* [Create a Medium API Token](#create-a-medium-api-token)
* [Get Your Medium Author ID](#get-your-medium-author-id)
* [Create a `.env` file](#create-a-env-file)
* [Edit Your customize-manifest.json](#edit-your-customize-manifestjson)
* [Edit main.ts](#edit-maints)
  * [Format the Kintone Data for Medium API Call](#format-the-kintone-data-for-medium-api-call)
    * [Title, Content Format, & Content](#title-content-format--content)
    * [Tags](#tags)
    * [Publish Status & Notify Followers](#publish-status--notify-followers)
  * [Append a Button in the Kintone App](#append-a-button-in-the-kintone-app)
* [Build & Upload the customization](#build--upload-the-customization)
* [Check Your Work](#check-your-work)
<!-- markdownlint-enable MD007 -->

## Get Started

First, let's download the [sean-kintone/publish-to-medium](https://github.com/sean-kintone/publish-to-medium) Repo and go inside the folder.

Once you are inside the folder, let's install the dependencies!

```shell
cd Downloads

git clone https://github.com/sean-kintone/publish-to-medium

cd publish-to-medium

npm install

npm install -g @kintone/customize-uploader
```

## Create a Kintone Web Database App

Let's create a **Publish to Medium** Kintone App!  
This is where you will be writing up the Markdown that will be published on your Medium.com account.

![images/kintone-app-setup.gif](images/kintone-app-setup.gif)

Here are the required fields & their configurations for our workshop:

| Field Type  | Field Name | Field Code        | Note                                    |
| ----------- | ---------- | ----------------- | --------------------------------------- |
| Blank Space | ---        | `publishToMedium` | This is where our button will attach    |
| Text        | Title      | `title`           | The title of our medium.com article     |
| Text Area   | Body       | `body`            | The body text of our medium.com article |

Be sure to click the **Save** and **Activate App** buttons! 💪

Confused? 🤔 → Check out the [How to Create a Kintone Database App](https://youtu.be/pRtfn-8cf_I) video 📺

## Create a Medium API Token

First, head to [medium.com/me/settings](https://medium.com/me/settings) to open up your Medium account setting page.  
Click on the **Integration tokens** section.

![images/medium-settings-screen.png](images/medium-settings-screen.png)

Create a new API Token.  
_Don't worry; we have already revoked the one in this screenshot._ 😈

| Input token description                                                           | Grab your integration token / API token                                               |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![images/medium-token-screen-cropped.png](images/medium-token-screen-cropped.png) | ![images/medium-token-complete-cropped.png](images/medium-token-complete-cropped.png) |

## Get Your Medium Author ID

With the API token, we can easily get our Medium.com Author ID.

Copy the curl command below and replace `MY_API_TOKEN` with your API token.  
Then paste the command into your terminal & hit enter!

```shell

cd publish-to-medium

curl -H "Authorization: Bearer MY_API_TOKEN" https://api.medium.com/v1/me | json_pp

```

Here is the curl command with a dummy token:

```shell

cd publish-to-medium

curl -H "Authorization: Bearer 2d6755756a12c743b4312f85fad0246a7953c68b78ef19c9efef134ef6dd8a429" https://api.medium.com/v1/me | json_pp

```

This will return your Author ID and other information in the terminal like so:

``` shell
{
   "data" : {
      "id" : "1df66a8dd2779709d3ca3b3526a4a0190972b8fe95afc7412eebdc4d0030f0549",
      "imageUrl" : "https://cdn-images-1.medium.com/fit/c/400/400/1*YfWnpcmJZnwmHpO-bSnzNA.png",
      "name" : "Kintone Developer Relations",
      "url" : "https://medium.com/@kintone_devrel_jp",
      "username" : "kintone_devrel_jp"
   }
}
```

Copy and keep the `"id"` string, as we will be pasting it into our .env file shortly.

## Create a `.env` file

Using the [.env.example](./../.env.example) file as a temple, create a `.env` file that will contain your login credentials and API Token.

Here is what your `.env` might look like:

```txt
KINTONE_BASE_URL="https://example.kintone.com"
KINTONE_USERNAME="example@gmail.com"
KINTONE_PASSWORD="ILoveKintone!"
VITE_AUTHOR_ID="12345abcde67890"
VITE_API_TOKEN="09876edcba54321"
```

Paste your API Token from Medium into the `VITE_API_TOKEN` field and your Author ID into the `VITE_AUTHOR_ID` field.

⚠️ DO NOT DELETE THE [.env.example](./../.env.example) FILE!  
[.env.example](./../.env.example) is used by env-cmd to verify that `.env` file is correctly configured.

## Edit Your customize-manifest.json

Next, we need to tell our uploading scripts which Kintone App we will be working on.

Open your [customize-manifest.json](../customize-manifest.json) & update the `"app"` variable!

This is what it will look like:

```json
{
    "app": "26",
    "scope": "ALL",
    "desktop": {
        "js": ["dist/KintoneCustomization.js"],
        "css": ["dist/main.css"]
    },
    "mobile": {
        "js": [],
        "css": []
    }
}
```

<!-- ![images/customize-manifest.json](images/customize-manifest.png) -->

We can find our App ID number easily from the Kintone App's URL!

Go to the Kintone App and grab the URL.  
Example: `https://devevents.kintone.com/k/36/`

Kintone App's URL follows this template:  
`https://<SUBDOMAIN>.kintone.com/k/<App ID>/show#record=<RECORD ID>`

So then the `https://devevents.kintone.com/k/26/` URL tells us that this App's ID is `26`

![images/find-app-id.png](images/find-app-id.png)

---

## Edit main.ts

For this workshop, we will only be coding in [./src/main.ts](../src/main.ts).

However, our actual API POST request logic is contained in [./src/requests/post_api.ts](../src/requests/post_api.ts). You can check out that file to see how the POST request to the medium.com API is structured.

Lastly, some TypeScript-specific settings (type definitions!) are found in [./fields.d.ts](../fields.d.ts).  
If you want to expand on this demo (adding an image stored in kintone to your article, for example), you will have to edit this file.

We have two goals for our coding:

1. Format our data (simply called `body` in [./src/main.ts](../src/main.ts)) to send to the `postToMedium` function

2. Create a button to click, and when clicked, fire the `postToMedium` function.

### Format the Kintone Data for Medium API Call

First, let's look at our post body.

![images/1-1.png](images/1-1.png)

``` js
  // The body of our API POST request
  const body = {
    title: null, // The title of our article from our kintone record
    contentFormat: null, // String: The format we use: "markdown" or "html"
    content: null, // String: The body of our article, from our kintone record.
    tags: null, // Array: String "tags" for our article. Optional!
    publishStatus: null, // String: The status of our article: "public", "draft", or "unlisted"
    notifyFollowers: null // Boolean: Sends a notification after publishing.
  }
```

For reference, the [Medium.com API docs](https://github.com/Medium/medium-api-docs#33-posts) on POST Requests are pretty simple!

#### Title, Content Format, & Content

Our post title needs to come from our Kintone App.  
Remember that we set our `Title` field to have a lower-case `title` field code in our Kintone App.

![images/1-2.png](images/1-2.png)

We can access the information on the show page easily in our code:

![images/1-3.png](images/1-3.png)

Next, according to the documentation, Medium articles can be submitted in either Markdown or HTML formats! Pretty cool.  
Let's go with `markdown` this time:

![images/2.png](images/2.png)

The content field should be our `Body` field from our app, which we designated with the `body` field code:

![images/3-1.png](images/3-1.png)

Just like above, fill it in with the record variable:

![images/3-2.png](images/3-2.png)

Continue to fill in the body parameters.  

#### Tags

`tags` are up to you, depending on the contents of your article. The POST API accepts an `array` of `strings`. Here is an example:

```js

tags: ['kintone', 'markdown', 'medium', 'low-code'],

```

#### Publish Status & Notify Followers

`publishStatus` is the status of your article. We are going to publish immediately, but saving to your medium.com account's `drafts` is also possible!

`notifyFollowers` will do exactly that and takes a boolean, `true` or `false`. We're testing, so let's set it as `false` for now.

![images/4.png](images/4.png)

Our finished post body should look similar to this:

```js
    const body = {
      title: event.record.title.value, // The title of our article from our kintone record
      contentFormat: "markdown", // String: The format we use: "markdown" or "html"
      content: event.record.body.value, // String: The body of our article, from our kintone record.
      tags: ["kintone", "medium", "low-code"], // Array: String "tags" for our article. Optional!
      publishStatus: 'public', // String: The status of our article: "public", "draft", or "unlisted"
      notifyFollowers: false // Boolean: Sends a notification after publishing.
    }
```

And done! This should be good data to pass to our API call...  
but we'll need a button for our users to click in order to start the process.

### Append a Button in the Kintone App

Kintone allows you to append `HTML` elements to blank spaces in your Kintone App. When we built our App, we added a `blank space` and gave it the Element ID `publishToMedium`.

| Kintone App's Form Setting Page   | Blank Space Settings > Element ID |
| --------------------------------- | --------------------------------- |
| ![images/5-1.png](images/5-1.png) | ![images/5-2.png](images/5-2.png) |

We tell our App where to append our button by matching the `HTML` IDs.  
Give your button an ID that matches the field code: `publishToMedium`.

![images/6.png](images/6.png)

Our App's custom `CSS` is contained in [./src/style.css](../src/style.css). We can style our button with a CSS class, `uploadButton`.

Lastly, give our button a nice label, so our users can know what it does.

![images/7.png](images/7.png)

Last, we need our button to fire a function when clicked. That function should pass our post `body` data to the API function `postToMedium`.

In the button's `onClick` function, call the `postToMedium` function we imported from [./src/requests/post_api.ts](../src/requests/post_api.ts).

![images/8.png](images/8.png)

## Build & Upload the customization

Save your work and run kintone-customize-uploader by entering `npm run start` in your terminal!  
Navigate to your app, create a record with some Markdown in it, and click the publish button!

See the [slides.pdf](../slides.pdf) for more info!

## Check Your Work

Navigate to your publications and bathe in your newfound journalistic fame!  
Go to [medium.com/me/stories/public](https://medium.com/me/stories/public)

Good luck coding!
