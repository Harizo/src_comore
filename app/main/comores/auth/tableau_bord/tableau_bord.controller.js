(function ()
{
    'use strict';

    angular
        .module('app.comores.auth.tableau_bord')
        .controller('Tableau_bord_Controller', Tableau_bord_Controller);

    /** @ngInject */
    function Tableau_bord_Controller(apiFactory, $location, $mdDialog,fuseTheming,$scope,$sanitize)
    {
      var vm = this;
      vm.themes = fuseTheming.themes;

      vm.dtOptions = {
		dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
		pagingType: 'simple',
		autoWidth: false,
		responsive: true
		};
      //vm.send = send;
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
	        {titre:"Nombre de cas de mal nutrition",id:"nbr_enfant_mal_nouri"}

      	];

      	vm.nbr = 
		[
	        {libelle:"Nombre de personne vivant avec handicap enregistrées",id:"5"},
	        {libelle:"Individu par programme",id:"5"},
	        {libelle:"Nombre de cas de mal nutrition",id:"5"}

      	];

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

	vm.pivot = "nbr_menage_par_programme" ;
    apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",'nbr_menage_par_programme',"date_deb",null,"date_fin",null,
        		"id_ile","*","id_region",null,"id_commune",null,"village_id",null).then(function(result)
    {
    	vm.data_via_base =  result.data.response ;
      vm.data_via_base_ok = true ;

      /*vm.myHTML ='<div class="md-title"> Stat  bénéficiaires</div> <div class="card md-whiteframe-4dp"> <c3chart bindto-id="donut-plot1-chart"> '+
                                

                                    '<chart-column '+
                                            
                                              'column-values="8" '+
                                              'column-id="data 1" '+
                                              'column-type="donut"/> '+
                                
                                
                               '<chart-donut title="Ménage bénéficiaires" width="50"/> '+
                            '</c3chart> </div>';*/
     
     
    	
    	
    });

    apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",'nbr_individu_par_programme',"date_deb",null,"date_fin",null,
            "id_ile","*","id_region",null,"id_commune",null,"village_id",null).then(function(result)
    {
      vm.data_via_base_nbr_individu =  result.data.response ;
     
      vm.data_via_base_nbr_individu_ok = true ;
      
    });


	  apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",'nbr_pers_avec_andicap',"date_deb",null,"date_fin",null,
		  "id_ile","*","id_region",null,"id_commune",null,"village_id",null).then(function(result)
    {
    	vm.data_nbr_pers_avec_andicap =  result.data.response ;
      
      vm.data_nbr_pers_avec_andicap_ok = true ;
    	
    	/*vm.libelle = [] ;
    	vm.datas = [] ;
    	vm.data_via_base_individu.forEach( function(element, index) {
    		vm.libelle[index] = element.libelle ;
    		vm.datas[index] = (Number)(element.nbr) ;
    		
    	});*/
    

    });

    apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",'nbr_mariage_precoce',"date_deb",null,"date_fin",null,
            "id_ile","*","id_region",null,"id_commune",null,"village_id",null).then(function(result)
    {
      vm.data_via_base_nbr_mariage =  result.data.response ;
     
     
      vm.data_via_base_nbr_mariage_ok = true ;
      
    });


    apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",'nbr_violence',"date_deb",null,"date_fin",null,
            "id_ile","*","id_region",null,"id_commune",null,"village_id",null).then(function(result)
    {
      vm.data_via_base_nbr_violence =  result.data.response ;
      console.log(vm.data_via_base_nbr_violence);
     
      vm.data_via_base_nbr_violence_ok = true ;
      
    });


    apiFactory.getAPIgeneraliserREST("reporting/index","type_etat",'nbr_individu_par_formation',"date_deb",null,"date_fin",null,
            "id_ile","*","id_region",null,"id_commune",null,"village_id",null).then(function(result)
    {
      vm.data_via_base_nbr_individu_par_formation =  result.data.response ;
    
      
    });

  

    }
})();
