# Artisan v2.0

A content management tool for creating, editing, and publishing responsive Adobe Illustrator embeds. Heavily inspired by and built upon [ai2html](http://ai2html.org/).

## Contents
- [Artisan v2.0](#artisan-v20)
  - [Contents](#contents)
  - [Why This?](#why-this)
  - [How's It Work?](#hows-it-work)
  - [Artisan In Action](#artisan-in-action)
  - [Installation](#installation)
- [Development](#development)
  - [Prerequistes](#prerequistes)
  - [Developing The Base App](#developing-the-base-app)
  - [Developing the Share Bundle](#developing-the-share-bundle)
- [Deployment](#deployment)
  - [Deploying Share Bundle](#deploying-share-bundle)

## Why This?

At POLITICO, we use Artisan to manage the workflow involved in creating a custom static embed. Artisan allows its users to easily create embeds, organize them into projects, and then share the embeds with editors before finally publishing them to our website with an embed code.

## How's It Work?

Artisan uses a modified version of [ai2html](http://ai2html.org/) to turn Adobe Illustrator files into responsive HTML pages with rasterized images for backgrounds and other flat assets. Artisan also comes with a number of other functions which use file system functions, the AWS API, and more to offer a number of common user actions related to the production of these embeds (e.g. sharing with editors, publishing, duplicating, etc.)

## Artisan In Action

*Screenshots and more to come...*

## Installation
1. Find the install link on our company Notion.
2. Save the latest version to your downloads folder.
3. Open the DMG, and copy the Loki icon into your Applications folder.


# Development

## Prerequistes

**1. CLang and macOS Development Dependencies**
```zsh
xcode-select --install
```
**2. Rust**

```zsh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

## Developing The Base App

```zsh
npm run tauri dev
```

## Developing the Share Bundle
```
npm run share:dev
```

You can edit `src/share/index.html` as your development file.

# Deployment

We're currently experimenting with using Tauri's updating feature. Until then, deployments will consist of creating new DMG builds and instructing users to replace their current version with a new one.

To create a new build run
```
npm run tauri build
```

You'll then find the DMG in ...


## Deploying Share Bundle

If you've made a change to the share bundle, first update the version in `src/share/version.mjs`. The version should match Artisan's version, with the last number being the one you increment. Then run

```
npm run share:build; npm run share:publish;
```

*Note: You'll need an AWS profile named `publishing` configured in your aws credentials files. This will work as expected if you've already set up Loki properly.*
