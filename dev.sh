#!/bin/bash

export DEVSERVER_PORT=8000

HEAD_COLOR='\033[0;32m'
NO_COLOR='\033[0m'

printf "$HEAD_COLOR\n"
echo "-------------- Ectomorph Dev server -------------------"
echo "- Static web server at http://localhost:${DEVSERVER_PORT}/         -"
echo "- ...your watch processes here                        -"
echo "-------------------------------------------------------"
printf "$NO_COLOR"

npm run serve $DEVSERVER_PORT

