// const { spawn } = require('child_process');
// const path = require('path');
// const os = require('os');

// const isWindows = os.platform() === 'win32';
// const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// // Colors for console output
// const colors = {
//   reset: '\x1b[0m',
//   red: '\x1b[31m',
//   green: '\x1b[32m',
//   yellow: '\x1b[33m',
//   blue: '\x1b[34m',
//   magenta: '\x1b[35m',
//   cyan: '\x1b[36m'
// };

// // Function to spawn processes
// function spawnProcess(command, args, cwd, name, color) {
//   console.log(`${color}Starting ${name}...${colors.reset}`);
  
//   const childProcess = spawn(command, args, {
//     cwd,
//     shell: true,
//     stdio: 'pipe'
//   });
  
//   childProcess.stdout.on('data', (data) => {
//     console.log(`${color}[${name}] ${data.toString().trim()}${colors.reset}`);
//   });
  
//   childProcess.stderr.on('data', (data) => {
//     console.error(`${color}[${name} ERROR] ${data.toString().trim()}${colors.reset}`);
//   });
  
//   childProcess.on('close', (code) => {
//     console.log(`${color}[${name}] Process exited with code ${code}${colors.reset}`);
//   });
  
//   return childProcess;
// }

// // Start MongoDB (assuming it's installed)
// let mongoProcess;
// const mongodbPath = isWindows ? 'C:\\Program Files\\MongoDB\\Server\\5.0\\bin\\mongod.exe' : 'mongod';
// try {
//   console.log(`${colors.yellow}Starting MongoDB...${colors.reset}`);
//   mongoProcess = spawn(
//     isWindows ? mongodbPath : 'mongod', 
//     [], 
//     {
//       shell: true,
//       stdio: 'pipe'
//     }
//   );
  
//   mongoProcess.stdout.on('data', (data) => {
//     console.log(`${colors.yellow}[MongoDB] ${data.toString().trim()}${colors.reset}`);
//   });
  
//   mongoProcess.stderr.on('data', (data) => {
//     const output = data.toString().trim();
//     // Filter out non-error MongoDB logs that come through stderr
//     if (!output.includes('WARNING') && !output.includes('INFO')) {
//       console.error(`${colors.yellow}[MongoDB ERROR] ${output}${colors.reset}`);
//     }
//   });
  
//   mongoProcess.on('error', (err) => {
//     console.error(`${colors.red}Failed to start MongoDB: ${err.message}${colors.reset}`);
//     console.log(`${colors.yellow}Continuing without MongoDB - make sure it's running separately${colors.reset}`);
//   });
// } catch (error) {
//   console.error(`${colors.red}Failed to start MongoDB: ${error.message}${colors.reset}`);
//   console.log(`${colors.yellow}Continuing without MongoDB - make sure it's running separately${colors.reset}`);
// }

// // Start Backend
// const backendPath = path.join(__dirname, 'backend');
// const backendProcess = spawnProcess(npmCmd, ['run', 'dev'], backendPath, 'Backend', colors.cyan);

// // Start Frontend
// const frontendPath = path.join(__dirname, 'frontend');
// const frontendProcess = spawnProcess(npmCmd, ['start'], frontendPath, 'Frontend', colors.green);

// // Handle termination
// process.on('SIGINT', () => {
//   console.log(`${colors.red}Shutting down all processes...${colors.reset}`);
  
//   if (mongoProcess) mongoProcess.kill();
//   backendProcess.kill();
//   frontendProcess.kill();
  
//   process.exit(0);
// });

// console.log(`${colors.magenta}All services started. Press Ctrl+C to stop all.${colors.reset}`); 