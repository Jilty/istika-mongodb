#! bin/bash 

git --version 2>&1 >/dev/null
GIT_IS_AVAILABLE=$?
# ...
if [ $GIT_IS_AVAILABLE -eq 0 ];
then
  sudo apt-get install git
fi  

pm2 --version
PM2_IS_AVAILABLE=$?
if [ $PM2_IS_AVAILABLE -eq 0 ];
then
  sudo apt-get install pm2
fi

