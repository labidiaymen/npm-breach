const { loadAffectedPackages } = require('../core/packageLoader');
const { colorize } = require('../utils/colors');

function listPackages() {
  const affectedPackages = loadAffectedPackages();
  
  if (affectedPackages.length === 0) {
    console.log(colorize("No packages loaded from affected-packages.json", 'red'));
    return;
  }

  console.log(colorize("Affected packages:", 'blue'));
  console.log(colorize("=================", 'blue'));
  
  for (const packageInfo of affectedPackages) {
    console.log(colorize(`${packageInfo.name}`, 'green'));
    for (const version of packageInfo.versions) {
      console.log(colorize(`  └─ ${version}`, 'gray'));
    }
  }
  
  const totalVersions = affectedPackages.reduce((acc, pkg) => acc + pkg.versions.length, 0);
  console.log(colorize(`\nTotal: ${affectedPackages.length} packages with ${totalVersions} versions`, 'cyan'));
}

module.exports = { listPackages };