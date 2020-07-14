#!/usr/bin/env bash

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

