'use strict';
angular.module('PlayersModule').controller('DeletePlayersModalController',
    ['$uibModalInstance', function($uibModalInstance) {

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
