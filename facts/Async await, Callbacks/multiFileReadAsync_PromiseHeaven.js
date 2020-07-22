
let fs = require('fs');

let f1 = './f1.txt';
let f2 = './f2.txt';
let f3 = './f3.txt';
let f4 = './f4.txt';
let f5 = './f5.txt';
let f6 = './f6.txt';
let f7 = './f7.txt';

let f1p = fs.promises.readFile(f1);
f1p.then(function(c){
    c += "";
    if(c === '1'){
        let f2p = fs.promises.readFile(f2);
        return f2p;
    } else {
        return Promise.reject(1);
    }
}).then(function(c){
    c += "";
    if(c === '1'){
        let f3p = fs.promises.readFile(f3);
        return f3p;
    } else {
        return Promise.reject(2);
    }
}).then(function(c){
    c += "";
    if(c === '1'){
        let f4p = fs.promises.readFile(f4);
        return f4p;
    } else {
        return Promise.reject(3);
    }
}).then(function(c){
    c += "";
    if(c === '1'){
        let f5p = fs.promises.readFile(f5);
        return f5p;
    } else {
        return Promise.reject(4);
    }
}).then(function(c){
    c += "";
    if(c === '1'){
        let f6p = fs.promises.readFile(f6);
        return f6p;
    } else {
        return Promise.reject(5);
    }
}).then(function(c){
    c += "";
    if(c === '1'){
        let f7p = fs.promises.readFile(f7);
        return f7p;
    } else {
        return Promise.reject(6);
    }
}).then(function(c){
    c += "";
    if(c === '1'){
        console.log('all levels passed');
    } else {
        return Promise.reject(7);
    }
}).catch(function(l){
    console.log('failed at f' + l);
})