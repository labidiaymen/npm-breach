const { checkPackageWithSemver } = require('../core/packageChecker');
const { colorize } = require('../utils/colors');

function checkSpecificPackage(packageName, versionRange) {
  console.log(colorize(`Checking package: ${packageName} (${versionRange})`, 'yellow'));
  const result = checkPackageWithSemver(packageName, versionRange);
  
  if (result.found) {
    if (result.satisfies) {
      console.log(colorize("✓ Affected", 'red'));
    } else {
      console.log(colorize("⚠ Found but version not affected", 'yellow'));
    }
    console.log(colorize(`  Installed: ${result.installedVersion}`, 'gray'));
    console.log(colorize(`  Affected: ${versionRange}`, 'gray'));
  } else {
    console.log(colorize("✗ Not Affected", 'green'));
    console.log(colorize(`  ${result.output}`, 'gray'));
  }
}

module.exports = { checkSpecificPackage };