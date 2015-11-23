This is a prototype for the proposed [Typed CSSOM API](https://drafts.css-houdini.org/css-typed-om-1/).

The tests use the [Mocha framework](https://mochajs.org/) with [Chai asserts](http://chaijs.com/api/assert/). Other chai tools can be pulled in if needed.

To run the tests do
```
sudo apt-get install node
npm install -g mocha
npm install -g chai
```
Then open typed-om/test/runner.html in a web browser.

To use the code, put
```
<script src='typed-om/typed-om.js'></script>
```
in your HTML file.
