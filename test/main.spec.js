var assert = chai.assert;
var expect = chai.expect;

describe("The Starter App", function() {
  describe('The contacts service', function() {

    beforeEach(function() {
      module('starter');
      inject(function($injector) {
        ContactsService = $injector.get('ContactsService');
        $httpBackend    = $injector.get('$httpBackend');
      });
    });

    it('should have contacts propert, an array', function() {
      expect(ContactsService.contacts).to.be.an('array');
    });

    it('should call the backend endpoint', function() {
        $httpBackend.expectGET('http://localhost:9001/contacts').respond(200, []);
        $httpBackend.flush();
    });

  });

  describe('The Contact Controller', function() {

    beforeEach(function() {
      module('starter');
      inject(function($injector, $rootScope) {
        $scope          = $rootScope.$new();
        ContactsService = $injector.get('ContactsService');
        $httpBackend    = $injector.get('$httpBackend');
        $controller     = $injector.get('$controller');
      });
    });

    it('it should store an array of contacts in scope', function() {
        $controller('ContactController', {
          $scope            : $scope,
          ContactsService   : ContactsService
        });
        assert.isArray($scope.contacts);
    });
  });

  describe('The CamelCase Controller', function() {

    beforeEach(function() {
      module('starter');
      inject(function($injector) {
        camelCase         = $injector.get('$filter')('camelCase');
      });
    });

    it('it should camel case a String', function() {
        expect(camelCase('nav sandhu')).to.equal('Nav Sandhu');
        expect(camelCase('satish kris')).to.equal('Satish Kris');
    });

    it('it should take a number and return as a String', function() {
        expect(camelCase(123)).to.equal('123');
    });

    it('it should throw an error when input is not a string or number', function() {
        assert.throws(function() {
          camelCase(undefined);
        });
    });
  });

});


