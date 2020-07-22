let fs = require('fs');

function handleSuccess(contents){
    console.log('Success - ' + contents.length);
}

function handleFailure(fm){
    console.log('Failure - ' + fm);
}

function handleFileRead(err, contents){
    if(err){
        handleFailure(err);
    } else {
        handleSuccess(contents);
    }
}

console.log('1');

// i shared 'prd' details with amazon (so that i can do my work while amazon is getting me the product in background)
// also, i shared my address with amazon (so that when prd is ready, amazon could ship it to me)
fs.readFile('./zoom_0.mp4', handleFileRead);

console.log('2');

