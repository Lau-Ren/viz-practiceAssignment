angular.module('PlayersModule').controller('PlayersController',
    ['PlayersService','$uibModal', '$log', function(PlayersService, $uibModal, $log) {

    var vm = this;
    vm.players = [];
    vm.playerCount = 0;
    vm.propertyName = 'id'
    vm.reverse = true;
    vm.selectedPlayer = {}
    vm.editedPlayer = {}
    vm.loadPlayerData = loadPlayerData;
    vm.openAddPlayersModal = openAddPlayersModal;
    vm.openEditPlayersModal = openEditPlayersModal;
    vm.sortBy = sortBy;
    vm.selectPlayer = selectPlayer;

    (function() {
        vm.loadPlayerData();
    })();

    function selectPlayer(currentPlayerId){
      vm.players.forEach(function(player){
            if(player.id === currentPlayerId) {
                vm.selectedPlayer =  player;
                player.selected =  player.selected === true ? false : true
            } else {
                player.selected = false
            }
        });
    }

    function loadPlayerData(){
        PlayersService.getData()
            .then(function(res){
                vm.players = res.data.people;
                vm.playerCount = vm.players[vm.players.length-1].id;
            });
    }

    function sortBy(formProp){
        vm.reverse = (vm.propertyName === formProp) ? !vm.reverse : false;
        vm.propertyName = formProp

    }

    // --ADD PLAYER--

    function openAddPlayersModal(){
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/addPlayer.modalContent.html',
            controller: 'AddPlayersModalController',
            controllerAs: 'vm',
            resolve: {
                selectedPlayer: function () {
                    return vm.selectedPlayer;
                } //this does nothing, but wont work without it?
            }
        });

        modalInstance.result
            .then(function (newPlayer){
                vm.playerCount++;
                newPlayer.id = vm.playerCount;
                newPlayer.sex = newPlayer.sex.sex
                newPlayer.tier = newPlayer.tier.tier
                vm.players.push(newPlayer)
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
            templateUrl: 'views/editPlayer.modalContent.html',
            controller: 'EditPlayersModalController',
            controllerAs: 'vm',
            resolve: {
                selectedPlayer: function () {
                    return vm.selectedPlayer;
                }
            }
        });

        modalInstance.result
        // if(editedPlayer[prop] !== selectedPlayer[prop])
            .then(function (editedPlayer){
                console.log(editedPlayer);
                editedPlayer.sex = editedPlayer.sex
                var index = vm.players.indexOf(selectedPlayer)
                vm.players[index] = editedPlayer

console.log(editedPlayer.sex, selectedPlayer.sex, "-------")
                // vm.players.push(editedPlayer)
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
    }
}]);
