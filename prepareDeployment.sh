rm -rf ./templates
mkdir ./templates

cp -r ./commands/scaffolder ./templates/commands

cp -r ./resources/views/scaffolder ./templates/views

cp -r ./app/utils/scaffolderValidation ./templates/validation
