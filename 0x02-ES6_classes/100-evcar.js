import Car from './10-car';

export default class EVCar extends Car {
  constructor(_brand, _motor, _color, _range) {
    super(_brand, _motor, _color);
    this._range = _range;
  }

  get range() {
    return this._range;
  }

  set range(value) {
    this._range = value;
  }

  cloneCar() {
    const Species = super.constructor[Symbol.species];

    return new Species();
  }
}
