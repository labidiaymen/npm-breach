const fs = require('fs');
const path = require('path');
const { colorize } = require('../utils/colors');

function loadAffectedPackages() {
  try {
    const jsonPath = path.join(__dirname, '..', '..', 'affected-packages.json');
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const config = JSON.parse(jsonContent);
    return config.packages;
  } catch (error) {
    console.error(colorize('Error loading affected-packages.json:', 'red'), error);
    return [];
  }
}

module.exports = { loadAffectedPackages };