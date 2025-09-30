const { execSync } = require('child_process');
const semver = require('semver');

function getInstalledPackageInfo(packageName) {
  try {
    const output = execSync(`npm ls ${packageName} --json`, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    const data = JSON.parse(output);
    
    // Navigate through the dependency tree to find the package
    function findPackage(deps, name) {
      if (!deps) return null;
      
      if (deps[name]) {
        return {
          version: deps[name].version,
          path: deps[name].path || ''
        };
      }
      
      // Search in nested dependencies
      for (const depName in deps) {
        const found = findPackage(deps[depName].dependencies, name);
        if (found) return found;
      }
      
      return null;
    }
    
    return findPackage(data.dependencies, packageName);
  } catch (error) {
    return null;
  }
}

function checkPackageWithSemver(packageName, versionRange) {
  const installedPkg = getInstalledPackageInfo(packageName);
  
  if (!installedPkg) {
    return { 
      found: false, 
      output: `Package ${packageName} not found in dependency tree` 
    };
  }
  
  const satisfies = semver.satisfies(installedPkg.version, versionRange);
  
  return {
    found: true,
    installedVersion: installedPkg.version,
    satisfies,
    output: `Found ${packageName}@${installedPkg.version} ${satisfies ? '✓' : '✗'} (${satisfies ? 'satisfies' : 'does not satisfy'} ${versionRange})`
  };
}

module.exports = { getInstalledPackageInfo, checkPackageWithSemver };