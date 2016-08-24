angular.module('PlayersModule')
    .directive('newPlayerForm', function(){
        return {
            restrict: 'E',
            controller : 'NewPlayerController',
            controllerAs: 'newPlayer',
            templateUrl: './views/form.html'
        };
    });
/**
 * Created by collsl on 24/08/2016.
 */
