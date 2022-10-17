# Tigris Data example app on Next.js - Todo list

A simple todo app built on [Next.js](https://nextjs.org) and [Tigris Data](https://tigrisdata.com/) 
using [TypeScript client](https://docs.tigrisdata.com/typescript/), deployed on [Vercel](https://vercel.com/).

#### Project demo
![Todo web app](public/readme/todo_app_screenshot.jpg?raw=true)

https://tigris-nextjs-starter-kit.vercel.app/

# Deploying the app
You have two options to run this Next.js app:
<details>
<summary>1. Deploy on Vercel using Tigris Cloud (Recommended)</summary>

## Vercel & Tigris Cloud (Recommended)
### Prerequisites
1. A GitHub account. [Sign up here for a free account](https://github.com) if you don't have one.
2. A Vercel account for deploying app. [Sign up here for a free account](https://vercel.com) if you don't have one.
3. A Tigris Data account. [Sign up here for a free Tigris account](https://www.tigrisdata.com/beta#signup-form) if you don't have one.

### Instructions
1. Login to [Tigris console](https://console.preview.tigrisdata.cloud/) and  create a collection to use for our app.

   1. We can use any existing database or create a new one on console.
   2. Now create a new collection in this database with following schema:
      <details>
      <summary>Click to expand collection schema</summary>

       | Field Name | Data type | 
       |------------|-----------|
       | id         | Integer   |
       | text       | String    |
       | completed  | Boolean   |
      </details>

2. [Follow the video instruction](https://docs.tigrisdata.com/auth/) to register a new application. In the next step, we will use the generated `Client ID` and `Client Secret` keys to access Tigris from your Next.js app.
> You will be asked for db name, collection name, app keys as [Environment Variables](.env.example) when deploying on Vercel.
3. Hit "Deploy" to fork this repo and deploy app to your vercel account and follow instructions:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftigrisdata%2Ftigris-vercel-starter%2F&env=TIGRIS_URI,TIGRIS_CLIENT_ID,TIGRIS_CLIENT_SECRET,TIGRIS_DB,TIGRIS_COLLECTION&envDescription=Application%20secrets%20to%20access%20Tigris%20cloud&envLink=https%3A%2F%2Fgithub.com%2Ftigrisdata%2Ftigris-vercel-starter%2Fblob%2Fmain%2F.env.example&project-name=tigris-nextjs-todo-app&repo-name=tigris-nextjs-todo-app&demo-title=Tigris%20todo%20app&demo-description=A%20ToDo%20list%20web%20app%20using%20NextJS%20and%20Tigris%20Data)

:tada: All done. You should be able to use app on the URL provided by Vercel. Feel free to play around
or do a [code walkthrough](#ui-tour--code-walkthrough) next.
</details>

<details>
<summary>2. Running Next.js server & Tigris Data on your local computer</summary>

## Running Next.js server & Tigris Data locally
### Prerequisites
1. Tigris installed on your dev computer. [Installation instructions](https://docs.tigrisdata.com/cli/installation)
2. Node.js version 18+

### Instructions
1. Clone this repo on your computer
```shell
git clone https://github.com/tigrisdata/tigris-vercel-starter
```
2. Install dependencies
```shell
cd tigris-vercel-starter
npm install
```
3. Create a new database, let's call it `tigris_vercel_starter` for this tutorial. [CLI Reference](https://docs.tigrisdata.com/cli/create-database)
```shell
tigris create database tigris_vercel_starter
```
4. Create a new collection to use in our app, let's call it `todoItems`. [CLI Reference](https://docs.tigrisdata.com/cli/create-collection)
```shell
tigris create collection tigris_vercel_starter '{
  "title": "todoItems",
  "properties": {
    "id": {
      "type": "integer",
      "autoGenerate": true
    },
    "text": {
      "type": "string"
    },
    "completed": {
      "type": "boolean"
    }
  },
  "primary_key": ["id"]
}'
```
</details>

# UI tour & Code walkthrough

# Tech Stack

# Next steps

```shell
$> npm install
$> npm run setup # Optional: assumes you have tigris running, will create schema and sample data
$> npm run dev
```

Go to `localhost:3000` on browser
