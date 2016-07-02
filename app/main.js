var starter = angular.module('starter', []);

starter.service('ContactsService', function($http) {

  var ContactsService = this;
  ContactsService.contacts = [];

  $http.get('http://localhost:9001/contacts')
    .then(function(res) {
      console.log(res);
      while (res.data[0]) {
        ContactsService.contacts.push(res.data.pop());
      }
    }, function(error) {
      console.log('Express service returned 0 contacts');
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

starter.directive('avatar', function() {

  return {
    scope: {
      name: '=',
    },
    restrict: 'AE',
    template: "<span class='avatar'>{{name[0] | camelCase}}</span>",
  };
});
