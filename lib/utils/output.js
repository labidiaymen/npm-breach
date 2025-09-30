const { colorize } = require('./colors');

function printHeader() {
  console.log(colorize("Checking affected npm packages:", 'blue'));
  console.log(colorize("===============================================================", 'blue'));
}

function printSummary(summary) {
  console.log(colorize(`\nSummary:`, 'cyan'));
  console.log(colorize(`  Total checked: ${summary.totalChecked}`, 'cyan'));
  console.log(colorize(`  Found: ${summary.foundCount}`, 'cyan'));
  console.log(colorize(`  Affected versions: ${summary.satisfiedCount}`, 'red'));
  console.log(colorize(`  Used but not affected: ${summary.foundCount - summary.satisfiedCount}`, 'gray'));
//   console.log(colorize(`  Not used in the project: ${summary.totalChecked - summary.foundCount}`, 'green'));
}

function printSatisfiedPackages(packages) {
  if (packages.length > 0) {
    console.log(colorize(`\nAffected versions:`, 'red'));
    console.log(colorize("==================", 'red'));
    for (const pkg of packages) {
      console.log(colorize(`  ✓ ${pkg}`, 'red'));
    }
  }
}

function printAffectedPackages(packages) {
  if (packages.length > 0) {
    console.log(colorize(`\nUsed but not affected:`, 'gray'));
    console.log(colorize("======================", 'gray'));
    for (const pkg of packages) {
      console.log(colorize(`  ⚠ ${pkg}`, 'gray'));
    }
  }
}

module.exports = { printHeader, printSummary, printSatisfiedPackages, printAffectedPackages };