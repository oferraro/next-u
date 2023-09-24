<?php

$envFile = __DIR__;
if (!file_exists($envFile)) {
    die('No .env file found ' . $envFile );
}
$dotenv = Dotenv\Dotenv::createImmutable($envFile);
$dotenv->load();
