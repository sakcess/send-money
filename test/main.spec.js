var assert = chai.assert;
var expect = chai.expect;

describe("The Starter App", function() {
  describe('The contacts service', function() {

    beforeEach(function() {
      module('starter');
      inject(function($injector) {
        contactsService = $injector.get('contactsService');
        $httpBackend    = $injector.get('$httpBackend');
      });
    });

    it('should have contacts propert, an array', function() {
      expect(contactsService.contacts).to.be.an('array');
    });

    it('should call the backend endpoint', function() {
        $httpBackend.expectGET('http://localhost:9001/contacts').respond(200);
        $httpBackend.flush();
    });

  });
});
