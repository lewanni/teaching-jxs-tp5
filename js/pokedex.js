var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('c1', data);

function data($scope, $log, $http, POKEAPI, infoPoke) {
	$scope.lsPoke =
  [
  	{id: 1, name: "dracaufeu"},
  	{id: 2, name: "amphinobi"},
  	{id: 3, name: "junko"},
  	{id: 4, name: "lucario"},
  	{id: 5, name: "drattak"},
  	{id: 6, name: "voltali"}
  ];

	$scope.$log = $log;

  //q10
  $http({
      method: 'GET',
      url: POKEAPI + "/api/v2/pokedex/1/"}).then(function successCallback(response) {
        $scope.lsAllPoke = response.data.pokemon_entries;
  });

  //q10 améliorée
  $scope.infoPoke = function(namePoke, id) {
    for (var i = 0; i < $scope.lsAllPoke.length; i++) {
      if ($scope.lsAllPoke[i].pokemon_species.name == namePoke || $scope.lsAllPoke[i].entry_number == id) {
        return {
          id: $scope.lsAllPoke[i].entry_number,
          namePokemon: $scope.lsAllPoke[i].pokemon_species.name
        }
      }
    }
  };
}

// q11 : création service
pokeApp.factory('infoPoke', function($resource, POKEAPI) {
  return $resource(POKEAPI + "/api/v2/pokemon/:id/", {id: '@id'});
});

// q12 : nouveau controller pour afficher les informations de bulbizarre
pokeApp.controller('c2', data2);

function data2($scope, infoPoke) {
  var bulbi = infoPoke.get({id:1});
  // $scope.id = bulbi.id;
  // $scope.name = bulbi.name;
  // $scope.attacks = bulbi.moves;
  // console.log($scope.id);

  bulbi.$promise.then(function (data) {
    $scope.bulbi = data;
    $scope.id = data.id;
    $scope.name = data.name;
    $scope.attacks = data.moves;
  }, true);
}
