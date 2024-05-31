<?php

$setting = [
	'site_id' => 'HO',
	'site_name' => 'Head Office',
	'posterminal_id' => 'erewetwer',
	'license' => 'xlkwneroiq4rnsnfo3iamnsdfo32nfl',
	'appid' => 'fgtapos-tfi',
	'appsecret' => 'mnsoiu234@er',
	'license_to' => 'PT. Trans Fashion Indonesia',
	'license_date' => '2023-01-28',
	'license_valid_to' => 'unlimited',
	'license_timestamp' => time(),
];

print_r($setting);

$json = json_encode($setting);
echo "\r\n===========================\r\n";
echo chunk_split(base64_encode($json));
echo "\r\n===========================\r\n";


echo "\r\n\r\n\r\n";