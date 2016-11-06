angular.module('contactsApp')
    .factory('Contact', function ($resource) {
        return $resource('/api/contact/:id', {userId: '@id'}, {
            'update': {method: 'PUT'}
        })
    });