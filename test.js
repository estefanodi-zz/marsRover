const assert    = require('assert');
var controllers = require('./controllers.js');

//===========================================================================
//===================== CHECK PLATEAU SIZE VALUE ============================
//===========================================================================
it('it checks if both values are provided', () => {
  assert.equal(controllers.checkPlateauCords(undefined, undefined), 'Both values are required');
});

it('it checks if first value is equal to second value', () => {
  assert.equal(controllers.checkPlateauCords(5, 7), 'First value must be equal as second value');
});

it('it checks if both values are numbers', () => {
  assert.equal(controllers.checkPlateauCords('string','string'), 'Both values must be numbers');
});

it('it checks if both values are numbers', () => {
  assert.equal(controllers.checkPlateauCords(10,10), 'Maximum value is 9');
});

it('it checks if both values are numbers', () => {
  assert.equal(controllers.checkPlateauCords(3,3), 'Minimum value is 5');
});

it('it checks if provided values are correct', () => {
  assert.equal(controllers.checkPlateauCords(7,7), 'Ok!');
});

//===========================================================================
//===================== CHECK STARTING POINT ================================
//===========================================================================

it('it checks if provided values are greater than plateau size', () => {
  assert.equal(controllers.checkStartingPoint(3, 2, 3, 2), 'Please provide numbers lower than plateau coords');
});

it('it checks if provided values are numbers', () => {
  assert.equal(controllers.checkStartingPoint('string', 'string'), 'Please provide numbers as the first two values');
});

it('it checks if provided cardinal direction is correct', () => {
  assert.equal(controllers.checkStartingPoint(1,1,'abc'), 'Please provide a valid cardinal direction as third value');
});

it('it checks if provided cardinal direction is correct', () => {
  assert.equal(controllers.checkStartingPoint(1,2,'R'), 'Please provide a valid cardinal direction as third value');
});

it('it checks if provided values are correct', () => {
  assert.equal(controllers.checkStartingPoint(7,7,'N'), 'Ok!');
});

//===========================================================================
//===================== CHECK MOVEMENTS =====================================
//===========================================================================

it('it checks if function parameter is not an empty array', () => {
  assert.equal(controllers.checkMovements([]), 'Please enter directions');
});

it('it checks if provided values are correct', () => {
  assert.equal(controllers.checkMovements('B'), 'Please set movements using only L,R,M');
});

it('it checks if everything is correct', () => {
  assert.equal(controllers.checkMovements(['M','L','R']), 'Ok!');
});