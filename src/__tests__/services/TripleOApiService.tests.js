import when from 'when';
const TripleOApiService = require('../../js/services/TripleOApiService.js');

describe('TripleOApiService', () => {

  xdescribe('.createPlan(name, files)', () => {
    let result;

    beforeEach(done => {
      when(TripleOApiService.createPlan('foo', []).then(res => {
        result = res;
        done();
      }));
    });

    it('returns a promise that resolves with the status message', () => {
      console.log(result);
      expect(result).toBe('add status message of http request');
    });
  });

  xdescribe('.getPlans()', () => {
    let result;

    beforeEach(done => {
      when(TripleOApiService.getPlans().then(res => {
        result = res;
        done();
      }));
    });

    it('returns a promise that resolves with a result array of plan names.', () => {
      console.log(result);
      expect(typeof(result.length)).toBe('number');
    });

  });

  xdescribe('.getPlan(name)', () => {
    let result;

    beforeEach(done => {
      when(TripleOApiService.getPlan('overcloud').then(res => {
        result = res;
        done();
      }));
    });

    it('returns a promise that resolves with an array of plan files', () => {
      expect(typeof(result.length)).toBe('number');
    });
  });

});
