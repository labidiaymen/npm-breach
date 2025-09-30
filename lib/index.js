#!/usr/bin/env node

const { checkAllAffectedPackages } = require('./commands/check');
const { checkSpecificPackage } = require('./commands/checkPackage');
const { listPackages } = require('./commands/list');
const { showHelp, showVersion } = require('./commands/help');
const { colorize } = require('./utils/colors');
const { checkForUpdates } = require('./utils/versionChecker');

// Check for updates before running commands (async, non-blocking)
checkForUpdates();

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'check';

switch (command) {
  case 'check':
    checkAllAffectedPackages();
    break;
  
  case 'check-package':
    if (args.length < 3) {
      console.error(colorize("Error: check-package requires package name and version range", 'red'));
      console.log("Usage: npm-breach-check check-package <package> <version-range>");
      console.log("Examples:");
      console.log("  npm-breach-check check-package jwt-decode '^2.2.0'");
      console.log("  npm-breach-check check-package react '>=16.0.0'");
      process.exit(1);
    }
    checkSpecificPackage(args[1], args[2]);
    break;
  
  case 'list':
    listPackages();
    break;
  
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  
  case 'version':
  case '--version':
  case '-v':
    showVersion();
    break;
  
  default:
    console.error(colorize(`Error: Unknown command '${command}'`, 'red'));
    console.log("Run 'npm-breach-check help' for usage information");
    process.exit(1);
}