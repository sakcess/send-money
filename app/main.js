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


starter.filter('camelCase', function() {
  return function(name) {
    var type = typeof name;
    if (type !== 'string' && type !== 'number') throw new Error();
    return name.toString().split(" ").map(function(word) {
      return word[0].toUpperCase().concat(word.slice(1));
    }).join(" ");
  };
});
