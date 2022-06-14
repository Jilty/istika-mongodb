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

# REQUIRED_PKG="pm2"
# pm2 --version  &> /dev/null
# PKG_OK=$?
# echo Checking for $REQUIRED_PKG: $PKG_OK
# if [ $PKG_OK -eq 0 ]; then
#   echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
#   npm install -g $REQUIRED_PKG
# fi

if [[ -d /istika-mongodb ]]
then
    echo "stop server"
    pm2 stop server.js
    echo "pull new code"
    git pull origin master
    echo "start server"
    pm2 start server.js
else
    git clone https://github.com/Jilty/istika-mongodb.git
    cd istika-mongodb
    pm2 start server.js
    
fi



