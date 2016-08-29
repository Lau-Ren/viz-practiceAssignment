angular.module('PlayersModule').controller('DeletePlayersModalController',
    ['$uibModalInstance', 'selectedPlayer', function($uibModalInstance, selectedPlayer) {

        var vm = this;
        vm.deletePlayer = deletePlayer;
        vm.cancel = cancel;

        (function() {
        })();

        function deletePlayer(){

            $uibModalInstance.close(vm.selectedPlayer);
        }
        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
}]);
