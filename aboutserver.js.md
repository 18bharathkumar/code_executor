## code explination of server.js
**express**
here we use express to create a server 
**fs**
file system module to intreact with file read/write
**child_process**
we are creating the child process to execute the docker commands 
``fs.writeFileSync('user_code.py', code);``
<br>
is to copy the things thats in code variable into user_code.py
<br>
this will create a file user_code.py if it doesnot exist if exist it will completly overwrite the omtent from  the code variable
<br>
in the same way we define doceker file content and copy to docker file

## executing the  child process 
**first child process**
execute the command to build a image from the docker file

**secound child process**
execuete the command to run a docker container



