(function ()
{
    'use strict';
    angular
        .module('app.comores.reporting.menage_beneficiaire')
        .controller('menage_beneficiaireController', menage_beneficiaireController);

    /** @ngInject */
    function menage_beneficiaireController(apiFactory, $state, $mdDialog, $scope, serveur_central,$cookieStore) {
		var vm = this;
		vm.serveur_central = serveur_central ;
		vm.date_now = new Date() ;
		vm.filtre = {} ;
		vm.filtre_individu = {} ;
		vm.filtre.date_fin = new Date ;

		vm.desable_button = false ;

		vm.data_via_base = [] ;
		vm.dtOptions =
		{
			dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
			pagingType: 'simple',
			autoWidth: false,
			responsive: true
		};

		vm.pivots = 
		[
	        {titre:"Historique transfert monetaire",id:"transfert_monetaire_menage"},
	        {titre:"Nombre ménage par programme",id:"nbr_menage_par_programme"},
	        {titre:"Ménage par programme",id:"menage_par_programme"}

      	];

      	vm.pivots_individu = 
		[
	        {titre:"Nombre de personne vivant avec handicap enregistrées",id:"nbr_pers_avec_andicap"},
	        {titre:"Individu par programme",id:"individu_par_programme"},
	        {titre:"Nombre de cas de mal nutrition",id:"nbr_enfant_mal_nouri"},
	        {titre:"Nombre individu par programme",id:"nbr_individu_par_programme"},
	        {titre:"Nombre individu par formation",id:"nbr_individu_par_formation"}

      	];

	
		vm.id_user_cookies = $cookieStore.get('id');
        apiFactory.getOne("utilisateurs/index",vm.id_user_cookies).then(function(result)
        { 
          vm.user = result.data.response;
           

          apiFactory.getAll("ile/index").then(function(result)
          { 
            vm.all_ile = result.data.response;    

            if (!vm.serveur_central) //si n'est pas central disable ile
            {
              vm.filtre.id_ile = vm.user.id_ile ;
              vm.filtre_individu.id_ile = vm.user.id_ile ;
              vm.filtre_region();
              vm.filtre_individu_region();
            }
            
          });
          
        });

		vm.replace_point = function(nbr)
		{
			var str = ""+nbr ;
			var res = str.replace(".",",") ;
			return res ;
		}
		vm.parseFloat = function(int)
		{
			var float = parseFloat(int);
			var x = vm.replace_point(float.toFixed(2)) ;
			return x ;
		}

        vm.filtre_region = function()
		{
			apiFactory.getAPIgeneraliserREST("region/index","cle_etrangere",vm.filtre.id_ile).then(function(result)
			{ 
			  vm.all_region = result.data.response;   
			  vm.filtre.id_region = null ; 
			  vm.filtre.id_commune = null ; 
			  vm.filtre.village_id = null ; 
			 
			  
			});

		}

		vm.filtre_village = function()
		{
			apiFactory.getAPIgeneraliserREST("village/index","cle_etrangere",vm.filtre.id_commune).then(function(result)
			{ 
			  vm.all_village = result.data.response;    
			  vm.filtre.village_id = null ; 
			  
			  
			});
		}

		vm.filtre_commune = function()
		{
			apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.filtre.id_region).then(function(result)
			{ 
			  vm.all_commune = result.data.response; 
			  vm.filtre.id_commune = null ; 
			  vm.filtre.village_id = null ; 
			   
			  
			});
		}

		vm.filtre_individu_region = function()
		{
			apiFactory.getAPIgeneraliserREST("region/index","cle_etrangere",vm.filtre_individu.id_ile).then(function(result)
			{ 
			  vm.all_region_individu = result.data.response;   
			  vm.filtre_individu.id_region = null ; 
			  vm.filtre_individu.id_commune = null ; 
			  vm.filtre_individu.village_id = null ; 
			 
			  
			});

		}

		vm.filtre_individu_village = function()
		{
			apiFactory.getAPIgeneraliserREST("village/index","cle_etrangere",vm.filtre_individu.id_commune).then(function(result)
			{ 
			  vm.all_village_individu = result.data.response;    
			  vm.filtre_individu.village_id = null ; 
			  
			  
			});
		}

		vm.filtre_individu_commune = function()
		{
			apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.filtre_individu.id_region).then(function(result)
			{ 
			  vm.all_commune_individu = result.data.response; 
			  vm.filtre_individu.id_commune = null ; 
			  vm.filtre_individu.village_id = null ; 
			   
			  
			});
		}

		
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

		vm.affichage_sexe_int = function(sexe_int)
		{
			switch (sexe_int) {
				case '1':
					return "Homme";
					break;
				case '0':
					return "Femme";
					break;
				default:
					return "la BDD n'est pas à jour "
					break;
			}
		}

        vm.filtrer = function(filtre)
        {
        	vm.desable_button = true ;
        	
        	if (!filtre.id_ile) {
        		filtre.id_ile = null ;
        	}
        	if (!filtre.id_region) {
        		filtre.id_region = null ;
        	}
        	if (!filtre.id_commune) {
        		filtre.id_commune = null ;
        	}
        	if (!filtre.village_id) {
        		filtre.village_id = null ;
        	}
        	apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",filtre.pivot,"date_deb",formatDateBDD(filtre.date_debut),"date_fin",formatDateBDD(filtre.date_fin),
        		"id_ile",filtre.id_ile,"id_region",filtre.id_region,"id_commune",filtre.id_commune,"village_id",filtre.village_id).then(function(result)
	        {
	        	vm.data_via_base =  result.data.response ;
	        	vm.desable_button = false ;
	        });
        }

        vm.filtrer_individu = function(filtre)
        {
        	vm.desable_button = true ;
        	
        	if (!filtre.id_ile) {
        		filtre.id_ile = null ;
        	}
        	if (!filtre.id_region) {
        		filtre.id_region = null ;
        	}
        	if (!filtre.id_commune) {
        		filtre.id_commune = null ;
        	}
        	if (!filtre.village_id) {
        		filtre.village_id = null ;
        	}
        	apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",filtre.pivot,"date_deb",formatDateBDD(filtre.date_debut),"date_fin",formatDateBDD(filtre.date_fin),
        		"id_ile",filtre.id_ile,"id_region",filtre.id_region,"id_commune",filtre.id_commune,"village_id",filtre.village_id).then(function(result)
	        {
	        	vm.data_via_base_individu =  result.data.response ;
	        	vm.desable_button = false ;
	        });
        }

       



	}
  })();