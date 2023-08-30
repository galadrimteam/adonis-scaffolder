rm -rf ./templates
mkdir ./templates

cp -r ./commands/scaffolder ./build/templates/commands

cp -r ./resources/views/scaffolder ./build/templates/views

cp -r ./app/utils/scaffolderValidation ./build/templates/validation
