# Galadrim Adonis API Scaffolder

## Install

- npm `npm i -D @galadrim/adonis-scaffolder`
- yarn `yarn add --dev @galadrim/adonis-scaffolder`

## Config

run `node ace configure @galadrim/adonis-scaffolder`

## Usage

`node ace make:api [model name]`

example: `node ace make:api Post`

output will be:

```
[ info ]  Creating file: app/Controllers/Http/posts/PostsController.ts
[ info ]  Creating file: app/Controllers/Http/posts/postSchema.ts
[ info ]  Creating file: app/Controllers/Http/posts/postsList.ts
[ info ]  Creating file: app/Controllers/Http/posts/destroyPost.ts
[ info ]  Creating file: app/Controllers/Http/posts/showPost.ts
[ info ]  Creating file: app/Controllers/Http/posts/storePost.ts
[ info ]  Creating file: app/Controllers/Http/posts/updatePost.ts
```

I don't guarantee that my output will be nicely formatted
I advise to run your formatter after generating files

- npm `npm run format`
- yarn `yarn format`

### Further instructions

- once you have scaffolded your API routes for a model you can edit the files created
- don't re run the command as it will overwrite your changes
- this tool is intended to win you some time on boilerplate only, once the files generated, you are on your own 😉
