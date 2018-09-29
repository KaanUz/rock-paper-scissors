var io = require('socket.io-client');
var client = io('http://localhost:9000');

const chai = require('chai');
chai.use(require('chai-json'));
const expect = chai.expect;

const server = require('../app');
const http = require('http');

const testChoice = 'rock';
const testCount = 10
var   failureCount = 0;

var staticFiles = [
    '../views/index.html',
    '../public/css/style.css',
    '../public/images/rock.png',
    '../public/images/paper.png',
    '../public/images/scissors.png',
    '../public/js/socket.js',
];

staticFiles.forEach( function(file){
    http.get('http://localhost:9000/' + file, function(res) {
        try {
            expect(res.statusCode,
                 'topic [res.statusCode]').to.equal(200);
        } catch(AssertionError) {
            failureCount++;
        }
    });
});

client.on('connect', function () {
    console.log('Socket connection successful.')
});

client.on('message', function(msg){ 
    try {
        expect(msg, 'topic [msg]').to.be.a('string');
    } catch(AssertionError) {
        failureCount++;
    }
    
});

client.emit('user choice', testChoice);

client.on('game result', function(data) {
    try {
        expect(data, 'topic [data]').to.be.a.jsonObj();
    } catch(AssertionError) {
        failureCount++;
    }
    try {
        expect(data.usrChoice).to.equal(testChoice);
    } catch(AssertionError) {
        failureCount++;        
    }
    try {
        expect(data.msg).to.be.a('string');
    } catch(AssertionError) {
        failureCount++;
    }

    server.close(function () {
        console.log("Finished all tests");
        console.log(failureCount + " out of " + testCount + " Failed.")
        process.exit();
    });
});
