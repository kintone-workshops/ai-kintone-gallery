# Write, Review, and Publish directly to Medium.com with [Kintone Web Database](https://kintone.dev/en/)

## Outline <!-- omit in toc --> <!-- markdownlint-disable MD007 -->

* [Get Started](#get-started)
* [Create a Kintone Web Database App](#create-a-kintone-web-database-app)
* [Create a Medium Account](#create-a-medium-account)
* [Create a Medium API Token](#create-a-medium-api-token)
* [Get your Medium Author ID](#get-your-medium-author-id)
* [Create a `.env` file](#create-a-env-file)
* [Edit Your customize-manifest json](#edit-your-customize-manifest-json)
* [Edit main ts](#edit-main-ts)
* [Build & Upload the customization](#build--upload-the-customization)
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

Let's create a Kintone App with some Shapes and Sizes to display!

Here are the required fields & their configurations for our workshop:

| Field Type | Field Name | Field Code        | Note                                    |
| ---------- | ---------- | ----------------- | --------------------------------------- |
| Blank Space|    ---     | `publishToMedium` | This is where our button will attach    |
| Text       | Title      | `title`           | The title of our medium.com article     |
| Text       | Body       | `body`            | The body text of our medium.com article |

Be sure to click the **Save** and **Activate App** buttons! 💪

Confused? 🤔 → Check out the [How to Create a Kintone Database App](https://youtu.be/pRtfn-8cf_I) video 📺

## Create a Medium API Token

![images/medium-home.png](images/medium-home.png)

![images/medium-click-on-settings.png](images/medium-click-on-settings.png)

![images/medium-settings-screen.png](images/medium-settings-screen.png)

![images/medium-token-screen.png](images/medium-token-screen.png)

![images/medium-token-complete.png](images/medium-token-complete.png)

## Get Your Medium Author ID

We can easily get our Medium.com Author ID from our terminal, now that we have our API Token. In the root folder (publish-to-medium) copy and paste the following curl command, replacing MY_API_TOKEN with your token.

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

Copy and keep the "id" string, as we will be pasting into our .env file shortly.

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

Paste your API Token from Medium into the `VITE_API_TOKEN` field, and your Author ID into the `VITE_AUTHOR_ID` field.

⚠️ DO NOT DELETE THE [.env.example](./../.env.example) FILE!  
[.env.example](./../.env.example) is used by env-cmd to verify that `.env` file is correctly configured.

## Edit Your customize-manifest json

Next, we need to tell our uploading scripts which Kintone App we will be working on.

```json
{
    "app": "23",
    "scope": "ALL",
    ...
```

![images/customize-manifest.json](images/customize-manifest.png)

We can find our App ID number easily from the URL of our Kintone App.  
Go to your Kintone App and grab the URL. It should look this: `https://devevents.kintone.com/k/36/`  
Kintone App's URL follows this template: `https://<SUBDOMAIN>.kintone.com/k/<App ID>/show#record=<RECORD ID>`  
So then the `https://devevents.kintone.com/k/36/` URL tells us that this App's ID is `36`

![images/find-app-id.png](images/find-app-id.png)

---

## Edit main ts

For this workshop, we will only be coding in [main.ts](../src/main.ts). However, our actual API POST request logic is contained in [post_api.ts](../src/requests/post_api.ts). You can check out that file to see how the POST request to the medium.com API is structured.

Lastly, some TypeScript specific settings (type definitions!) are found in [fields.d.ts](../fields.d.ts). If you want to expand on this demo (adding an image stored in kintone to your article, for example), you will have to edit this file.

We have two goals for our coding:

1. Format our data (simply called `body` in [main.ts](../src/main.ts)) to send to the postToMedium function

2. Create a button to click, and when clicked, fire the postToMedium function.

First, let's look at our data.

## Build & Upload the customization

With this, we can save our work and run kintone-customize-uploader!
(See the [slides.pdf](../slides.pdf) for more info!) Run `npm run start` in your terminal. Navigate to your app, create a record with some markdown in it, and click the publish button!
Navigate to your publications on [medium.com](www.medium.com/me) and bathe in your new found journalistic fame!

Good luck coding!
