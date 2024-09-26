#!/bin/bash

# options:
# -n: (name) nama longtask
# -p: (pid) kode longtask
# -u: (username) user_id pemroses
# -data: (data) data parameter yang di proses

# contoh eksekusi
# ./getregister.sh -c "/var/www/html/cli"


clear

input_var_n="--name getheinv"  # name longtask
input_var_p="--pid getheinv"  # pid longtask
input_var_u="--username 5effbb0a0f7d1"  # username longtask
input_var_d="--data \"\""  # data dokument longtask -> parameter ini bisa diganti2 disesuaikan, misalnya json tanggal, doc id, dll
input_var_l="--log \"/mnt/ramdisk/log-getheinv.txt\""  # file log
clipath="/var/www/html/cli.php"  # cli path


while getopts c:n:p:u:d:l: flag
do
	case "${flag}" in
		c) clipath="${OPTARG}";;
		n) input_var_n="--name ${OPTARG}";;
		p) input_var_p="--pid ${OPTARG}";;
		u) input_var_u="--username ${OPTARG}";;
		d) input_var_d="--data ${OPTARG}";;
		l) input_var_l="--log ${OPTARG}";;
	esac
done

opt="$input_var_n $input_var_p $input_var_u $input_var_d $input_var_l"
command="php $clipath retail/fashion/merchsync/try-getheinv $opt"

echo "\$ $command"
$command
echo