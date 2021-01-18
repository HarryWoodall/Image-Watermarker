fs = require('fs');
const sizeOf = require('image-size');
const { createCanvas, loadImage } = require('canvas');

//Config
const font = '60px Arial';
const color = "#ffffff";
const transparency = 60;
const text = "Stockport Council";
const xOffset = 0;
const yOffset = 0;
const rotation = 0;
const sourceDirectory = "Images";
const distinationDirectory = "Destination";

const args = process.argv.slice(2);
args.forEach(arg => {
  switch(arg) {
    case "reset":
      resetProgressLogs();
      break;
  }
});

// setFiles(
//   ["432010"]
// );

// Setup
const progressData = JSON.parse(fs.readFileSync('./data.json')); 
if (progressData.filesRemaining.length <= 0 && progressData.filesDone.length <= 0) {
  progressData.filesRemaining = fs.readdirSync(`./${sourceDirectory}`);
  fs.writeFileSync('./data.json', JSON.stringify(progressData));
}

if (progressData.fileInProgress) {
  progressData.filesErrored.push(progressData.fileInProgress);
}

if (progressData.filesRemaining.length > 0) {
  processImages()
  .then(() => {
    if (progressData.filesErrored.length) {
      progressData.filesErrored.forEach(file => {
        console.log(`ERROR: File ${file} was skipped, please check manually`);
      }) 
    } else {
      console.log("Processing complete, no errors");
    }
  });
} else {
  console.log("No Files to Process");
}





async function processImages() {
  while(progressData.filesRemaining.length > 0) {

    const imageName = progressData.filesRemaining[progressData.filesRemaining.length - 1]
    const imageDestination = `./${distinationDirectory}/${imageName}`;
    const currentImageLocation = `./${sourceDirectory}/${imageName}`;

    if (fs.existsSync(currentImageLocation)) {
      const dimensions = sizeOf(currentImageLocation);
      const canvas = createCanvas(dimensions.width, dimensions.height);
      const ctx = canvas.getContext('2d');

      progressData.fileInProgress = progressData.filesRemaining.pop();
      fs.writeFileSync('./data.json', JSON.stringify(progressData));
      
      console.log(`Loading ${imageName}`);
      await loadImage(currentImageLocation).
      then((image) => {
        console.log(`Processing ${imageName}`);
        ctx.drawImage(image, 0, 0);
        ctx.fillStyle = color + convertToHex(transparency);
        ctx.font = font
        ctx.rotate(rotation * Math.PI / 180);
        var textData = ctx.measureText(text);
        ctx.fillText(text, (dimensions.width / 2 - textData.width / 2) + xOffset, (dimensions.height / 2 + (textData.actualBoundingBoxAscent -  textData.actualBoundingBoxDescent) / 2) + yOffset);
        fs.writeFileSync(imageDestination, canvas.toBuffer('image/jpeg')); 
        console.log(`${imageName} processed`);

        progressData.filesDone.push(progressData.fileInProgress);
        progressData.fileInProgress = "";
        fs.writeFileSync('./data.json', JSON.stringify(progressData));
        console.log(`Logs updated`);
        console.log(`${Math.round(progressData.filesDone.length / (progressData.filesRemaining.length + progressData.filesDone.length) * 100)}% complete\n`);
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      console.log(`ERROR, file ${currentImageLocation} doesn't exist\n`);
      progressData.filesErrored.push(progressData.filesRemaining.pop());
    }
  }
}

function resetProgressLogs() {
  console.log("resetting logs");
  let data = {
    filesRemaining: [],
    filesDone: [],
    fileInProgress: "",
    filesErrored: []
  }
  fs.writeFileSync('./data.json', JSON.stringify(data));
}

function convertToHex(number) {
  if (number > 100 || number < 0) {
    console.log("Transparency out of bounds");
    return "00";
  } else {
    number = 100 - number;
    const normalizedValue = Math.round(number / 100 * 255);
    return normalizedValue.toString(16);
  }
}

function setFiles(files) {
  if (files) {
    files = files.map(file => {
      if (file.split(".").pop() !== "jpg") {
        return file += ".jpg";
      }
    });
    let data = {
      filesRemaining: files,
      filesDone: [],
      fileInProgress: "",
      filesErrored: []
    }
    fs.writeFileSync('./data.json', JSON.stringify(data));
  }
}

