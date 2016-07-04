var starter = angular.module('starter', ['ui.bootstrap', 'ui.router', 'facebook']);

starter.config(function($stateProvider, $urlRouterProvider, FacebookProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "home/home.tpl.html",
            controller: 'SendMoneyController'
        })
        .state('signIn', {
            url: "/signIn",
            templateUrl: "signIn/signIn.tpl.html",
            controller: 'SignInPageController'
        })
        .state('receiver-info-page', {
            url: "/receiver-info-page",
            templateUrl: "receiver-info-page/receiver-info-page.tpl.html",
            controller: 'ReceiverInfoController'
        })
        .state('payment-screen', {
            url: "/payment-screen",
            templateUrl: "payment-screen/payment-screen.tpl.html",
            controller: 'PaymentController'
        });

    var appID = '589867271151840';
    FacebookProvider.init(appID);
});


starter.controller('SendMoneyController', function($scope, $state, ForeignExchangeService) {

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    ForeignExchangeService.getRates().then(
        function(res) {
            console.log('Base Currency: ' + res.base);
            $scope.rates = res.rates;
            console.log($scope.rates);

            $scope.fromType = $scope.rates.AUD;
            $scope.toType = $scope.rates.INR;

            // $scope.doConvert();
        },
        function(error) {
            console.log('Error: ' + error);
        });

    function updateInfo() {
        $scope.exchangeRate = ($scope.toType * (1 / $scope.fromType)).toFixed(4);
        $scope.fromCurrency = getKeyByValue($scope.rates, $scope.fromType);
        $scope.toCurrency = getKeyByValue($scope.rates, $scope.toType);
    }

    $scope.doConvertTo = function() {
        updateInfo();
        var amount = $scope.fromValue * $scope.exchangeRate;
        $scope.toValue = amount.toFixed(2);

    };

    $scope.doConvertFrom = function() {
        updateInfo();
        var amount = $scope.toValue / $scope.exchangeRate;
        $scope.fromValue = amount.toFixed(2);
    };

    $scope.signIn = function() {
        $state.go('signIn');
    }
});

starter.controller('SignInPageController', function($scope, $state, Facebook) {
    $scope.user = {};
    //improvement -- can check login status first and then do the login if required
    $scope.FBLogin = function() {
        // From now on you can use the Facebook service just as Facebook api says
        Facebook.login(function(response) {
            console.log(response); // Do something with response.
            $scope.connectionStatus = response.status;
            if ($scope.connectionStatus === 'connected') {
                Facebook.api('/me', function(response) {
                    $scope.user = response;
                    console.log(response);
                });
            }
        });
    };

    $scope.proceedToEnterReceiverInfo = function() {
        $state.go('receiver-info-page');
    }

    $scope.goToHomePage = function() {
        $state.go('home');
    }
});

starter.controller('ReceiverInfoController', function($scope, $state, Facebook) {
    $scope.ContinueToPaymentScreen = function() {
        $state.go('payment-screen');
    }

    $scope.goToLoginScreen = function() {
        $state.go('signIn');
    }
});

starter.controller('PaymentController', function($scope, $state, Facebook) {
    $scope.goBack = function() {
        $state.go('receiver-info-page');
    }
});


starter.factory('FacebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});

starter.service('ForeignExchangeService', function($http, $q) {

    var foreignExchange = this;
    foreignExchange.rates = {};

    //Assuming base curreny as USD
    foreignExchange.getRates = function() {
        var deferred = $q.defer();
        $http.get('http://api.fixer.io/latest')
            .then(function(res) {
                foreignExchange.rates = res.data;
                deferred.resolve(foreignExchange.rates);
            }, function(error) {
                deferred.reject('Foreign Exchange Service is not responding.');
                console.log('Foreign Exchange Service is not responding.');
            });
        return deferred.promise;
    }
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
