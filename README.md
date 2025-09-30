# NPM Breach Check

**Security-focused CLI tool to detect potentially vulnerable packages in your Node.js applications**

A lightweight command-line scanner that checks for known vulnerable packages in your dependency tree. Help protect your applications by identifying packages that may pose security risks.

## Quick Start

```bash
# Install globally
npm install -g @npm-breach/check

# Check your project for vulnerable packages
npm-breach-check
```

## Usage

```bash
# Scan all packages in your project (default)
npm-breach-check

# Check a specific package and version
npm-breach-check check-package lodash "^4.17.20"

# List all monitored packages  
npm-breach-check list

# Show help
npm-breach-check help
```

## Example Output

```
Summary:
  Total checked: 60
  Found: 12
  Affected versions: 1
  Used but not affected: 11
  Not used in the project: 48

Affected versions:
==================
  ✓ ansi-styles@2.2.1 (affected: 2.2.1)

Used but not affected:
======================
  ⚠ debug@2.6.9 (affected: 4.4.2)
  ⚠ chalk@1.1.3 (affected: 5.6.1)
  ⚠ supports-color@3.2.3 (affected: 10.2.1)
  ⚠ strip-ansi@3.0.1 (affected: 7.1.1)
  ⚠ ansi-regex@2.1.1 (affected: 6.2.1)
  ⚠ wrap-ansi@2.1.0 (affected: 9.0.1)
  ⚠ color-convert@1.9.3 (affected: 3.1.1)
  ⚠ color-name@1.1.4 (affected: 2.0.1)
  ⚠ is-arrayish@0.2.1 (affected: 0.3.3)
  ⚠ has-ansi@2.0.0 (affected: 6.0.1)
  ⚠ error-ex@1.3.4 (affected: 1.3.3)
```

- **Affected versions** - Vulnerable packages found (need immediate attention)
- **Used but not affected** - Packages installed but in safe versions
- **Not used in project** - Packages not installed (you're safe)

## Features

- **Zero Configuration** - Works out of the box
- **Lightweight** - Only one dependency (`semver`)
- **Fast Scanning** - Native Node.js performance
- **Semantic Versioning** - Supports version ranges (`^`, `~`, `>=`, etc.)
- **Dependency Tree Analysis** - Deep scanning with `npm ls`

## What It Checks

This tool monitors a curated list of packages known to have security considerations, including:

- Color manipulation packages (chalk, ansi-styles)
- Angular/React form utilities  
- File processing libraries
- Template engines
- And many more...

Run `npm-breach-check list` to see the complete monitored package list.

## Contributing

We welcome contributions to improve package security monitoring!

### Adding New Packages

To add a potentially vulnerable package to the monitoring list:

1. Fork this repository
2. Edit `affected-packages.json` 
3. Add your package with version constraints:
   ```json
   {
     "name": "package-name",
     "versions": ["^1.0.0", ">=2.1.0"]
   }
   ```
4. Submit a pull request with details about the security concern

### Development Setup

```bash
git clone https://github.com/your-username/npm-breach-check.git
cd npm-breach-check
npm install
npm link
```

## License

MIT © Contributors

---

**Help keep the Node.js ecosystem secure - contribute to the monitored package list!**