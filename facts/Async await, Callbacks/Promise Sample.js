let fs = require('fs');

function promiseProducer(file){
    return new Promise(function(resolve, reject){
        fs.readFile(file, function(err, contents){
            if(err){
                reject(err);
            } else {
                resolve(contents);
            }
        });
    });
}


let p = promiseProducer('./ab.test');
p.then(function(content){
    console.log(content);
}).catch(function(err){
    console.log(err);
})