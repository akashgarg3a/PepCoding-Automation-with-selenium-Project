let fs = require('fs');

console.log('1');

// sync function will do the main task of reading in main thred,
// thus starving the cpu from actual work
// cpu is waiting for read to finish
// till amazon will get me my product, i will be busy waiting for it 
// (means untill then, i won't do anything else, not even work which doesnot depend on the product)
let contents = fs.readFileSync('./zoom_0.mp4').toString();
console.log(contents.length);

console.log('2');