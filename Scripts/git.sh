#! bin/bash 

git --version
GIT_IS_AVAILABLE=$?
# ...
if [ $GIT_IS_AVAILABLE -eq 0 ];
then
  sudo apt install git
fi  
