'use strict';
angular.module('PlayersModule').controller('PlayersController',
    ['PlayersService','$uibModal', '$log', '$q', function(PlayersService, $uibModal, $log, $q) {

    var vm = this;
    vm.players = [];
    vm.playerCount = 0;
    vm.propertyName = 'id';
    vm.reverse = true;
    vm.selectedPlayer = {};
    vm.editedPlayer = {};
    vm.categories = ['male', 'female', 'bronze', 'gold', 'silver'];
    vm.currentCategory = undefined;


    vm.initialisePlayers = initialisePlayers;
    vm.openDeletePlayersModal = openDeletePlayersModal;
    vm.openAddPlayersModal = openAddPlayersModal;
    vm.openEditPlayersModal = openEditPlayersModal;
    vm.sortBy = sortBy;
    vm.selectPlayer = selectPlayer;
    vm.getPlayerData = getPlayerData;
    vm.setCurrentCategory = setCurrentCategory;
    vm.myFilter = myFilter;

    (function() {
        initialisePlayers();
    })();

    function setCurrentCategory(category){
        vm.currentCategory = category;
    }
    function myFilter(item) {
        console.log(item);
        return item === 'red' || item === 'blue';
    }
    function initialisePlayers() {
        vm.getPlayerData()
            .then(function (res) {
                vm.players = res.data.people;
                vm.playerCount = vm.players[vm.players.length - 1].id;
                return 'returning something for the sake of chaining';
            })
            .then(function(myPointlessString){
                return myPointlessString + ', oh hi, ';
            })
            .then(function(anotherString){
                console.log(anotherString, 'promises yay');
            })
            .catch(function(err){
                console.log(err, 'error');
            });
    }

    function getPlayerData(){
        return $q(function(resolve, reject){
           var data = PlayersService.getData();
            if(data){
                resolve(data);
            }else{
                reject('error getting player data');
            }
        });
    }

    function selectPlayer(currentPlayerId){
      vm.players.forEach(function(player){
            if(player.id === currentPlayerId) {
                vm.selectedPlayer =  player;
                player.selected =  player.selected === true ? false : true;
            } else {
                player.selected = false;
            }
        });
    }

    function sortBy(formProp){
        vm.reverse = (vm.propertyName === formProp) ? !vm.reverse : false;
        vm.propertyName = formProp;
    }

    // --ADD PLAYER--
    function openAddPlayersModal(){
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../views/addPlayer.modalContent.html',
            controller: 'AddPlayersModalController',
            controllerAs: 'vm',
            resolve: {
                selectedPlayer: function () {
                    return vm.selectedPlayer;
                }
            }
        });

        modalInstance.result
            .then(function (newPlayer){
                vm.playerCount++;
                newPlayer.id = vm.playerCount;
                newPlayer.sex = newPlayer.sex.sex;
                newPlayer.tier = newPlayer.tier.tier;
                vm.players.push(newPlayer);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    }

    // --EDIT PLAYER--
    function openEditPlayersModal(selectedPlayer){
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../views/editPlayer.modalContent.html',
            controller: 'EditPlayersModalController',
            controllerAs: 'vm',
            resolve: {
                selectedPlayer: function () {
                    return vm.selectedPlayer;
                }
            }
        });

        modalInstance.result
            .then(function (editedPlayer){
                editedPlayer.sex = editedPlayer.sex;
                var index = vm.players.indexOf(selectedPlayer);
                vm.players[index] = editedPlayer;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    }

    // --DELETE PLAYER--
    function openDeletePlayersModal(selectedPlayer){
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../views/deletePlayer.modalContent.html',
            controller: 'DeletePlayersModalController',
            controllerAs: 'vm',
            resolve: {
                selectedPlayer: function () {
                    return vm.selectedPlayer;
                }
            }
        });

        modalInstance.result
            .then(function (){
                var index = vm.players.indexOf(selectedPlayer);
                vm.players.splice(index,1);

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    }
}]);
