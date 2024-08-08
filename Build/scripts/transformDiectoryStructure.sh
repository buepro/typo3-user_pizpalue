#!   /bin/bash -e

# Beginning with TYPO3 12.4.17 site packages in the root directory aren't supported any more.
# This script moves the site package to the packages folder, corrects the folder structure and adds a composer.json
# file to the root directory.

shopt -s extglob
mkdir -p ./packages/typo3-user-pizpalue
mv ./!(.build|config|packages|var) ./packages/typo3-user-pizpalue/
mv ./.* ./packages/typo3-user-pizpalue/
mv .build/public/ ./
rm -rf ./build

echo "{}" > composer.json
composer config name buepro/typo3-pizpalue-installation
composer config repositories.local path ./packages/*
composer require buepro/typo3-user-pizpalue:@dev
