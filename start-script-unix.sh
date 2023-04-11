#!/bin/bash

ip_address=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}')

if [ -z "$ip_address" ]; then
echo "IP address was not found."
exit 1
fi

file=".env.development"
replacement="API_URL=http://$ip_address:3000/api/"

while IFS= read -r line; do
if [[ "$line" == "API_URL" ]]; then
echo "$replacement"
else
echo "$line"
fi
done < "$file" > "$file.tmp" && mv "$file.tmp" "$file"

echo "API_URL" in file "$file" was updated to "$replacement"."