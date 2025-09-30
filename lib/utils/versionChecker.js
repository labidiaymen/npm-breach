const { execSync } = require('child_process');
const semver = require('semver');
const fs = require('fs');
const path = require('path');
const { colorize } = require('./colors');

async function checkForUpdates() {
  try {
    // Get current version from package.json
    const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageJson.version;
    
    // Check latest version from npm registry
    const latestVersionOutput = execSync('npm view @npm-breach/check version', { 
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 3000 // 3 second timeout
    }).trim();
    
    if (semver.gt(latestVersionOutput, currentVersion)) {
      console.log(colorize('\n⚠ Update available!', 'yellow'));
      console.log(colorize(`  Current version: ${currentVersion}`, 'gray'));
      console.log(colorize(`  Latest version:  ${latestVersionOutput}`, 'green'));
      console.log(colorize('  Run: npm install -g @npm-breach/check@latest\n', 'cyan'));
    }
  } catch (error) {
    // Silently fail - don't interrupt the main functionality
    // Version check is not critical
  }
}

module.exports = { checkForUpdates };