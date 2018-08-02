#!/usr/bin/bash

url=$1
if [[ ! -f "/home/joseph/html/calendar/albumArt/$url" ]]; then
	wget -q -O "/home/joseph/html/calendar/albumArt/$url" "i.scdn.co/image/$url"
fi
