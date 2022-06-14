# Publish Directly to Medium.com with [Kintone Web Database](https://kintone.dev)
<!-- markdownlint-disable MD026-->

![banner.png](./docs/images/banner.png)

Thank you for attending our **Kintone x Medium** workshop!  
Check out [meetup.com/Kintone-Developers](https://www.meetup.com/Kintone-Developers/) to check out all of our upcoming events!

## Outline <!-- omit in toc -->
* [Get Started](#get-started)
* [Overview of the Repo](#overview-of-the-repo)
* [Kintone Web Database & Credentials](#kintone-web-database--credentials)
  * [🚀 Getting your FREE Kintone Database](#-getting-your-free-kintone-database)
* [Create a Kintone Web Database App](#create-a-kintone-web-database-app)
* [Create a `.env` file](#create-a-env-file)
* [Input the App ID](#input-the-app-id)
* [Build the customization](#build-the-customization)
* [Quick Dive into TypeScript & Vite](#quick-dive-into-typescript--vite)
  * [What is TypeScript?](#what-is-typescript)
  * [What is Vite?](#what-is-vite)
  * [Want to learn more?](#want-to-learn-more)
* [Debugging - Let's Fix Those Problems!](#debugging---lets-fix-those-problems)
  * [Errors related to .env](#errors-related-to-env)
  * [`npm install` command is not working](#npm-install-command-is-not-working)
  * ["npm run upload" failed?](#npm-run-upload-failed)

## Get Started

First, let's clone the [sean-kintone/publish-to-medium](https://github.com/sean-kintone/publish-to-medium) repo and go inside the folder.

Once you are inside the folder, let's install the dependencies!

```shell
cd Downloads

git clone https://github.com/sean-kintone/publish-to-medium

cd publish-to-medium

npm install

npm install -g @kintone/customize-uploader
```

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
| [fields.d.ts](fields.d.ts)                                   | Various type definitions for our typescript / Kintone environment            |                        |
| [tsconfig.json](tsconfig.json)                               | Various settings for how typescript behaves                                  |                        |
| [vite.config.js](vite.config.js)                             | Various settings for how and where our typescript compiles to                |                        |
|                                                              |                                                                              |                        |
| [slides.pdf](slides.pdf)                                     | Workshop presentation's slide deck                                           |                        |
| [docs/workshop-steps.md](docs/workshop-steps.md)             | Step-by-step guide that we do during the workshop                            |                        |

---

## Kintone Web Database & Credentials

### 🚀 Getting your FREE Kintone Database

[bit.ly/KDP_NEW](http://bit.ly/KDP_NEW)
* ⚡ Only use lowercase, numbers, & hyphens in your subdomain
* ⚠ Do not use uppercase nor special characters

|                                             |                                             |
| ------------------------------------------- | ------------------------------------------- |
| ![SignUp-1.png](./docs/images/SignUp-1.png) | ![SignUp-2.png](./docs/images/SignUp-2.png) |

---

## Create a Kintone Web Database App

Let's create a Kintone App with an article title, and text to send to Medium!

![./docs/images/kintone-app-setup.gif](./docs/images/kintone-app-setup.gif)

Kintone makes it easy to setup a web database with API routes for getting information. The .gif above is one minute in length!

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

Using the [.env.example](.env.example) file as a temple, create a `.env` file that will contain your login credentials and the Kintone App's View ID.

Here is what your `.env` might look like:

```txt
KINTONE_BASE_URL="https://example.kintone.com"
KINTONE_USERNAME="example@gmail.com"
KINTONE_PASSWORD="ILoveKintone!"
VITE_AUTHOR_ID="12345abcde67890"
VITE_API_TOKEN="09876edcba54321"
```

### ⚠️ DO NOT DELETE THE [.env.example](.env.example) FILE!  <!-- omit in toc -->
[.env.example](.env.example) is used by env-cmd to verify that `.env` file is correctly configured.

---

## Input the App ID

The Kintone Customize Uploader uses [customize-manifest.json](customize-manifest.json) to determine where to upload the JavaScript file (_which Kintone App_).

```json
{
    "app": "23",
    "scope": "ALL",
    ...
}
```

So to ensure the file gets uploaded to the correct App, replace the `23` with your App ID.

**What is my App ID?** 🤔  

* Go to your Kintone App & grab the URL
* Kintone App's URL follows this template: `https://<SUBDOMAIN>.kintone.com/k/<App ID>/show#record=<RECORD ID>`
* Grab the number between the `/k/`
* Example: `https://example.kintone.com/k/1/` -> The App's ID is `1`

---

## Build the customization

1. Build the customization in the following files inside `./src/`
   * `main.ts`, `/requests/post_api.ts`, etc.
2. Run `npm run build` to compile your Typescript into Javascript output in the `/dist` folder.
3. Run `npm run upload` to upload the compiled files to your Kintone subdomain.
   * To directly upload the Kintone customization, use `./dist/KintoneCustomization.js`.
   * For more details, refer to [Customizing an App with JavaScript and CSS](https://get.kintone.help/k/en/user/app_settings/js_customize.html)
4. Run `npm run start`
   * This will trigger webpack & kintone-customize-uploader to run while watching `./src/main.ts` for changes
   * Input Kintone credentials if asked
5. Refresh the Kintone App to see the changes!

Good luck coding!

---

## Quick Dive into TypeScript & Vite

### What is TypeScript?
TypeScript (TS) is a _flavor_ of JavaScript (JS)
* Existing JS code works inside TS files

TypeScript layers a **type system** on top of JavaScript
* A type system simply enforces the [JS types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#javascript_types) set per variable to avoid bugs
* Set types explicitly or implicitly

  | Explicit                                                                                | Implicit                          |
  | --------------------------------------------------------------------------------------- | --------------------------------- |
  | using `:` or [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) | using initial value               |
  | `interface User {  name: string;  id: number;  }`                                       | `let helloWorld = "Hello World";` |

Convert a TypeScript file to a JavaScript file by either:
* `tsc` command (e.g., `tsc index.ts`)
* JS Bundlers (e.g. [Webpack](https://webpack.js.org/), [Vite](https://vitejs.dev/))

#### Main benefits of TypeScript  <!-- omit in toc -->
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
* Works super fast with TypeScript
  * Vite supports importing TS files out of the box
  * Vite does not perform type checking making it 20x ~ 30x faster

### Want to learn more?
* [Vite in 100 Seconds - YouTube](https://www.youtube.com/watch?v=KCrXgy8qtjM)
* [Getting Started | Vite](https://vitejs.dev/guide/)
* [Why Vite | Vite](https://vitejs.dev/guide/why.html)
* [Module Bundlers Explained... Webpack, Rollup, Parcel, and Snowpack - YouTube](https://www.youtube.com/watch?v=5IG4UmULyoA)
* [TypeScript in 100 Seconds - YouTube](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)
* [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
* [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* [TypeScript Playground - Types vs Interfaces](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDc+ywAJhSAK7EBG0jAvkA)
* [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

---

## Debugging - Let's Fix Those Problems!

Here is a rundown of common problems that may occur & their solutions!

### Errors related to .env

If you get one of the following error messages:  

* `Failed to find .env file at default paths: [./.env,./.env.js,./.env.json]`
* `Failed to upload JavaScript/CSS files`
* `KintoneRestAPIError: [520] [CB_WA01] Password authentication failed...`

Then please verify that
* your `.env` file has been correctly configured
* your username and password for your Kintone account is correct
* you have not modified the `.env.example`

### `npm install` command is not working

1. Verify the Node.js & npm versions **inside** the `publish-to-medium` folder
2. Just installed Node.js? Verify you configured Node.js versions **inside** the `publish-to-medium` folder

* Mac: `nodenv local 14.5.0`
* Windows: `nvm use 14.5.0`

### "npm run upload" failed?

_@kintone/customize-uploader not working?_ Let's try the following:

(1) Verify that customize uploader was installed globally

* `npm install -g @kintone/customize-uploader`

(2) Verify that the .env login info is correct (including the password)

* ⚠️ Make sure your login info is inside `.env` file & **NOT** `.env.example` file!
* ⚠️ Verify that KINTONE_BASE_URL input is correctly formatted:
  * ✅ Correct Format: `https://example.kintone.com`
  * ❌ Incorrect Format: `https://example.kintone.com/` or `example.kintone.com`
* ⚠️ Re-run the npm commands after saving the .env file
* ⚙️ Details: [Create a `.env` file](#create-a-env-file)

(3) Verify your customize-manifest.json was updated with the correct App ID

* ⚙️ Details: [Input the App ID](#input-the-app-id)
