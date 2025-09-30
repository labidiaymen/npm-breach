const { colorize } = require('../utils/colors');
const fs = require('fs');
const path = require('path');

function getVersion() {
  try {
    const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    return '1.0.0'; // fallback version
  }
}

function showHelp() {
  const version = getVersion();
  console.log(colorize(`NPM Package Checker v${version}`, 'blue'));
  console.log(colorize("Check npm packages and semantic version ranges in dependency trees", 'gray'));
  console.log();
  console.log(colorize("Usage:", 'yellow'));
  console.log('  npm-breach-check [command] [options]');
  console.log();
  console.log(colorize("Commands:", 'yellow'));
  console.log("  check                                 Check all affected packages (default)");
  console.log("  check-package <name> <version-range>  Check a specific package and version range");
  console.log("  list                                  List all affected packages");
  console.log("  help, --help, -h                      Show this help message");
  console.log("  version, --version, -v                Show version number");
  console.log();
  console.log(colorize("Semantic Version Examples:", 'yellow'));
  console.log("  ^1.2.3     Compatible with version 1.2.3 or higher (^1.2.3 ≤ version < 2.0.0)");
  console.log("  ~1.2.3     Approximately equivalent to version 1.2.3 (~1.2.3 ≤ version < 1.3.0)");
  console.log("  >=1.2.3    Greater than or equal to version 1.2.3");
  console.log("  1.2.3      Exact version 1.2.3");
  console.log("  1.2.x      Any version in the 1.2.x range");
  console.log();
  console.log(colorize("Examples:", 'yellow'));
  console.log('  npm-breach-check');
  console.log('  npm-breach-check check');
  console.log("  npm-breach-check check-package jwt-decode '^2.2.0'");
  console.log("  npm-breach-check check-package react '>=16.0.0'");
  console.log('  npm-breach-check list');
}

function showVersion() {
  const version = getVersion();
  console.log(version);
}

module.exports = { showHelp, showVersion };