var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-GOG-AMP-SPP' },
  device: {name: 'sphero', driver: 'sphero'},

    work: function(my) {
        my.sphero.stop()
        every((1).second(), function() {
            my.sphero.roll(60, Math.floor(Math.random() * 360));
        });
    }
}).start();
