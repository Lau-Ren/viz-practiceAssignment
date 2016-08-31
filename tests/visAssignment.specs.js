'use strict';
describe('visAssignment tests', function () {

    describe('playersservice tests', function () {
        var PlayersService, httpBackend;

        beforeEach(module('PlayersModule'));

        beforeEach(inject(function (_PlayersService_, $httpBackend) {

            PlayersService = _PlayersService_;
            httpBackend = $httpBackend;

            httpBackend.whenGET('./data/data.json').respond({

                "people":[
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
                ]
            })
        }));

        it('should say PlayersService is available', function() {
            expect(PlayersService).toBeDefined();
        });

        it('should implement the correct interface', function () {
            expect(PlayersService).toEqual({
                getData: jasmine.any(Function)
            })
        });

        it('should load json config', function () {

            PlayersService.getData('./data/data.json').then(function (response) {

                expect(response.data).toBeTruthy(1);
                expect(response.data.people[0].id).toEqual(1);
                expect(response.data.people[1].id).toEqual(2);

            });
            httpBackend.flush()
        });
    });


    describe('playerscontroller tests', function () {

        var vm, PlayersController, PlayersService;

        beforeEach(module('PlayersModule'));
        beforeEach(inject(function ($controller, _PlayersService_) {
            vm = {};
            PlayersController = $controller('PlayersController', { vm: vm });

            PlayersService = _PlayersService_;

            vm.players = [
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

        }));

        it('should define controller', function() {
            expect(PlayersController).toBeDefined();
        });

        it('should have the correct interface', function () {
            expect(PlayersController.loadPlayerData).toEqual(jasmine.any(Function));
            expect(PlayersController.openDeletePlayersModal).toEqual(jasmine.any(Function));
            expect(PlayersController.openAddPlayersModal).toEqual(jasmine.any(Function));
            expect(PlayersController.openEditPlayersModal).toEqual(jasmine.any(Function));
            expect(PlayersController.sortBy).toEqual(jasmine.any(Function));
            expect(PlayersController.selectPlayer).toEqual(jasmine.any(Function));
            expect(PlayersController.selectedPlayer).toEqual(jasmine.any(Object));
            expect(PlayersController.editedPlayer).toEqual(jasmine.any(Object));
            expect(PlayersController.players).toEqual([]);
            expect(PlayersController.playerCount).toEqual(0);
            expect(PlayersController.propertyName).toEqual('id');
            expect(PlayersController.reverse).toEqual(true);
        });

    });



    describe('AddPlayersModalController tests', function () {

        beforeEach(module('PlayersModule'));

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it('should define controller', function() {
            var $scope = {};
            var controller = $controller('AddPlayersModalController', { $scope: $scope });
            expect($scope.addPlayer).toBeDefined();
        });


    });







});
