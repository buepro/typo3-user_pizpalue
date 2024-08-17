<?php

/*
 * This file is part of the package buepro/user_pizpalue.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

$EM_CONF[$_EXTKEY] = [
    'title' => 'Pizpalue site package',
    'description' => 'Site package being used with template pizpalue.',
    'category' => 'templates',
    'author' => 'Roman Büchler',
    'author_email' => 'rb@buechler.pro',
    'state' => 'stable',
    'internal' => '',
    'uploadfolder' => '0',
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'version' => '7.0.0-dev',
    'constraints' => [
        'depends' => [
            'container_elements' => '6.0.0-6.99.99',
            'pizpalue' => '17.0.0-99.99.99',
            'typo3' => '12.4.9-13.99.99',
        ],
        'conflicts' => [
        ],
        'suggests' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Buepro\\UserPizpalue\\' => 'Classes'
        ],
    ],
];
