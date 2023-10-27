# Galadrim Adonis API Scaffolder

## Why?

Imagine you have to create new projects every week or so, you will then not want to lose time in creating by hand boiler plate files over and over again in order to create CRUDL API for each of your Models (that and writing the same auth API for login, logout, reset password...)

I'm working in a web agency and this package helps me to be faster, use it if you want, if you have questions, I will be happy to help

## Install

- npm `npm i -D @galadrim/adonis-scaffolder`
- yarn `yarn add --dev @galadrim/adonis-scaffolder`

## View package

You must have adonis view package installed and configured

Install:

- npm `npm i @adonisjs/view`
- yarn `yarn add @adonisjs/view`

Configure:

- node ace configure @adonisjs/view

## Config

run `node ace configure @galadrim/adonis-scaffolder`

This will create the files needed for the scaffolder in YOUR code.
This enables you to customise everything the scaffolder do.
Once you have installed this scaffolder, it becomes your code, do whatever you want with it!

## Usage

`node ace scaffold [model name]`

example: `node ace scaffold Post`

this will create:

```
CREATE: app/Controllers/Http/posts/PostsController.ts
CREATE: app/Controllers/Http/posts/postSchema.ts
CREATE: app/Controllers/Http/posts/postsList.ts
CREATE: app/Controllers/Http/posts/destroyPost.ts
CREATE: app/Controllers/Http/posts/showPost.ts
CREATE: app/Controllers/Http/posts/storePost.ts
CREATE: app/Controllers/Http/posts/updatePost.ts
```

I don't guarantee that the scaffolder output will be nicely formatted
I advise to run your formatter after generating files

- npm `npm run format`
- yarn `yarn format`

### Further instructions

- once you have scaffolded your API routes for a model you can edit the files created
- don't re run the command as it will overwrite your changes
- this tool is intended to win you some time on boilerplate only, once the files generated, you are on your own 😉

#### Bonus

there is a secret command to generate auth api 🤫

`node ace scaffold auth`
