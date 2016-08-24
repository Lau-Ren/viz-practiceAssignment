angular.module('PlayersModule').controller('NewPlayerController', function($uibModal){

    this.addBtnClicked = false;
    this.click = function(){

        var formInstance = $uibModal.open({
            templateUrl: './views/form.html',

        });

        this.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        this.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        // if(this.addBtnClicked){
        //     this.addBtnClicked = false
        // } else {
        //     this.addBtnClicked = true
        // }

    };

});