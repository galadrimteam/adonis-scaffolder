# Galadrim Adonis API Scaffolder

## Install

- npm `npm i -D @galadrim/adonis-scaffolder`
- yarn `yarn add --dev @galadrim/adonis-scaffolder`

## Config

run `node ace configure @galadrim/adonis-scaffolder`

## Usage

`node ace make:api [model name]`

example: `node ace make:api Post`

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

I don't guarantee that my output will be nicely formatted
I advise to run your formatter after generating files

- npm `npm run format`
- yarn `yarn format`

### Further instructions

- once you have scaffolded your API routes for a model you can edit the files created
- don't re run the command as it will overwrite your changes
- this tool is intended to win you some time on boilerplate only, once the files generated, you are on your own 😉

#### Bonus

there is a secret command to generate auth api 🤫

`node ace make:api auth`
