# parse-changelog

Pure-Javascript ChangeLog parser to extract changes for each versions. Currently only supporting ChangeLogs writen using Markdown.

### Usage

Install the node module using:

```
$ npm i parse-changelog
```

And parse your changelog using:

```js
var fs = require('fs');
var parseChangelog = require('parse-changelog');

var changelog = parseChangelog(fs.readFileSync('CHANGES.md'));

> {
    title: "Release notes",
    intro: "All notable changes to this project will be documented in this file.",
    versions: [
        {
            tag: "1.0.0",
            rawNote: "* Fix bug with parser\n* Fix bug at login",
            changes: [
                "Fix bug with parser",
                "Fix bug at login"
            ]
        }
    ]
}

```
