# **MinifyAll CLI**

A simple package to minify your web **code**, _you will love its simplicity_!

With MinifyAll you will be able to minify **.html**, **.css**, **.json** and **.jsonc** directly from the CLI.
It also supports **minifying an entire directory recursively** (finding the available file extensions),
you could also change the **suffix** of the new minified file (by default "-min"),
toggle the minimization of **RGB**/**HEX** values, and _much more_! 

MinifyAll uses **regex** as its main and only minimization tool, that will lead to impressive minify times compared to other minifiers that deeply analyze the code.

Check the **[website](https://minifyall.jgracia.es/)** or the original **[VSCode extension](https://github.com/Josee9988/MinifyAll)**.

[![Version](https://badge.fury.io/js/%40josee9988%2Fminifyall.svg)](https://www.npmjs.com/package/@josee9988/minifyall)
[![Downloads](https://img.shields.io/npm/dt/@josee9988/minifyall.svg)](https://www.npmjs.com/package/@josee9988/minifyall)
[![License](https://img.shields.io/npm/l/@josee9988/minifyall.svg)](/LICENSE) 
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@josee9988/minifyall)](https://www.npmjs.com/package/@josee9988/minifyall)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@josee9988/minifyall/1.0.0)](https://www.npmjs.com/package/@josee9988/minifyall)

---

## **Languages available** 🧪🔥

- **HTML**
- **CSS**
- **JSON**
- **JSONC**

---

## **Installation**

  ### **Global installation**

```bash
npm i @josee9988/minifyall --save-dev # install the package globally
```

  ### **Package installation**
  
  ```bash
  npm i @josee9988/minifyall --save # install the package in your project
  ```

---

## **Usage**

  ### **CLI usage**
  
  **_minifyall --help_** will output:
  
  ```
MinifyAllCli v1.0.0

Usage: minifyall [file] [options]

Global options:

  -h, --help              Output usage information. (will ignore any other arguments)
  -v, --version           Output package version. (will ignore any other arguments)
  -m, --minify-hex                Will minify the hexadecimal color values. (default = false)
  -s, --suffix            The string of the suffix file. (default = "-min")
  -o, --output            The new output file (will ignore "--suffix" argument)
  -d, --dir               Will recursively look for HTML/CSS/JSON files inside a directory and will minify every one (will ignore "--output" argument)

Examples of use:
  minifyall --help
  minifyall --version
  minifyall myFile.css
  minifyall pathToMyFile/dirs/myFile.css
  minifyall myFile.css -m -s .min
  minifyall myFile.css --minify-hex -s -minified
  minifyall myFile.css --output someFolder/myNewFile.css
  minifyall --dir myFolder/

For more information visit: https://github.com/Josee9988/MinifyAllCli
  ```
  
  ### **Package usage**
  
  
---

## **Built with**

* [WebStorm](https://www.jetbrains.com/webstorm/)
* [TypeScript](https://www.typescriptlang.org/)
* [npm](https://www.npmjs.com/)
* [Github](https://github.com/Josee9988)

---

_Made with a lot of ❤️❤️ by **[@Josee9988](https://github.com/Josee9988)**_
