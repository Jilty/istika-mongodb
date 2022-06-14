#! bin/bash 
pm2 --version 2>&1 >/dev/null
PM2_IS_AVAILABLE=$?
if [ $PM2_IS_AVAILABLE -eq 0 ];
then
  sudo apt-get install pm2
fi

git --version 2>&1 >/dev/null
GIT_IS_AVAILABLE=$?
# ...
if [ $GIT_IS_AVAILABLE -eq 0 ];
then
  sudo apt-get install git
fi  



