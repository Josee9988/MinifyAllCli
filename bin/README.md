# The **`bin/`** folder

This folder contains all the binaries or executables needed in the project.

---

## File: **`minifyall.js`**

The node.js executable of the CLI package.

### Development

It can be called from the terminal to **test the CLI application when you are developing**:
`node bin/minifyall.js`.
It will run the CLI project as if you had it installed locally on your machine.
Is used to test the command behaviour while developing the project.

### Production

If the app is distributed or in production mode (already built and locally installed via npm on your pc), 
it will be the _first file_ to receive the arguments and trigger the CLI command itself.
(when you use the CLI command it will call this file at first) 

---

## File: **`versionUpdater.sh`**

**Automatically** used when _pre-publishing_ the app in npm.

The main goal of this file is to update the version of the project found in the `package.json`
to the guide of the command (`--help` argument (how to use the command)).
