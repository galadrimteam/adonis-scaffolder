rm -rf ./build/templates
mkdir -p ./build/templates

cp ./commands/Scaffolder.ts ./build/templates/Scaffolder.ts

cp -r ./resources/views/scaffolder ./build/templates/views

cp -r ./app/Scaffolder ./build/templates/Scaffolder
