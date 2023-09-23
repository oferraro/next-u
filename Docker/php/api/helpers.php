<?php

function snakeToCamelKeys($array) {
    $result = [];

    foreach ($array as $key => $value) {
        $camelKey = str_replace('_', '', lcfirst(ucwords($key, '_')));
        $result[$camelKey] = $value;
    }
    return $result;
}
