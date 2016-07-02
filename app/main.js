var starter = angular.module('starter', []);

starter.service('ContactsService', function($http) {

  var ContactService = this;
  ContactService.contacts = [];

  $http.get('http://localhost:9001/contacts')
    .then(function(res) {
      console.log(res);
      while (res.data[0]) {
        ContactService.contacts.push(res.data.pop());
      }
    }, function(error) {
      console.log(error);
    });
});


starter.controller('ContactController', function($scope, ContactsService) {
  $scope.contacts = ContactsService.contacts;
});
