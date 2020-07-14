#!/usr/bin/env bash

#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#
# SCRIPT:        versionUpdater.sh
# USAGE:         bash versionUpdater.sh | ./versionUpdater.sh
# PURPOSE:       Shell script that finds the actual version, and replaces the old version from the comments of the
#                help argument to match the actual one.
# TITLE:         versionUpdater.sh
# AUTHOR:        Jose Gracia
# VERSION:       1.1.3
# NOTES:         This script is automatically called by npm. THere is no need to manually run it.
# BASH_VERSION:  5.0.16(1)-release
# LICENSE:       see in ../LICENSE (project root) or https://github.com/Josee9988/MinifyAllCli/blob/master/LICENSE
# GITHUB:        https://github.com/Josee9988/
# REPOSITORY:    https://github.com/Josee9988/MinifyAllCli
# ISSUES:        https://github.com/Josee9988/MinifyAllCli/issues
# MAIL:          jgracia9988@gmail.com
#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#~#

# the actual version that needs to be updated with the new package version
VERSION_TO_UPDATE=$(cat src/cli/informationCLI.ts \
  | grep -o -m 1 -h "[0-9]*\.[0-9]*\.[0-9]*" \
  | head -1)

# obtains the package version from the package.json file.
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",\t ]//g')

# replaces the outdated version to the new version from the informationCLI.ts and README.md file.
sed -i -e "s/$VERSION_TO_UPDATE/$PACKAGE_VERSION/g" src/cli/informationCLI.ts
sed -i -e "s/$VERSION_TO_UPDATE/$PACKAGE_VERSION/g" README.md
