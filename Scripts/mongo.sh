mongo --version 2>&1 >/dev/null
MONGO_IS_AVAILABLE=$?
echo Checking for MongoDB VERSION: $MONGO_IS_AVAILABLE
if [ $MONGO_IS_AVAILABLE -eq 127 ];
then
  curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add - 2>&1 >/dev/null
  apt-key list
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee etc/apt/sources.list.d/mongodb-org-4.4.list
  sudo apt update
  sudo apt install mongodb-org
  sudo systemctl start mongod.service
  sudo systemctl status mongod
fi
