angular.module('PlayersModule')
    .directive('addPlayerButton', function(){
        return {
            restrict: 'E',
            controller : 'NewPlayerController',
            controllerAs: 'newPlayer',
            templateUrl: './views/button.html'
        };
    });
