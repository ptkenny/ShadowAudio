const fs = require('fs');
const recursive = require('recursive-readdir');
const username = require('username');
const cp = require('child_process');
const _ = require('underscore');
const path = require('path');

let shadowplayFiles;

global.getAudio = function () {
    recursive(`C:\\Users\\${username.sync()}\\Videos`, (err, files) => {
        if (err) throw err;

        shadowplayFiles = files;
        let time = parseInt(document.getElementById("time").value);

        if(isNaN(time)) {
            time = 10;
        }

        const tenSecondCommand = `ffmpeg.exe -sseof -${time} -i \"${getNewestFile()}\" temp.mp4`;
        const convertCommand = "ffmpeg.exe -i temp.mp4 C:\\Users\\" + username.sync() + "\\Desktop\\out.mp3";
        cp.spawnSync('cmd', ['/s', '/c', tenSecondCommand], { windowsVerbatimArguments: true });
        cp.spawnSync('cmd', ['/s', '/c', convertCommand], { windowsVerbatimArguments: true });
        fs.unlink('temp.mp4', (err) => {
            if(err) throw err;
        });
    });
}

function getNewestFile() {
    return _.max(shadowplayFiles, (f) => {
        var absolutePath = f;
        return fs.statSync(absolutePath).ctime;
    });
}

document.getElementById("audiobutton").addEventListener("click", () => {
    global.getAudio();
});