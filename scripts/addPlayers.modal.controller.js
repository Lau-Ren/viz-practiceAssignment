'use strict';
angular.module('PlayersModule').controller('AddPlayersModalController',
    ['$uibModalInstance', function($uibModalInstance) {

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



        })();

        function addPlayer(){

            $uibModalInstance.close(vm.player);
        }
        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
}]);
