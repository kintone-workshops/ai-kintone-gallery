# OpenAI Art Generator & Gallery Workshop Steps

## Outline <!-- omit in toc -->
- [OpenAI Art Generator \& Gallery Workshop Steps](#openai-art-generator--gallery-workshop-steps)
  - [A. Get Started - Clone the Repo \& Install Dependencies](#a-get-started---clone-the-repo--install-dependencies)
  - [B. Get Your Free Kintone Database](#b-get-your-free-kintone-database)
  - [C. Create a `.env` file](#c-create-a-env-file)
  - [D. Create a Kintone Web Database App](#d-create-a-kintone-web-database-app)
  - [E. Generate an API Token for Kintone App](#e-generate-an-api-token-for-kintone-app)
  - [F. Edit Your customize-manifest.json](#f-edit-your-customize-manifestjson)
  - [G. Create an OpenAI API Key](#g-create-an-openai-api-key)
  - [H. Edit main.js](#h-edit-mainjs)
  - [I. Compile and upload the code to Kintone](#i-compile-and-upload-the-code-to-kintone)
  - [J. Add a record to the Kintone App to generate an image](#j-add-a-record-to-the-kintone-app-to-generate-an-image)
  - [Check Your Work](#check-your-work)
  - [Still got a problem?](#still-got-a-problem)
<!-- markdownlint-enable MD007 -->

## A. Get Started - Clone the Repo & Install Dependencies

First, clone the [kintone-workshops/ai-kintone-gallery](https://github.com/kintone-workshops/ai-kintone-gallery) repo!  🚀  
Then go inside the folder & install the dependencies!

```shell
cd Downloads

git clone https://github.com/kintone-workshops/ai-kintone-gallery

cd ai-kintone-gallery

npm install

npm install -g @kintone/customize-uploader
```

## B. Get Your Free Kintone Database

1. Go to [kintone.dev/new/](http://kintone.dev/new/) and fill out the form.  
   * ⚡ Only use lowercase, numbers, & hyphens in your subdomain
   * ⚠ Do not use uppercase or special characters
   * 🤖 Example subdomain: `example`
   * ✅ Use Chrome or Firefox
   * ❌ Do not use Safari
2. Look for "**Welcome to Kintone! One More Step for Developer License**" email in your inbox and click the **Activate Now** button.
   * Sent from `developer@kintone.com`
   * If you don't see it, check your spam folder
3. Set the **Initial Password**
4. Log into your Kintone Subdomain
   * URL: {your subdomain}.kintone.com (e.g. `example.kintone.com`)
   * Login Name: Your email address
   * Password: The password you set in Step 3
   * ⚡ If you forget your password, you can reset it by clicking the **Having Trouble Logging In?** link on the login screen.

|                                                                                              |                                                                                                                |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ![Step 1: Fill out the Kintone Developer license sign-up form](././img/SignUp-1.png)         | ![Step 2: Email address will be the login name & the subdomain will be your unique link](././img/SignUp-2.png) |
| ![Step 3: Check for a "Welcome to Kintone! One More Step To..." email](././img/SignUp-3.png) | ![Step 4: Log into Kintone](././img/SignUp-4.png)                                                              |

## C. Create a `.env` file

Duplicate the [.env.example](./../.env.example) file and save as `.env` file.  
This is where we will be saving the login credentials and API Keys.

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

So far you can fill out the following variables:
* `KINTONE_BASE_URL`
* `KINTONE_USERNAME`
* `KINTONE_PASSWORD`
* `VITE_KINTONE_SUBDOMAIN`

### ⚠️ WARNING ⚠️ <!-- omit in toc -->

⚠️ DO NOT DELETE THE [.env.example](./../.env.example) FILE!  
[.env.example](./../.env.example) is used by env-cmd to verify that the `.env` file is correctly configured.

## D. Create a Kintone Web Database App

Let's create an **AI Image Generator and Gallery** Kintone App!  
This is where you will generate and store images generated using OpenAI's DALL·E 2.

Here are the required fields & their configurations for our workshop:

| Field Type      | Field Name                   | Field Code       | Note                                                             |
| --------------- | ---------------------------- | ---------------- | ---------------------------------------------------------------- |
| Space           |                              | `generateButton` | Where the **Generate Images** button will be displayed           |
| Radio button #1 | **I want a...**              | `animal`         | Options: `dog` & `cat`                                           |
| Radio button #2 | **who looks...?**            | `emotion`        | Options: `happy`, `sad`, `angry`, & `confused`                   |
| Text            | **Holding a...**             | `random`         |                                                                  |
| Check Box       | **wearing... ?**             | `clothes`        | Options: `a hat`, `a jacket`, `new shoes`                        |
| Date and Time   | **Image Generated Datetime** | `dateTime`       | Check the `Default to the record creation date and time.` box    |
| Attachment      | **Result**                   | `result`         | Where the image generated by OpenAI's DALL·E 2 will be displayed |

To create the Kintone App, click on the **➕** button on the upper right side of the Kintone Portal.
* ![Screenshot: The "➕" button](img/CreateApp-1.png)

Once you have configured the fields, the Kintone App should look like this:  
![Screenshot of the completed Kintone App](img/KintoneApp_Complete.png)

Then, click the **Save** and **Activate App** buttons! 💪

_Confused? 🤔 → Check out the [How to Create a Kintone Database App](https://youtu.be/pRtfn-8cf_I) video 📺_

## E. Generate an API Token for Kintone App

We need to generate an API Token for our Kintone App.

1. From the Kintone App, click the **App Settings** button ⚙️ on the upper right side.
   * ![Screenshot: The "App Settings" button](https://get.kintone.help/k/img/settings_new_icon.png)
1. Select the **App Settings** tab
1. Under **Customization and Integration**, click the **API Token** button.
1. Click **Generate**. ![Screenshot: The "Generate" button](img/KintoneApp_API_1.png)
1. Check the `Add records` and `Edit records` boxes.  
   ![Screenshot: The "Add records" and "Edit records" boxes](img/KintoneApp_API_2.png)
1. Copy the API Token and past it to the `VITE_KINTONE_TOKEN` variable in your `.env` file.
1. Click the **Save** button on the bottom right side of the screen.
1. Click the **Update App** button on the upper right side of the screen.

## F. Edit Your customize-manifest.json

Next, we need to tell our uploading scripts which Kintone App we will be working on.

Open your [customize-manifest.json](../customize-manifest.json). It will look like this:

```json
{
    "app": "1",
    "scope": "ALL",
    "desktop": {
        "js": ["dist/KintoneCustomization.umd.js"],
        "css": ["dist/style.css"]
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

### Update the `.env` file with the App ID as well! <!-- omit in toc -->
Input the App ID into the `VITE_KINTONE_APPID` variable in your `.env` file.

## G. Create an OpenAI API Key

Head to [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) to access OpenAI's API Key settings page.

Then click the `Create new secret key` button to generate a new API Key.

![Create new secret key button highlighted on the Open AI API Key Settings page](img/openai_token_01.png)

Copy the API Key and paste it into your `.env` file.  
Paste your API Key from OpenAI into the `VITE_OPEN_AI_TOKEN` variable in your `.env` file.

---

## H. Edit main.js

For this workshop, we will only be coding in [./src/main.js](../src/main.js).


---

## I. Compile and upload the code to Kintone

Save your work and build your code by entering `npm run build` in your terminal!
Then upload your code to Kintone by entering `npm run upload` in your terminal!

## J. Add a record to the Kintone App to generate an image

TODO: Add step stuff

## Check Your Work

Is your code not working?

Compare your [./src/main.js](../src/main.js) with the [Solution.md](./Solution.md) to see if it is all written correctly.

## Still got a problem?

Check out README's [Debugging](../README.md#debugging---lets-fix-those-problems) section!

And finally, post your Kintone customization questions over at our community forum:  
[forum.kintone.dev](https://forum.kintone.dev/)

Good luck coding! 💪
