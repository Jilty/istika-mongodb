mongo --version 2>&1 >/dev/null
MONGO_IS_AVAILABLE=$?
echo Checking for MongoDB VERSION: $MONGO_IS_AVAILABLE
if [ $MONGO_IS_AVAILABLE -eq 127 ];
then
  echo mongo not available
fi
