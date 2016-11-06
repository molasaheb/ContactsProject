angular.module('contactsApp',['ngRoute', 'ngResource'])

.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
        controller: 'ListController',
        templateUrl: 'views/list.html'
    });
    
    $locationProvider.html5Mode(true);
});