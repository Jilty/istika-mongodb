#! bin/bash 
git --version 2>&1 >/dev/null
GIT_IS_AVAILABLE=$?
# ...
if [ $GIT_IS_AVAILABLE -eq 0 ];
then
  sudo apt-get install git
fi 

node --version 2>&1 >/dev/null
NODE_IS_AVAILABLE=$?
if [ $NODE_IS_AVAILABLE -eq 0 ];
then
  sudo apt-get install nodejs
fi

pm2 --version 2>&1 >/dev/null
PM2_IS_AVAILABLE=$?
if [ $PM2_IS_AVAILABLE -eq 0 ];
then
  npm install pm2 -g
fi



