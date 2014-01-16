var stdin = process.openStdin();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

stdin.on('data', function (chunk, key) {
    console.log(JSON.stringify(chunk));
    console.log(chunk,key);
    process.stdout.write('Keypress: ' + chunk + '\n');
    if (chunk == 'x') process.exit();
    if (chunk == "\u001b[D") {
        my.sphero.setColor('gold');
    } else if (chunk == "\u001b[B") {
        my.sphero.setColor('steelblue');
    } else if (chunk == "\u001b[C") {
        my.sphero.setColor('forestgreen');
    } else if (chunk == null) {
        my.sphero.setColor('firebrick');
    }
});
