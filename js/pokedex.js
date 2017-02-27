var pokeApp = angular.module('pokedex', [ 'ngResource' ]);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co/api/v1/');

pokeApp.config([ '$resourceProvider', function($resourceProvider) {
	$resourceProvider.defaults.stripTrailingSlashes = false;
} ]);

pokeApp.controller('c1', data);

function data($scope, $log, $http, MonpokemonService) {

	// $scope.myBestTeamPokemon = [
	//
	// {
	// id : 1,
	// name : " dracaufeu"
	// }, {
	// id : 2,
	// name : " amphinobi"
	// }, {
	// id : 3,
	// name : " junko"
	// }, {
	// id : 4,
	// name : " lucario"
	// }, {
	// id : 5,
	// name : " drattak"
	// }, {
	// id : 6,
	// name : " voltali"
	// }
	//
	// ];

	// $scope.$log = $log;

	$http
			.get("http://pokeapi.co/api/v1/pokedex/1")
			.success(function(data, status) {
				$scope.myBestTeamPokemon1 = data.pokemon;
				// $log.info(data);
			})
			.error(
					function(data, status) {
						document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
					});
	
	
	//Ecoute les changements de valeur de "nom" depuis la vue et met à jour le service "pokeService"
	$scope.$watch("nom", function(newValue, oldValue) {
		if($scope.nom){
			var pokeObject = JSON.parse(newValue); //Converti la chaine de caractère renvoyée par la vue en objet
			//$log.warn(pokeObject);
			MonpokemonService.id = pokeObject.resource_uri.replace('api/v1/pokemon/', '').replace('/', ''); //Recupère l'id à partir de l'URI
			MonpokemonService.name = pokeObject.name;
			//$log.info(MonpokemonService);
		}
	});
	

}

/**
 * Recupère les informations relatives au pokemon selectionné
 */

pokeApp.controller('c2', [ '$scope', '$log', '$resource', 'InfoService',
		'MonpokemonService', dataRessource ]);

function dataRessource($scope, $log, $resource, InfoService, MonpokemonService) {
	$scope.nom = MonpokemonService;
	$scope.$watch("nom.id", function(newValue, oldValue) {
		var donnees = InfoService.get({id : MonpokemonService.id}, function() {
			$log.info(donnees);
			$scope.myBestTeamPokemon2 = {
				id : donnees.resource_uri.replace('api/v1/pokemon/', '').replace(
						'/', ''),
				resource_uri : donnees.resource_uri,
				name : donnees.name,
				attack : donnees.attack,
				defense : donnees.defense,
				male_female_ratio : donnees.male_female_ratio,
				abilities : donnees.abilities,
				species : donnees.species,
				moves : donnees.moves,
				sprites : donnees.sprites
			};
		})
	});
	
	
	
	
}


pokeApp.factory('InfoService', [ '$resource', 'POKEAPI',
		function($resource, POKEAPI) {
			return $resource(POKEAPI + 'pokemon/:id');
		} ]);

pokeApp.factory('MonpokemonService', [ function() {
	var factory = {
		id : false,
		name : false
	}
	return factory;
} ]);