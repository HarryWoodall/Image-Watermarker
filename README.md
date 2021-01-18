# Image-Watermarker

## Prerequisites
Node is required to run this project.

## Installing
cd into the project folder
````
npm install
````

## Running
### Complete run
 - Place the images you wish to watermark into the `Images` folder
 - Edit the config section of index.js to suit your needs
 - Run the command
    ````
    node index.js
    ````
 - If the program terminates for any reason, run the command again and it will start up where it left off. 
 
 *Warning: if an images was in the middle of being processed, it will be skipped once the program resumes and an error will show once it has finnished.


### Restart run
  If you wish to redo what has already been done run
    ````
    node index.js reset
    ````
    
    
### Edit specific files
  If you only want to program to run on certain files in the 'Images' folder, you can use the 'setFiles()' function on line 25
  This function takes in an array of file names you wish to edit (Note: file extentions can be ommited as it assumes all files are JPG)
  
  ````
  setFiles(
    ["432010", "137", "A221"]
  );
  ````
