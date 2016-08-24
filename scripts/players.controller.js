angular.module('PlayersModule').controller('PlayersController',
    ['PlayersService','$uibModal', '$log', function(PlayersService, $uibModal, $log) {

    var vm = this;

    vm.players = [];

    vm.playerCount = 0;
    vm.propertyName = 'id'
    vm.reverse = true;

    vm.loadPlayerData = loadPlayerData;
    vm.openModal = openModal;
    vm.sortBy = sortBy;

    (function() {

        vm.loadPlayerData();

    })();

    function loadPlayerData(){
        PlayersService.getData()
            .then(function(res){
                vm.players = res.data.people;
                vm.playerCount = vm.players[vm.players.length-1].id;
            });
    };

    function sortBy(formProp){
        vm.reverse = (vm.propertyName === formProp) ? !vm.reverse : false;
        vm.propertyName = formProp

    };

    function openModal(){
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/modalContent.html',
            controller: 'PlayersModalController',
            controllerAs: 'vm',
            resolve: {
                players: function () {
                    return vm.players;
                }
            }
        });

        modalInstance.result.then(function (newPlayer){
            vm.playerCount++;
            newPlayer.id = vm.playerCount; //bad way of doing this!

            vm.players.push(newPlayer)

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


}]);
