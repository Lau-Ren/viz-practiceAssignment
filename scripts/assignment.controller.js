angular.module('PlayersModule').controller('PlayersController', ['PlayersService',function(PlayersService){
    var playerData = this;
    playerData.players = [];

    PlayersService.getData().then(function(res){
        playerData.players = res.data.people;
    });

}]);
