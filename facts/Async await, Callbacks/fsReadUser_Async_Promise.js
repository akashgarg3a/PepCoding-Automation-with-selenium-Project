let fs = require('fs');

function handleSuccess(contents){
    console.log('Success - ' + contents.length);
}

function handleFailure(fm){
    console.log('Failure - ' + fm);
}

console.log('1');

// Returns an object representing a promise of a work which will get done in future in a background thread.
// How you use the promise is upto you.
// If you wish to receive the contents, you can hook your funtion in "then" of the promise
// If you wish to receive errors of the background work, you can hook your function in "catch" of the promise
// I shared prd details to amazon, amazon gave me a 'order confirmation email', which is a promise that my 'prd' will be made ready
// in the background so that i can do my other work during this time
// Now I can use the 'order confirmation email' (the promise) to receive my 'prd' at an address.
let rp = fs.promises.readFile('./zoom_0.mp4');
rp.then(handleSuccess).catch(handleFailure);

console.log('2');