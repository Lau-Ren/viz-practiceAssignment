angular.module('PlayersModule')
    .directive('playersTable', function(){
        return {
            restrict: 'E',
            controller: 'PlayersController',
            controllerAs: 'players',
            templateUrl: './views/players.html'
        };
    });
