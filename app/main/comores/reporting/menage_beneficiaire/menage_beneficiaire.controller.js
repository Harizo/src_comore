(function ()
{
    'use strict';
    angular
        .module('app.comores.reporting.menage_beneficiaire')
        .controller('menage_beneficiaireController', menage_beneficiaireController);

    /** @ngInject */
    function menage_beneficiaireController(apiFactory, $state, $mdDialog, $scope) {
		var vm = this;
		vm.date_now = new Date() ;
		vm.filtre = {} ;
		vm.filtre.date_fin = new Date ;
		vm.dtOptions =
		{
			dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
			pagingType: 'simple',
			autoWidth: false,
			responsive: true
		};

		vm.menage_column =  [ 	
								{titre:"Numero d'enregistrement"},{titre:"Chef Ménage"},
								{titre:"Age chef de ménage"},{titre:"Sexe"},
								{titre:"Addresse"},{titre:"Enquêteur"}
							];

      

	}
  })();