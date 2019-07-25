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

		vm.transfert_monetaire_menage = [] ;
		vm.dtOptions =
		{
			dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
			pagingType: 'simple',
			autoWidth: false,
			responsive: true
		};

		vm.transfert_monetaire_menage_column =  [ 	
								{titre:"Numero d'enregistrement"},{titre:"Chef Ménage"},
								{titre:"Date"},{titre:"Partenaire"},{titre:"Agence de paiement"},{titre:"Type de transfert"},
								{titre:"Montant(KMF)"}
							];

		
		vm.formatDateListe = function (dat)
		{
			if (dat) 
			{
			  var date = new Date(dat);
			  var mois = date.getMonth()+1;
			  var dates = (date.getDate()+"-"+mois+"-"+date.getFullYear());
			  return dates;
			}
		  

		}

		function formatDateBDD(dat)
		{
			if (dat) 
			{
			  var date = new Date(dat);
			  var mois = date.getMonth()+1;
			  var dates = (date.getFullYear()+"-"+mois+"-"+date.getDate());
			  return dates;
			}
		  

		}

        vm.filtrer = function(filtre)
        {
        	apiFactory.getAPIgeneraliserREST("reporting/index","type_etat","transfert_monetaire_menage","date_deb",formatDateBDD(filtre.date_debut),"date_fin",formatDateBDD(filtre.date_fin)).then(function(result)
	        {
	        	vm.transfert_monetaire_menage =  result.data.response ;
	        });
        }

      

	}
  })();