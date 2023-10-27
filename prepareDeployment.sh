rm -rf ./build/templates
mkdir -p ./build/templates

cp -r ./commands/scaffolder ./build/templates/commands

cp -r ./resources/views/scaffolder ./build/templates/views

cp -r ./app/Scaffolder ./build/templates/Scaffolder
