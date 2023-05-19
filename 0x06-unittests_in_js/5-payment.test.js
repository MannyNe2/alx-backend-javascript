const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
  let uncleSam;

  beforeEach(() => {
    if (!uncleSam) {
      uncleSam = sinon.spy(console);
    }
  });

  afterEach(() => {
    uncleSam.log.resetHistory();
  });

  it('sendPaymentRequestToApi(100, 20) logs "The total is: 120"', () => {
    sendPaymentRequestToApi(100, 20);
    expect(uncleSam.log.calledWith('The total is: 120')).to.be.true;
    expect(uncleSam.log.calledOnce).to.be.true;
  });

  it('sendPaymentRequestToApi(10, 10) logs "The total is: 20"', () => {
    sendPaymentRequestToApi(10, 10);
    expect(uncleSam.log.calledWith('The total is: 20')).to.be.true;
    expect(uncleSam.log.calledOnce).to.be.true;
  });
});
