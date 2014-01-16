var Cylon = require('cylon');

var count = 0;
var curAngle = 0;
var ANGLE_TO_MOVE = 12;
var SPEED = 75;
var TOTAL_CIRCLE = 400;
Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-GOG-AMP-SPP' },
  device: {name: 'sphero', driver: 'sphero'},

    work: function(my) {
        var fired = false;
        my.sphero.stop();
        var stdin = process.openStdin();
        process.stdin.setEncoding('utf8');
        process.stdin.setRawMode(true);

        stdin.on('data', function (chunk, key) {
            console.log(JSON.stringify(chunk));
            console.log(chunk,key);
            process.stdout.write('Keypress: ' + chunk + '\n');
            if (chunk == 'x') {
                my.sphero.stop();
                process.exit();
                return;
            }
            if (chunk == "s") {
                my.sphero.setColor('gold');
            } else if (chunk == "a") {
                my.sphero.setColor('steelblue');
            } else if (chunk == "d") {
                my.sphero.setColor('green');
            } else if (chunk == 'w') {
                my.sphero.setColor('red');
            } else if (chunk == ' ') {
                my.sphero.stop() ;
            } else if (chunk == "\u001b[C") {
                my.sphero.roll(SPEED, 90);
            } else if (chunk == "\u001b[B") {
                my.sphero.roll(SPEED, 180);
            } else if (chunk == "\u001b[D") {
                my.sphero.roll(SPEED, 270);
            } else if (chunk == 'g') {
                if (fired) {
                    return;
                }
                fired = true;
                //me.sphero.setRGB(
                //    Yellow: F3B41B
                //    Blue: 4C65AF
                //    Green: 0e7e46
                //    Red: B0372c
                //my.sphero.setRGB(my.sphero.getRGB(95,120,186));
                //my.sphero.setRGB(my.sphero.getRGB(176,55,);
                var circleInterval = every((.25).second(), function() {
                    if (curAngle > TOTAL_CIRCLE) {
                        clearInterval(circleInterval);
                        my.sphero.stop();
                        console.log("no more circle");
                        return;
                    }
                    my.sphero.roll(SPEED, curAngle);
                    count++;
                    curAngle += ANGLE_TO_MOVE;
                });
                var afirst = null;
                var totalTime = (((TOTAL_CIRCLE/ANGLE_TO_MOVE) * .25)+2);
                after(totalTime.second(), function() {
                    SPEED -= 15;
                    my.sphero.setColor('gold');
                    my.sphero.roll(SPEED, 110);
                });
                after((totalTime+3).second(), function() {
                    my.sphero.stop();
                });
                after((totalTime + 5).second(), function() {
                    my.sphero.setColor('steelblue');
                    my.sphero.roll(SPEED, 220);
                });
                after((totalTime + 8).second(), function() {
                    my.sphero.stop();
                });
                // back to halfway for horizontal bar
                after((totalTime + 10).second(), function() {
                    my.sphero.roll(SPEED, 40);
                });
                after((totalTime + 11.5).second(), function() {
                    my.sphero.stop();
                });
                after((totalTime + 13.5).second(), function() {
                    my.sphero.setColor('green');
                    my.sphero.roll(SPEED, 330);
                });
                after((totalTime + 15.5).second(), function() {
                    my.sphero.setColor('ghostwhite');
                    my.sphero.stop();
                    fired = false;
                });
            } else {
                my.sphero.roll(SPEED, 0);
            }
        });
        //after((totalTime + 15.5).second(), function() {

    }
}).start();

var interval = setInterval(function() {
    if (count >= 72) {
        Cylon.stop();
        clearInterval(interval);
    }
}, 100);
