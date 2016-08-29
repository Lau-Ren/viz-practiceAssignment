angular.module('PlayersModule').controller('EditPlayersModalController',
    ['$uibModalInstance', 'selectedPlayer', function($uibModalInstance, selectedPlayer) {

        var vm = this;

        vm.playerSexes = [{
            'sex': 'male'
        },{
            'sex': 'female'
        }];

        vm.playerTiers = [
            {'tier': 'gold'},
            {'tier': 'silver' },
            {'tier': 'bronze'}
        ];

        vm.selectedPlayer = selectedPlayer || {};

        vm.addPlayer = addPlayer;
        vm.cancel = cancel;

        (function() {
        })();

        function addPlayer(){

            $uibModalInstance.close(vm.selectedPlayer);
        }
        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
}]);
