'use strict';
describe('controller tests', function () {

    describe('PlayersController ', function () {
        var PlayersController, scope, PlayersService,$uibModal, $log;

        var players = [
            {
                "id":1,
                "first_name":"fakeperson1",
                "surname":"Redwood",
                "sex": "female",
                "tier": "silver",
                "email": "fred@gmail.com"
            },{
                "id":2,
                "first_name":"fakeperson2",
                "surname":"Banforth",
                "sex": "male",
                "tier": "gold",
                "email": "Trevor@gmail.com"
            }
        ];




        beforeEach(module('PlayersModule'));

        beforeEach(inject(function ($controller, $rootScope, _PlayersService_, _$uibModal_, _$log_) {

            scope  = $rootScope.$new();

            PlayersService = _PlayersService_;
            $uibModal = _$uibModal_;
            $log = _$log_;



            PlayersController = $controller('PlayersController', {
                $scope: scope,
                PlayersService:PlayersService,
                $uibModal:$uibModal,
                $log:$log

            });

            spyOn(PlayersService, 'getData').and.returnValue(players);


        }));

        it('should select player', function() {

            // players loaded
            PlayersController.players = players


            //second player clicked
            PlayersController.selectPlayer(PlayersController.players[1].id );
            expect(PlayersController.selectedPlayer).toEqual(PlayersController.players[1]);

            //first player clicked
            PlayersController.selectPlayer(PlayersController.players[0].id );
            expect(PlayersController.selectedPlayer).toEqual(PlayersController.players[0]);
        });


        it('should sort by col category', function() {

            PlayersController.reverse = true;
            PlayersController.propertyName = 'id';

            //surname col clicked
            PlayersController.sortBy('surname');

            expect(PlayersController.propertyName).toEqual('surname');
            expect(PlayersController.reverse).toEqual(false);

            //reset values
            PlayersController.reverse = true;
            PlayersController.propertyName = 'id';

            //id col clicked
            PlayersController.sortBy('id');

            expect(PlayersController.propertyName).toEqual('id');
            expect(PlayersController.reverse).toEqual(false);

            //id col clicked again
            PlayersController.sortBy('id');
            expect(PlayersController.propertyName).toEqual('id');
            expect(PlayersController.reverse).toEqual(true);

        });

    });



});
