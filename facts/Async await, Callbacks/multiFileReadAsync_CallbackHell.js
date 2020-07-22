
let fs = require('fs');

let f1 = './f1.txt';
let f2 = './f2.txt';
let f3 = './f3.txt';
let f4 = './f4.txt';
let f5 = './f5.txt';
let f6 = './f6.txt';
let f7 = './f7.txt';

fs.readFile(f1, function(e, c){
    c += "";
    if(c === '1'){
        fs.readFile(f2, function(e, c){
            c += "";
            if(c === '1'){
                fs.readFile(f3, function(e, c){
                    c += "";
                    if(c === '1'){
                        fs.readFile(f4, function(e, c){
                            c += "";
                            if(c === '1'){
                                fs.readFile(f5, function(e, c){
                                    c += "";
                                    if(c === '1'){
                                        fs.readFile(f6, function(e, c){
                                            c += "";
                                            if(c === '1'){
                                                fs.readFile(f7, function(e, c){
                                                    c += "";
                                                    if(c === '1'){
                                                        console.log('all levels passed');
                                                    } else {
                                                        console.log('failed at f7');
                                                    }
                                                });
                                            } else {
                                                console.log('failed at f6');
                                            }
                                        });
                                    } else {
                                        console.log('failed at f5');
                                    }
                                });
                            } else {
                                console.log('failed at f4');
                            }
                        });
                    } else {
                        console.log('failed at f3');
                    }
                });
            } else {
                console.log('failed at f2');
            }
        });
    } else {
        console.log('failed at f1');
    }
})