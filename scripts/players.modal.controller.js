angular.module('PlayersModule').controller('PlayersModalController',
    ['$uibModalInstance', function($uibModalInstance) {

        var vm = this;
        vm.addPlayer = addPlayer;
        vm.cancel = cancel;

        (function() {
        })();

        function addPlayer(){
            $uibModalInstance.close(vm.player);
        };
        function cancel(){
            $uibModalInstance.dismiss('cancel');
        };

}]);
