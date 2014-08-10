# Urine

<img src="http://media.giphy.com/media/4aDF1EDU8Z6aA/giphy.gif" alt="Urine" align="right" width=280/>

[![Master branch build status][ico-build]][travis]
[![Published version][ico-package]][npm]
[![MIT Licensed][ico-license]][license]

### `$ npm install urine -g`

This library provides a simple CLI and a JavaScript API for sampling data from
a stream or file for testing or limiting data consumption. It can be installed
in whichever way you prefer, but I recommend [NPM][npm].

## Documentation
Typical usage is from the command line with the `urine` command. To get help or
usage information, try `urine -h`. Some contrived examples of using the command
are shown below.
```bash
# Sample the input.txt file, splitting around newlines with a probability of 0.1
$ urine -p 0.1 input.txt

# Sample the input.txt file, splitting around commas with a probability of 0.9
$ urine -p .9 -s ',' input.txt

# Sample the input.txt file, splitting around colons or semicolons with a probability of 0.75
$ urine -p .75 -s '[:;]' input.txt

# Sample the input.txt file through stdin with a probability of 0.001
$ cat input.txt | urine -p 0.001

# Sample the syslog file through stdin with a probability of 0.1
# Note that `tail` keeps the stream open, as will `urine`
$ tail -f /var/log/syslog | urine -p .1

# Sample the syslog file, grepping for "myapp" with a probability of 0.5
$ tail -f /var/log/syslog | grep --line-buffered 'myapp' | urine -p .5

# Sample output from a stream of `date` output with a probability of 0.1
$ while true; do date; sleep 1; done | urine -p .1
```

There's also a public JavaScript API for working with streams inside your
application.
```js
var urine = require('urine');
var fs = require('fs');

var stdout = process.stdout;
var stream = fs.createReadStream('input.txt');

urine(stream, stdout, {
    probability: 0.1,
    split: /\r\n/
});
```

## Contributing
I accept contributions to the source via Pull Request, but passing unit tests
must be included before it will be considered for merge.
```bash
$ curl -O https://raw.githubusercontent.com/adlawson/vagrantfiles/master/nodejs/Vagrantfile
$ vagrant up
$ vagrant ssh
$ cd /srv

$ npm test
```

### License
The content of this library is released under the **MIT License** by
**Andrew Lawson**.<br/> You can find a copy of this license in
[`LICENSE`][license] or at http://www.opensource.org/licenses/mit.

<!-- Links -->
[npm]: https://npmjs.org/package/urine
[travis]: https://travis-ci.org/adlawson/urine.js
[ico-license]: http://img.shields.io/npm/l/urine.svg?style=flat
[ico-package]: http://img.shields.io/npm/v/urine.svg?style=flat
[ico-build]: http://img.shields.io/travis/adlawson/urine.js/master.svg?style=flat
[license]: /LICENSE
