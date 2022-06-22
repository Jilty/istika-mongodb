#! bin/bash
# mongod --version 2>&1 >/dev/null
# MONGO_IS_AVAILABLE=$?
# echo Checking for MongoDB VERSION: $MONGO_IS_AVAILABLE
# if [ $MONGO_IS_AVAILABLE -eq 127 ];
# then
#   sudo curl -fssl https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add - 2>&1 >/dev/null
#   apt-key list - 2>&1 >/dev/null
#   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee etc/apt/sources.list.d/mongodb-org-4.4.list - 2>&1 >/dev/null
#   sudo apt-get update - 2>&1 >/dev/null
#   sudo apt-get install -y mongodb-org - 2>&1 >/dev/null
#   sudo systemctl start mongod.service - 2>&1 >/dev/null
#   sudo systemctl status mongod
# fi

if [ -f /usr/bin/mongod ]; then
  echo "MongoDB is installed on your machine."
  kill -0 "$$" || exit
else
  echo "********************* MongoDB 4.0 INSTALL **************************"
  echo "MongoDB is is not installed."
  echo "You will be prompted several time for input during the install."
  echo "******************************************************************"
  
  wget -qO- https://www.mongodb.org/static/pgp/server-4.0.asc | sudo bash -c "apt-key add"
  
  sudo bash -c "echo deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse > /etc/apt/sources.list.d/mongodb-org.list"
  sudo bash -c "apt update && apt upgrade -y"
  sudo bash -c "apt install mongodb-org -y"

  sudo bash -c "apt update && apt upgrade -y"
  sudo bash -c "apt autoremove && apt clean"
  
  sudo bash -c " mkdir /data /data/db"
    
  sudo bash -c "ufw allow proto tcp from any to any port 27017" #recommend 'from any' to local network range
  sudo bash -c "ufw enable"  
  
  sudo bash -c "systemctl enable mongod"  #enables Mongo on system startup
  sudo bash -c "service mongod start"

 
fi

docker -v 2>&1 >/dev/null
DOCKER_IS_AVAILABLE=$?
echo Checking for DOCKER VERSION: $DOCKER_IS_AVAILABLE
if [ $DOCKER_IS_AVAILABLE -eq 127 ];
then
    curl -fsSL https://get.docker.com -o get-docker.sh - 2>&1 >/dev/null
    sh get-docker.sh - 2>&1 >/dev/null
#   sudo apt update
#   sudo apt install apt-transport-https ca-certificates curl software-properties-common -y whatever
#   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
#   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
#   sudo apt-get update
#   sudo apt-cache policy docker-ce 2>/dev/null | grep packages | cut -d '.' -f 1
#   sudo apt-get install docker-ce 2>/dev/null | grep packages | cut -d '.' -f 1
 fi 




  
  
