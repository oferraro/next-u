<?php

$doeEnvDir = dirname(__FILE__);

if (!file_exists($doeEnvDir)) {
    die('No .env file found ' . $doeEnvDir);
}
$dotenv = Dotenv\Dotenv::createImmutable($doeEnvDir);
$dotenv->load();
