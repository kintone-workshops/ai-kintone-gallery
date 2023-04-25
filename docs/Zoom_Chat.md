# Zoom Chat Snippets
<!-- markdownlint-disable -->

* [Waiting Room](#waiting-room)
* [Start](#start)
* [Live on YouTube](#live-on-youtube)
* [Install Commands {Get Started}](#install-commands-get-started)
* [Kintone Customize Uploader](#kintone-customize-uploader)
* [Slide Deck? 👨‍🏫](#slide-deck-)
* [YouTube](#youtube)
* [Create a .env File](#create-a-env-file)
* [Debugging - Let's Fix Those Problems 💪](#debugging---lets-fix-those-problems-)
* [Additional Questions 🤔](#additional-questions-)
* [Create a Kintone Web Database App](#create-a-kintone-web-database-app)
* [Kintone Customization Tutorials](#kintone-customization-tutorials)
* [Quick Check-in](#quick-check-in)
* [Looking for the Kintone Subdomain Email? ✉️](#looking-for-the-kintone-subdomain-email-️)
* [Errors related to .env](#errors-related-to-env)
* [Join our Meetup Group](#join-our-meetup-group)
* [Got Kintone Questions?](#got-kintone-questions)
* [Survey](#survey)
* [Write up your experience!](#write-up-your-experience)
* [Log into Kintone Subdomain?](#log-into-kintone-subdomain)
* [step-by-step guide](#step-by-step-guide)
* [Becoming a Kintone Partner?](#becoming-a-kintone-partner)
* [What are Kintone Plug-ins](#what-are-kintone-plug-ins)
* [🚀 Have your Kintone Subdomain ready!](#-have-your-kintone-subdomain-ready)
* [Got Questions? 🤔](#got-questions-)
* [Why use Kintone?](#why-use-kintone)
* [Step 6 - Editing index.js - Input Kintone data into the chart](#step-6---editing-indexjs---input-kintone-data-into-the-chart)
* [Compile and upload the code to Kintone](#compile-and-upload-the-code-to-kintone)
* [Check-in Time Slots](#check-in-time-slots)
* [Setup a Custom View](#setup-a-custom-view)
* [Workshop Steps](#workshop-steps)

---

## Waiting Room
=   =   =   =   =   =   =   =   =   =

Hello everyone, the workshop will start real soon!

Be sure you are ready by completing the following tasks:

1. 🤖 Clone the Workshop Repository!  
https://bit.ly/kdp-timeline

2. 🚀 Have your Kintone Subdomain ready!
If you have not already, sign up for the FREE Kintone Developer License:  
https://kintone.dev/new

✅ Use Chrome or Firefox ; ⚠️ NO Safari

Thank you for waiting & see you soon!

=   =   =   =   =   =   =   =   =   =

## Start
=   =   =   =   =   =   =   =   =   =

Hello everyone, thank you for joining the workshop!

Here is how to get started:

1. 🤖 Clone the Workshop Repository!
https://bit.ly/kdp-timeline

2. 🚀 Have your Kintone Subdomain ready!
If you have not already, sign up for the FREE Kintone Developer License by filling out this web form:  
https://kintone.dev/new

✅ Use Chrome or Firefox ; ⚠️ NO Safari

=   =   =   =   =   =   =   =   =   =

## Live on YouTube

If you get lost, you can "rewind" on our lives stream on YouTube:
https://youtube.com/live/EXhnk7hUP-I

=   =   =   =   =   =   =   =   =   =

## Install Commands {Get Started}

cd Downloads

git clone https://github.com/kintone-workshops/timeline-generator-amcharts

cd timeline-generator-amcharts

npm install

npm install -g @kintone/customize-uploader

=   =   =   =   =   =   =   =   =   =

## Kintone Customize Uploader

npm install -g @kintone/customize-uploader

=   =   =   =   =   =   =   =   =   =

## Slide Deck? 👨‍🏫

slides.pdf (inside repo):
* timeline-generator-amcharts/slides.pdf
* or https://github.com/kintone-workshops/timeline-generator-amcharts/blob/main/slides.pdf

=   =   =   =   =   =   =   =   =   =

# Where to get Kintone Web Database Subdomain?

Sign up for the FREE Kintone Developer License by filling out this web form:

https://kintone.dev/new

⚠️ NO Safari
✅ Use Chrome or Firefox

=   =   =   =   =   =   =   =   =   =

## YouTube
=   =   =   =   =   =   =   =   =   =

This is also live on YouTube:
https://youtube.com/live/EXhnk7hUP-I

It is a bit delayed but for those who want to "rewind", this is another great option ~

This workshop will also be uploaded to our YouTube Channel!

Kintone Developer Program
https://bit.ly/KDP_Video

Subscribe so you get notified with the workshop recording gets uploaded! 🔔

=   =   =   =   =   =   =   =   =   =

## Create a .env File

Using the .env.example file as a template, create a .env file.

Then input your Kintone credentials like the following:

KINTONE_BASE_URL="https://example.kintone.com"
KINTONE_USERNAME="your_username"
KINTONE_PASSWORD="your_password"
VIEW_ID="1234"

⚠️ DO NOT DELETE THE .env.example FILE!
.env.example is used by env-cmd to verify that the .env file is correctly configured.

=   =   =   =   =   =   =   =   =   =

## Debugging - Let's Fix Those Problems 💪

Here is a rundown of common problems that may occur & its solutions!

https://github.com/kintone-workshops/timeline-generator-amcharts#debugging

If you have additional questions during the workshop, feel free to message me.

=   =   =   =   =   =   =   =   =   =

## Additional Questions 🤔

If you have questions afterwards, post them at our Kintone Developer Community

https://forum.kintone.dev/

=   =   =   =   =   =   =   =   =   =

## Create a Kintone Web Database App

Create the Kintone App using the presidents.csv file

https://github.com/kintone-workshops/timeline-generator-amcharts#create-a-kintone-web-database-app

How to set the Field Codes for the Kintone App?
1. Hover over the field
2. Click the top right gear icon ⚙️
3. Select Settings from the drop-down menu
4. Click the edit button Edit Button
5. Enter the new field code
6. Click the Save button

⚠️ Field Codes are case-sensitive ⚠️

Set the following Field Codes
* Field Name → Field Code
* Start_Date → start
* End_Date → end
* First_name → first
* Last_Name → last
* Party → party
* Wiki_URL → wiki
* Image_URL → image

- Save!
- Be sure to click Save and Activate App buttons! 💪

=   =   =   =   =   =   =   =   =   =

## Kintone Customization Tutorials

If you want additional projects to start playing around with Kintone, check out this page:

https://kintone.dev/en/landing-page/tutorial-gallery/

=   =   =   =   =   =   =   =   =   =

## Quick Check-in

Thank you for all those who DM me with questions

Looks like everyone figured out where you need to go.

If you are still stuck, please let me know ~

=   =   =   =   =   =   =   =   =   =

## Looking for the Kintone Subdomain Email? ✉️

Search the following in your email app:

Welcome to Kintone! One More Step to Developer License

The email will be from developer@kintone.com

=   =   =   =   =   =   =   =   =   =

## Errors related to .env
If you get one of the following error messages, then please verify your .env file has been correctly configured and you have not modified the .env.example

Failed to find .env file at default paths: [./.env,./.env.js,./.env.json]
[webpack-cli] Error: Missing environment variable: KINTONE_BASE_URL
[webpack-cli] Error: Missing environment variable: KINTONE_USERNAME
[webpack-cli] Error: Missing environment variable: KINTONE_PASSWORD

=   =   =   =   =   =   =   =   =   =

## Join our Meetup Group
https://www.meetup.com/kintone-developers/

## Got Kintone Questions?

Please post them in our Kintone Developer Community!

https://forum.kintone.dev/

=   =   =   =   =   =   =   =   =   =

## Survey

Enter to WIN a $25 Amazon Gift Card! 💰️

https://bma-events.typeform.com/to/D5D4MNxD

Your feedback is vital for us to improve our workshop!
Thank you for your time & input ~

=   =   =   =   =   =   =   =   =   =

## Write up your experience!

Post to Dev.to or Medium about your experience with Kintone customization ~

See what others post about Kintone
https://dev.to/t/kintone

You might be interested in
Deploy a REST API calling node.js App to Heroku article

https://dev.to/will_yama/deploy-a-rest-api-calling-node-js-app-to-heroku-2mia

React & REST API: How to render responses

https://dev.to/will_yama/how-to-render-responses-96c

=   =   =   =   =   =   =   =   =   =

If you want to check out our amChart x Data Visualization workshop content:

https://youtu.be/fHNj6MieBzw

=   =   =   =   =   =   =   =   =   =

## Log into Kintone Subdomain?

Your login link would be
YOUR_SUBDOMAIN.kintone.com

---

Subdomain: example
URL: example.kintone.com

=   =   =   =   =   =   =   =   =   =

## step-by-step guide

If you are ever lost, check out our step-by-step guide here:

https://github.com/kintone-workshops/timeline-generator-amcharts/#workshop-steps

=   =   =   =   =   =   =   =   =   =

## Becoming a Kintone Partner?

https://www.kintone.com/en-us/become-a-partner/

=   =   =   =   =   =   =   =   =   =

## What are Kintone Plug-ins

https://kintone.dev/en/plugins/introduction-to-plug-ins/what-are-kintone-plug-ins/

=   =   =   =   =   =   =   =   =   =

=   =   =   =   =   =   =   =   =   =

## 🚀 Have your Kintone Subdomain ready!

If you have not already, sign up for the FREE Kintone Developer License by filling out this web form:

https://kintone.dev/new

✅ Use Chrome or Firefox ; ⚠️ NO Safari

=   =   =   =   =   =   =   =   =   =

## Got Questions? 🤔
Feel free to msg me with a workshop-related or a general Kintone question to me anytime ~

=   =   =   =   =   =   =   =   =   =

## Why use Kintone?
+ Super easy to use database / backend solution
+ You can use vanilla JS to build customizations right on the platform
+ Companies are hiring engineers to build Kintone integrations

More information:
+ Get Hacking with Kintone - https://kintone.dev/en/landing-page/hackathon/
+ Job Listing - Kintone Developer Forum - https://forum.kintone.dev/t/seeking-independent-contractors-with-kintone-customization-programming-skills/550

=   =   =   =   =   =   =   =   =   =

## Step 6 - Editing index.js - Input Kintone data into the chart

// TODO: Input Kintone data into the chart
chart.data = event.records.map((rec, index) => {
  return {
    // TODO: Text above the PinBullet; President's name
    'text': rec.first.value,
    // TODO: PinBullet's & time period's color; Party color
    'color': partyColor[rec.party.value],
    // TODO: Time period's start; Term's start
    'start': rec.start.value,
    // TODO: Time period's end; Term's end
    'end': rec.end.value,
    // TODO: Icon inside the PinBullet; President's icon
    'icon': rec.image.value,
    'category': '' // Timeline category; leave as empty string
  }
});

=   =   =   =   =   =   =   =   =   =

## Compile and upload the code to Kintone

npm run build && npm run upload

=   =   =   =   =   =   =   =   =   =

## Check-in Time Slots

* 10:00 - Hello
* 10:15 - Get Started
* 10:30 - What is Kintone?
* 10:45 - Create a Kintone App
* 11:00 - 1 hour left
* 11:15 - 45 min left
* 11:30 - 30 min left
* 11:45 - Wrap Up and Q&A
* 12:00 - Thank you & Survey Raffle

=   =   =   =   =   =   =   =   =   =

## Setup a Custom View
* From App Settings, Click the `Views` tab
* Click the Plus Button ⊕ to create a View
* Select `Custom view` under `Visible Fields and Column Order` section
* Get the `View ID`! (Required in the `.env` file)
* Under `HTML Code`, input:

<div id="root"></div>

=   =   =   =   =   =   =   =   =   =

## Workshop Steps

If you are lost, we have wrote it all up in the GitHub Repo's README

1. Create a Kintone App using the `presidents.csv` file
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-1---create-a-kintone-app-using-the-presidentscsv-file-

2. Setup a Custom View
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-2---setup-a-custom-view-

3. Grab the Login Credentials, View ID, and App ID
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-3---grab-the-login-credentials-view-id-and-app-id-

4. Create a `.env` File
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-4---create-a-env-file-

5. Update customize-manifest.json with the App ID
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-5---update-customize-manifestjson-with-the-app-id-

6. Edit index.js - Input Kintone data into the chart
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-6---edit-indexjs---input-kintone-data-into-the-chart-

7. Compile and upload the code to Kintone with `npm run build && npm run upload`
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-7---compile-and-upload-the-code-to-kintone-

8. Play with the Timeline chart on your Kintone App 🎉
→ https://github.com/kintone-workshops/timeline-generator-amcharts#step-8---play-with-the-timeline-chart-on-your-kintone-app--

=   =   =   =   =   =   =   =   =   =

Grab the Login Credentials, View ID, and App ID

Where to get the Subdomain, View ID, and App ID?

Go to your Kintone App's custom view & grab the URL
Kintone App's URL follows this template:
https://<SUBDOMAIN>.kintone.com/k/<App ID>/?view=<View ID>
Example:

https://example.kintone.com/k/1/?view=1234
Subdomain = example
KINTONE_BASE_URL = https://example.kintone.com
App ID = 1
View ID = 1234

=   =   =   =   =   =   =   =   =   =
