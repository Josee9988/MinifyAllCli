# **Change Log** 📜📝

All notable changes to the "**MinifyAll**" CLI tool/package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [**1.1.2**] - 2020-05-21

### Changed

* Suffix argument changes its default value from "-min" to "" (blank string).

## [**1.1.1**] - 2020-05-21

### Added

* Windows support in reading / creating files.
* DeepScan badge.
* Github workflow actions to test on CI (windows, macOs and ubuntu with node versions 13.x and 14.x).
* Github workflow badge.
* Stale bot and configuration in the .github/ directory.
* Issue templates.
* package json script to remove the dist folder without outputting errors.
* Contribution description in the readme.md file.

### Removed

* Unnecessary await keyword in the fileControler test file.
* License badge.
* Excluded *.d.ts in the tsconfig file.

### Fixed

* Some typos in the changelog.md file.
* Unused await keyword in the fileController test.
* Package json scripts that didn't output error.

## [**1.1.0**] - 2020-05-18

### Added

* TypeScript typings.

### Fixed

* Import of the module, from: `import {MinifyAllClass} from '@josee9988/minifyall/dist/index.js';` to `import { MinifyAllClass } from '@josee9988/minifyall';`

## [Published]

## [**1.0.0**] - 2020-05-15

### Added

* Version 1.0.0, minifier works with HTML, CSS, JSON and JSONC.
