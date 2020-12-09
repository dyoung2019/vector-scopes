const Benchmark = require('benchmark')
const func1 = require('./neueRgbToUv')
const func2 = require('./rgbToUvy')
const func3 = require('./altRgbToUv')

var suite = new Benchmark.Suite;

// add tests
suite.add('neueRgbToUv', function() {
  func1(255, 0, 0)
  func1(0, 255, 0)
  func1(0, 0, 255)
})
.add('rgbToUvy', function() {
  func2(255, 0, 0)
  func2(0, 255, 0)
  func2(0, 0, 255)
})
.add('altRgbToUv', function() {
  func3(255, 0, 0)
  func3(0, 255, 0)
  func3(0, 0, 255)
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });