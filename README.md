# Image-Watermarker

## Prerequisites
Node is required to run this project.

## Running
### Complete run
 - Place the images you wish to watermark into the `Images` folder
 - Edit the config file to suit your needs
 - Run the .exe file
 - If the program terminates for any reason, run it again and it will start up where it left off. 
 
 *Warning: If an image was in the middle of being processed, it will be skipped once the program resumes and an error will show once it has finnished.

## Config options
The watermark can be modified using the config.json file
### Data
The data for the watermark, the fields are: 
 - `font`: size and style of the watermark
 - `color`: hex code of colour of watermark
 - `transparency`: percent transparency value with 100 being completly transparent and 0 being no transparency.
 - `text`: text value of watermark
 - `position`: position of text
 - `horizontalPadding`: padding of text relative to a horizontal edge
 - `verticalPadding`: padding of text relative to a vertical edge
 - `xOffset`: displacement of x position
 - `yOffset`: displacement of y position
 - `rotation`: rotation around text center (set to 'auto' for corner to corner rotation)
 - `sourceDirectory`: the directory for the source files
 - `destinationDirectory`: the directory the watermarked files will be output to.
 
### Other Options
 - `reset logs`: (boolean) will reset logs before start of run, (will overide previously processed images)
 - `overideFiles`: (boolean) will only process images located in `files`
 - `files`: whitelist of images contained in `sourceDirectory` that you wish to process. (file extention can be ommited as it assumes all files are .jpgs)
 
## Position
The position modifier can be used to easily change the position of the text, the values it takes are: 
 - `CENTER`
 - `TOP`
 - `BOTTOM`
 - `LEFT`
 - `RIGHT`
 
These values can be strung together seperated by a space, e.g. `TOP RIGHT` or `CENTER BOTTOM`
