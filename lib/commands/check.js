const { loadAffectedPackages } = require('../core/packageLoader');
const { checkPackageWithSemver } = require('../core/packageChecker');
const { printHeader, printSummary, printSatisfiedPackages, printAffectedPackages } = require('../utils/output');
const { colorize } = require('../utils/colors');

function checkAllAffectedPackages() {
  const affectedPackages = loadAffectedPackages();
  
  if (affectedPackages.length === 0) {
    console.log(colorize("No packages loaded from affected-packages.json", 'red'));
    return;
  }

  printHeader();

  let totalChecked = 0;
  let foundCount = 0;
  let satisfiedCount = 0;
  const wrongVersionPackages = [];
  const satisfiedPackages = [];

  for (const packageInfo of affectedPackages) {
    for (const versionRange of packageInfo.versions) {
      totalChecked++;
      console.log(colorize(`Checking: ${packageInfo.name} (${versionRange})`, 'yellow'));
      
      const result = checkPackageWithSemver(packageInfo.name, versionRange);
      
      if (result.found) {
        foundCount++;
        if (result.satisfies) {
          satisfiedCount++;
          console.log(colorize("✓ Affected", 'red'));
          const satisfiedInfo = `${packageInfo.name}@${result.installedVersion} (affected: ${versionRange})`;
          if (!satisfiedPackages.includes(satisfiedInfo)) {
            satisfiedPackages.push(satisfiedInfo);
          }
        } else {
          console.log(colorize("⚠ Found but version not affected", 'yellow'));
          const wrongVersionInfo = `${packageInfo.name}@${result.installedVersion} (affected: ${versionRange})`;
          if (!wrongVersionPackages.includes(wrongVersionInfo)) {
            wrongVersionPackages.push(wrongVersionInfo);
          }
        }
        console.log(colorize(`  Installed: ${result.installedVersion}`, 'gray'));
        console.log(colorize(`  Affected: ${versionRange}`, 'gray'));
      } else {
        console.log(colorize(`  ${result.output}`, 'gray'));
      }
      
      console.log(colorize("─".repeat(60), 'blue'));
    }
  }

  const summary = {
    totalChecked,
    foundCount,
    satisfiedCount,
    satisfiedPackages,
    wrongVersionPackages
  };

  printSummary(summary);
  printSatisfiedPackages(satisfiedPackages);
  printAffectedPackages(wrongVersionPackages);
}

module.exports = { checkAllAffectedPackages };