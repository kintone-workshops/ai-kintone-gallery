# Build an OpenAI Art Generator & Gallery - JavaScript Workshop

<!-- TODO: Delete once repo is ready -->

## 🚧 This repo is a work in progress! 🚧 <!-- omit in toc -->
* Thank you for visiting! This repo is a work in progress and will be updated soon!
* Be sure to join our [Kintone Developer Meetup](https://www.meetup.com/kintone-developers/) to get notified for all future events!

---

![banner.png](./docs/img/banner.png)

Let's create an AI Art Generator using [OpenAI's DALL·E 2](https://openai.com/product/dall-e-2) and a gallery using the [Kintone web database](https://kintone.dev/en/) together!

## Outline <!-- omit in toc -->
* [Completed Project](#completed-project)
* [Get Started](#get-started)
* [Get Your Free Kintone Database](#get-your-free-kintone-database)
* [Overview of the Repo](#overview-of-the-repo)
* [Kintone Web Database \& Credentials](#kintone-web-database--credentials)
  * [🚀 Getting your FREE Kintone Database](#-getting-your-free-kintone-database)
* [Create a Kintone Web Database App](#create-a-kintone-web-database-app)
* [Create a `.env` file](#create-a-env-file)
* [Input the App ID](#input-the-app-id)
* [Build the customization](#build-the-customization)
* [Quick Dive into JavaScript \& Vite](#quick-dive-into-javascript--vite)
  * [What is JavaScript?](#what-is-javascript)
  * [What is Vite?](#what-is-vite)
  * [Want to learn more?](#want-to-learn-more)
* [Debugging](#debugging)
  * [Errors related to .env](#errors-related-to-env)
  * [Errors related to kintone-customize-uploader](#errors-related-to-kintone-customize-uploader)
  * [`npm install` command is not working](#npm-install-command-is-not-working)
  * [`npm run upload` failed?](#npm-run-upload-failed)
  * [Not seeing a highlighted `TODO:`?](#not-seeing-a-highlighted-todo)
* [Completed Code](#completed-code)

## Completed Project

![Result.gif](docs/img/Result.gif)

## Get Started

First, clone the [kintone-workshops/ai-kintone-gallery](https://github.com/kintone-workshops/ai-kintone-gallery) repo!  🚀  
Then go inside the folder & install the dependencies!

```shell
cd Downloads

git clone https://github.com/kintone-workshops/ai-kintone-gallery

cd ai-kintone-gallery

npm install

npm install -g @kintone/customize-uploader
```

⚡ **Notes** ⚡  
* React requires **Node >= 14.0.0** & **npm >= 5.6**  
* Check the versions inside the `ai-kintone-gallery` folder:
  * `node -v`
  * `npm -v`
* Not the correct versions or confused? 🤔 → Check out the [Guide on Installing Node.js & npm](docs/Install_NodeJS_npm.md) Doc

⚡ Note: Please ignore the package deprecation warnings ⚡

🔎 The `npm install` command installs the required dependencies defined in the package.json files and generates a node_modules folder with the installed modules.

---

Open the `ai-kintone-gallery` folder in [VS Code](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_command-line) as well:

```shell
code .
```

## Get Your Free Kintone Database

[kintone.dev/new/](http://kintone.dev/new/)
* ⚡ Only use lowercase, numbers, & hyphens in your subdomain
* ⚠ Do not use uppercase or special characters

|                                                                                         |                                                                                                                   |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![Step 1: Fill out the Kintone Developer license sign-up form](./docs/img/SignUp-1.png) | ![Step 2: Email address will be the login name & the subdomain will be your unique link](./docs/img/SignUp-2.png) |

---

## Overview of the Repo

| File                                                         | Purpose                                                                      | Need to Modify?        |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- | ---------------------- |
| [package.json](package.json)                                 | Project's metadata & scripts for building and uploading the customization    |                        |
| [.env.example](.env.example)                                 | The template for the .env file                                               |                        |
| [.env](.env)                                                 | Holds the Kintone login credential and View ID                               | Yes! - Create it       |
|                                                              |                                                                              |                        |
| [curl_authorID.txt](curl_authorID.txt)                       | Template for the Medium Author ID curl command                               | Yes! - Add token       |
|                                                              |                                                                              |                        |
| [scripts/npm-start.js](scripts/npm-start.js)                 | Script that uses `npm-run-all` to run `build` & `upload` scripts in parallel |                        |
| [customize-manifest.json](customize-manifest.json)           | Kintone Customize Uploader's configuration file                              | Yes! - Add your App ID |
| [dist/KintoneCustomization.js](dist/KintoneCustomization.js) | The bundled JS build that will be uploaded to Kintone                        |                        |
|                                                              |                                                                              |                        |
| [src/main.ts](src/main.ts)                                   | Heart of the project handling the API request body & adding a button         | Yes! Complete the code |
| [src/style.css](src/style.css)                               | Styling for the project can go here                                          |                        |
| [src/requests/post_api.ts](src/requests/post_api.ts)         | The logic of the Medium.com POST API call                                    |                        |
|                                                              |                                                                              |                        |
| [fields.d.ts](fields.d.ts)                                   | Various type definitions for our JavaScript / Kintone environment            |                        |
| [tsconfig.json](tsconfig.json)                               | Various settings for how JavaScript behaves                                  |                        |
| [vite.config.js](vite.config.js)                             | Various settings for how and where our JavaScript compiles to                |                        |
|                                                              |                                                                              |                        |
| [slides.pdf](slides.pdf)                                     | Workshop presentation's slide deck                                           |                        |
| [docs/workshop-steps.md](docs/workshop-steps.md)             | Step-by-step guide that we do during the workshop                            |                        |

---

## Kintone Web Database & Credentials

### 🚀 Getting your FREE Kintone Database

[kintone.dev/new](http://kintone.dev/new/)
* ⚡ Only use lowercase, numbers, & hyphens in your subdomain
* ⚠ Do not use uppercase nor special characters

|                                             |                                             |
| ------------------------------------------- | ------------------------------------------- |
| ![SignUp-1.png](./docs/img/SignUp-1.png) | ![SignUp-2.png](./docs/img/SignUp-2.png) |

---

## Create a Kintone Web Database App

Let's create a **AI Image Generator and Gallery** Kintone App!  
This is where you will be generating and storing images generated using OpenAI's DALL·E 2.

<!-- TODO: Create a Kintone Create Gif -->
![./docs/img/kintone-app-setup.gif](./docs/img/kintone-app-setup.gif)

Kintone makes setting up a web database with API routes for getting information easy. The .gif above is one minute in length!

Here are the required fields & their configurations for our workshop:

| Field Type  | Field Name | Field Code        | Note                                    |
| ----------- | ---------- | ----------------- | --------------------------------------- |
| Blank Space | ---        | `publishToMedium` | This is where our button will attach    |
| Text        | Title      | `title`           | The title of our medium.com article     |
| Text Area   | Body       | `body`            | The body text of our medium.com article |

Be sure to click the **Save** and **Activate App** buttons! 💪

Confused? 🤔 → Check out the [How to Create a Kintone Database App](https://youtu.be/pRtfn-8cf_I) video 📺

### 📺 How to Create a Kintone Database App | Video <!-- omit in toc -->

<p align="center">
  <a href="https://youtu.be/pRtfn-8cf_I">
    <img height="200" alt="How to Create a Kintone Database App YouTube Thumbnail"
      src="https://img.youtube.com/vi/pRtfn-8cf_I/hqdefault.jpg">
  </a>
</p>

---

## Create a `.env` file

Using the [.env.example](.env.example) file as a temple, create a `.env` file containing your login credentials and the Kintone App's View ID.

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

### ⚠️ DO NOT DELETE THE [.env.example](.env.example) FILE!  <!-- omit in toc -->
[.env.example](.env.example) is used by env-cmd to verify that `.env` file is correctly configured.

---

## Input the App ID

The Kintone Customize Uploader uses [customize-manifest.json](customize-manifest.json) to determine where to upload the JavaScript file (_which Kintone App_).

```json
{
    "app": "1",
    "scope": "ALL",
    ...
}
```

So to ensure the file gets uploaded to the correct App, replace the `1` with your App ID.

**What is my App ID?** 🤔  

* Go to your Kintone App & grab the URL
* Kintone App's URL follows this template: `https://<SUBDOMAIN>.kintone.com/k/<App ID>/show#record=<RECORD ID>`
* Grab the number between the `/k/`
* Example: `https://example.kintone.com/k/1/` -> The App's ID is `1`

---

## Build the customization

1. Build the customization in the following files inside `./src/`
   * `main.ts`, `/requests/post_api.ts`, etc.
2. Run `npm run build` to compile your JavaScript into JavaScript output in the `/dist` folder.
3. Run `npm run upload` to upload the compiled files to your Kintone subdomain.
   * To directly upload the Kintone customization, use `./dist/KintoneCustomization.js`.
   * For more details, refer to [Customizing an App with JavaScript and CSS](https://get.kintone.help/k/en/user/app_settings/js_customize.html)
4. Run `npm run start`
   * This will trigger Webpack & kintone-customize-uploader to run while watching `./src/main.ts` for changes
   * Input Kintone credentials if asked
5. Refresh the Kintone App to see the changes!

Good luck coding!

---

## Quick Dive into JavaScript & Vite

### What is JavaScript?
JavaScript (TS) is a _flavor_ of JavaScript (JS)
* Existing JS code works inside TS files

JavaScript layers a **type system** on top of JavaScript
* A type system simply enforces the [JS types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#JavaScript_types) set per variable to avoid bugs
* Set types explicitly or implicitly

  | Explicit                                                                                | Implicit                          |
  | --------------------------------------------------------------------------------------- | --------------------------------- |
  | using `:` or [interfaces](https://www.JavaScriptlang.org/docs/handbook/interfaces.html) | using initial value               |
  | `interface User {  name: string;  id: number;  }`                                       | `let helloWorld = "Hello World";` |

Convert a JavaScript file to a JavaScript file by either:
* `tsc` command (e.g., `tsc index.ts`)
* JS Bundlers (e.g. [Webpack](https://webpack.js.org/), [Vite](https://vitejs.dev/))

#### Main benefits of JavaScript  <!-- omit in toc -->
* Type system forces programmers to be consistent -> Great when you have 1+ dev team
* Avoids [TypeErrors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) (when a value is not of the expected type)
* Compile TS code down to a JS version you want
* Works well with IntelliSense -> Better auto-complete function

### What is Vite?
* Vite is a fast JavaScript **build tool** for building frontend web apps
* Vite is opinionated and comes with default settings
  * Also, highly extensible via Vite's Plugin API and JavaScript API
* Similar to Webpack but _faster_
  * Vite uses [native ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) in the browser to load the code faster

#### Main benefits of Vite  <!-- omit in toc -->
* Better development experience
  * Quickly serve code to localhost with native ESM
  * Hot Module Replacement (HMR) that stays fast regardless of app size.
* Bundle code for production using [Rollup](https://rollupjs.org/guide/en/)
* JSX and TSX are supported by default
* Works super fast with JavaScript
  * Vite supports importing TS files out of the box
  * Vite does not perform type checking making it 20x ~ 30x faster

### Want to learn more?
* [Vite in 100 Seconds - YouTube](https://www.youtube.com/watch?v=KCrXgy8qtjM)
* [Getting Started | Vite](https://vitejs.dev/guide/)
* [Why Vite | Vite](https://vitejs.dev/guide/why.html)
* [Module Bundlers Explained... Webpack, Rollup, Parcel, and Snowpack - YouTube](https://www.youtube.com/watch?v=5IG4UmULyoA)
* [JavaScript in 100 Seconds - YouTube](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)
* [JavaScript for the New Programmer](https://www.JavaScriptlang.org/docs/handbook/JavaScript-from-scratch.html)
* [JavaScript for JavaScript Programmers](https://www.JavaScriptlang.org/docs/handbook/JavaScript-in-5-minutes.html)
* [JavaScript Playground - Types vs. Interfaces](https://www.JavaScriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDc+ywAJhSAK7EBG0jAvkA)
* [Differences Between Type Aliases and Interfaces](https://www.JavaScriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

---

## Debugging
**Let's Fix Those Problems** 💪

Here is a rundown of common problems that may occur & their solutions!

### Errors related to .env

If you get one of the following error messages:  

* `[webpack-cli] Error: Missing environment variable: KINTONE_BASE_URL`
* `[webpack-cli] Error: Missing environment variable: KINTONE_PASSWORD`
* `[webpack-cli] Error: Missing environment variable: KINTONE_USERNAME`
* `[webpack-cli] Error: Missing environment variable: VIEW_ID`
* `[webpack-cli] TypeError: Cannot convert undefined or null to object`
* `Failed to find .env file at default paths: [./.env,./.env.js,./.env.json]`
* `Failed to find .env file at default paths: [./.env,./.env.js,./.env.json]`
* `Failed to upload JavaScript/CSS files`
* `KintoneRestAPIError: [520] [CB_WA01] Password authentication failed...`

Then please verify that
* your `.env` file has been correctly configured
* your username and password for your Kintone account are correct
* you have not modified the `.env.example`

### Errors related to kintone-customize-uploader

If you get the following error message, please verify that you have installed the `kintone-customize-uploader` package.

Error Message:  

```shell
Options: {"command":"kintone-customize-uploader","commandArgs":["customize-manifest.json"],"options":{"expandEnvs":false,"noOverride":false,"silent":false,"useShell":false,"verbose":true}}
Found .env file at default path: ./.env
spawn kintone-customize-uploader ENOENT
Parent process exited with signal: 1. Terminating child process...
```

Solution:  

```shell
npm install -g kintone-customize-uploader
```

### `npm install` command is not working

1. Verify the Node.js & npm versions **inside** the `ai-kintone-gallery` folder
2. Just installed Node.js? Verify you configured Node.js versions **inside** the `ai-kintone-gallery` folder

* Mac: `nodenv local 14.5.0`
* Windows: `nvm use 14.5.0`

Not the correct versions, or confused? 🤔 → Check out the [Guide on Installing Node.js & npm](docs/Install_NodeJS_npm.md) Doc

### `npm run upload` failed?
_@kintone/customize-uploader not working?_ Let's try the following:

(1) Verify that customize uploader was installed globally
* `npm install -g @kintone/customize-uploader`

(2) Verify that the .env login info is correct (including the password)
* ⚠️ Make sure your login info is inside the `.env` file & **NOT** the `.env.example` file!
* ⚠️ Verify that KINTONE_BASE_URL input is correctly formatted:
  * ✅ Correct Format: `https://example.kintone.com`
  * ❌ Incorrect Format: `https://example.kintone.com/` or `example.kintone.com`
* ⚠️ Re-run the npm commands after saving the .env file
* ⚙️ Details: [Step 4 - Create a `.env` File](#step-4---create-a-env-file-)

(3) Verify your [customize-manifest.json](customize-manifest.json) was updated with the correct App ID
* ⚙️ Details: [Step 5 - Update customize-manifest.json with the App ID](#step-5---update-customize-manifestjson-with-the-app-id-)

(4) Verify that the `npm run build` command was run before the `npm run upload`

### Not seeing a highlighted `TODO:`?
Click the `Install` button on the VS Code pop-up message to install [TODO Highlight extension](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight).
* [![vscode-setting-extension.png](docs/img/vscode-setting-extension.png)](docs/img/vscode-setting-extension-HD.png)  

---

## Completed Code
If you want the completed code for the index.js file, you can find it here:  
[completed-index.js](/docs/completed-index.js)

---
