var assert = chai.assert;
var expect = chai.expect;

describe("The Starter App", function() {
  describe('The contacts service', function() {
    it('should have contacts propert, an array', function() {

      module('starter');
      inject(function($injector) {
        contactsService = $injector.get('contactsService');
      });

      expect(contactsService.contacts).to.be.an('array');

    });
  });
});
