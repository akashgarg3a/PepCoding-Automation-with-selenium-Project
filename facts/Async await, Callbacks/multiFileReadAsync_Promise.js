
let fs = require('fs');

let f1 = './f1.txt';
let f2 = './f2.txt';
let f3 = './f3.txt';
let f4 = './f4.txt';
let f5 = './f5.txt';
let f6 = './f6.txt';
let f7 = './f7.txt';

let lr = 0;

let f1p = fs.promises.readFile(f1);
lr = 1;
f1p.then(function(contents){
    console.log('f1 - ' + contents.length);
    if(contents.length > 10){
        let f2p = fs.promises.readFile(f2);
        lr = 2;
        return f2p;
    } else {
        let f3p = fs.promises.readFile(f3);
        lr = 3;
        return f3p;
    }
}).then(function(contents){
    if(lr == 2){
        console.log('f2 - ' + contents.length);
        if(contents.length > 20){
            let f4p = fs.promises.readFile(f4);
            lr = 4;
            return f4p;
        }
        else {
            let f5p = fs.promises.readFile(f5);
            lr = 5;
            return f5p;
        }
    } else if(lr == 3) {
        console.log('f3 - ' + contents.length);
        if(contents.length > 30){
            let f6p = fs.promises.readFile(f6);
            lr = 6;
            return f6p;
        }
        else {
            let f7p = fs.promises.readFile(f7);
            lr = 7;
            return f7p;
        }
    }
}).then(function(contents){
    if(lr == 4){
        console.log('f4 - ' + contents.length);
    } else if(lr == 5){
        console.log('f5 - ' + contents.length);
    } else if(lr == 6){
        console.log('f6 - ' + contents.length);
    } else if(lr == 7){
        console.log('f7 - ' + contents.length);
    }
})


/*
f1p.then(function(contents){
    console.log('f1 - ' + contents.length);
    if(contents.length > 10){
        let f2p = fs.promises.readFile(f2);
        f2p.then(function(contents){
            console.log('f2 - ' + contents.length);
            if(contents.length > 20){
                let f4p = fs.promises.readFile(f4);
                f4p.then(function(contents){
                    console.log('f4 - ' + contents.length);
                })
            } else {
                let f5p = fs.promises.readFile(f5);
                f5p.then(function(contents){
                    console.log('f4 - ' + contents.length);
                })
            }
        })
    } else{
        let f3p = fs.promises.readFile(f3);
        f3p.then(function(contents){
            console.log('f3 - ' + contents.length);
            if(contents.length > 30){
                let f6p = fs.promises.readFile(f6);
                f6p.then(function(contents){
                    console.log('f6 - ' + contents.length);
                })
            } else {
                let f7p = fs.promises.readFile(f7);
                f7p.then(function(contents){
                    console.log('f7 - ' + contents.length);
                })
            }
        })
    }
})
*/