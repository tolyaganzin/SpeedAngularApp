(() => {

'use strict';
angular
    .module('app', [
      'ngStorage',
      'ui.router'
    ]);

  angular
      .module('app')
      .config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function routes($stateProvider, $urlRouterProvider, $locationProvider) {
      // html5 routes
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/main");

      $stateProvider
          .state('main', {
              url: '/main',
              templateUrl: '/views/mainView.html',
              controller: 'MainController as main'
          })
          .state('edit', {
              url: '/edit/:index',
              templateUrl: '/views/editView.html',
              controller: 'MainController as main'
          });
  }

})();
