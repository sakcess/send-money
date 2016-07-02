var starter = angular.module('starter', []);

starter.service('contactsService', function($http) {
  this.contacts = [];
  $http.get('http://localhost:9001/contacts', function(result) {
    console.log(JSON.stringify(res));
  });
});


