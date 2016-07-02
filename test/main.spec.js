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

});


