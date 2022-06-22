#! bin/bash
mongod --version 2>&1 >/dev/null
MONGO_IS_AVAILABLE=$?
echo Checking for MongoDB VERSION: $MONGO_IS_AVAILABLE
if [ $MONGO_IS_AVAILABLE -eq 127 ];
then
  curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add - 2>&1 >/dev/null
  apt-key list
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee etc/apt/sources.list.d/mongodb-org-4.4.list
  sudo apt-get update
  sudo apt-get install mongodb-org
  sudo systemctl start mongod.service
  sudo systemctl status mongod
fi

docker -v 2>&1 >/dev/null
DOCKER_IS_AVAILABLE=$?
echo Checking for DOCKER VERSION: $DOCKER_IS_AVAILABLE
if [ $DOCKER_IS_AVAILABLE -eq 127 ];
then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
#   sudo apt update
#   sudo apt install apt-transport-https ca-certificates curl software-properties-common -y whatever
#   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
#   sudo apt-get update
#   sudo apt-cache policy docker-ce 2>/dev/null | grep packages | cut -d '.' -f 1
#   sudo apt-get install docker-ce 2>/dev/null | grep packages | cut -d '.' -f 1
 fi 




  
  
