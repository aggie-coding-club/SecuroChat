const { spawn } = require('cross-spawn');
const path = require('path');

const packages = ['client','server'];

packages.forEach((package) => {
    const packagePath = path.resolve(__dirname, 'packages', package);
    const installProcess = spawn('npm', ['install'], {
        cwd : packagePath,
        stdio : 'inherit'
    });

    installProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Failed to install dependencies for ${package}`);
            process.exit(code);
        }
    });
});