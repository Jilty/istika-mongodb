mongo --version 2>&1 >/dev/null
MONGO_IS_AVAILABLE=$?
echo Checking for MongoDB VERSION: $MONGO_IS_AVAILABLE
if [ $NODE_IS_AVAILABLE -eq 127 ];
then
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - > /dev/null
  sudo apt-get install -y nodejs > /dev/null
  sudo apt-get install npm
fi
