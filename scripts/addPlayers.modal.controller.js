angular.module('PlayersModule').controller('AddPlayersModalController',
    ['$uibModalInstance', 'selectedPlayer', function($uibModalInstance, selectedPlayer) {

        var vm = this;

        vm.playerSexes = [{
            'sex': 'male'
        },{

            'sex': 'female'
        }];
        vm.playerTiers = [
            {'tier': 'gold'},
            {'tier': 'bronze'},
            {'tier': 'silver' }
        ];

        vm.addPlayer = addPlayer;
        vm.cancel = cancel;

        (function() {

                console.log('selected', vm.selectedSex);

        })();

        function addPlayer(){

            $uibModalInstance.close(vm.player);
        }
        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
}]);
