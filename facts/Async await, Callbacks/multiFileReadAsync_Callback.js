
let fs = require('fs');

let f1 = './f1.txt';
let f2 = './f2.txt';
let f3 = './f3.txt';
let f4 = './f4.txt';
let f5 = './f5.txt';
let f6 = './f6.txt';
let f7 = './f7.txt';

// function f1h(err, contents){
//     console.log('f1 - ' + contents.length);
//     if(contents.length > 10){
//         fs.readFile(f2, f2h);
//     } else {
//         fs.readFile(f3, f3h);
//     }
// }

// function f2h(err, contents){
//     console.log('f2 - ' + contents.length);
//     if(contents.length > 20){
//         fs.readFile(f4, f4h);
//     } else {
//         fs.readFile(f5, f5h);
//     }
// }

// function f3h(err, contents){
//     console.log('f3 - ' + contents.length);
//     if(contents.length > 30){
//         fs.readFile(f6, f6h);
//     } else {
//         fs.readFile(f7, f7h);
//     }
// }

// function f4h(err, contents){
//     console.log('f4 - ' + contents.length);
// }

// function f5h(err, contents){
//     console.log('f5 - ' + contents.length);
// }

// function f6h(err, contents){
//     console.log('f6 - ' + contents.length);   
// }

// function f7h(err, contents){
//     console.log('f7 - ' + contents.length);
// }

// fs.readFile(f1, f1h);


fs.readFile(f1, function(err, contents){
    console.log('f1 - ' + contents.length);
    if(contents.length > 10){
        fs.readFile(f2, function(err, contents){
            console.log('f2 - ' + contents.length);
            if(contents.length > 20){
                fs.readFile(f4, function(err, contents){
                    console.log('f4 - ' + contents.length);
                });
            } else {
                fs.readFile(f5, function(err, contents){
                    console.log('f5 - ' + contents.length);
                });
            }
        });
    } else {
        fs.readFile(f3, function(err, contents){
            console.log('f3 - ' + contents.length);
            if(contents.length > 30){
                fs.readFile(f6, function(err, contents){
                    console.log('f6 - ' + contents.length);
                });
            } else {
                fs.readFile(f7, function(err, contents){
                    console.log('f7 - ' + contents.length);
                });
            }
        });
    }
});

