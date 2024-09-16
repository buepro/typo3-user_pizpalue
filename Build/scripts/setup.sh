#!   /bin/bash -e

# Create a new site

## Create site package
mkdir ./packages
git clone https://github.com/buepro/typo3-user_pizpalue.git ./packages/typo3-user-pizpalue
git -C ./packages/typo3-user-pizpalue checkout v6.0.1
git -C ./packages/typo3-user-pizpalue checkout -b customer

## Create root composer config
echo "{}" > composer.json
composer config name buepro/typo3-pizpalue-installation
composer config repositories.local path ./packages/*
composer r --no-update buepro/typo3-user-pizpalue:dev-customer

## Get packages
### Using default php version
composer --ignore-platform-reqs u
### Using different php version
/usr/bin/php83 /usr/bin/composer --ignore-platform-reqs u

## Install TYPO3
### Using default php version
./vendor/bin/typo3 setup
./vendor/bin/typo3 extension:setup
composer rm buepro/typo3-pizpalue-distribution
./vendor/bin/typo3 cache:flush
### Using different php version
/usr/bin/php83 ./vendor/bin/typo3 setup
/usr/bin/php83 ./vendor/bin/typo3 extension:setup
/usr/bin/php83 /usr/bin/composer rm buepro/typo3-pizpalue-distribution
/usr/bin/php83 ./vendor/bin/typo3 cache:flush

