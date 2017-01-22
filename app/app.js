
;(function() {


  /*
    Definition of the main app module and its dependencies
   */

  angular
    .module('boilerplate', [
      'ngRoute',
      'ngDraggable',
      'ngAnimate',
      'ui.bootstrap'



    ])
    .config(config);

  // safe dependency injection

  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /*
    App routing

   */

  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/quiz', {
        templateUrl: 'views/quiz.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
