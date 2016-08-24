'use strict';
angular.module('PlayersModule').factory('PlayersService', ['$http', function($http){

        return {
            getData: getData
        };

        function getData(){
          return  $http.get('./data/data.json');
        }
    }]);

