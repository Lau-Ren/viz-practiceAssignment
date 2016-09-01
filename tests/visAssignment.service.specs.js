'use strict';
describe('service tests', function () {

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

});
