(function ()
{
    'use strict';
    angular
        .module('app.comores.enquete.menage')
        .controller('MenageController', MenageController);

    /** @ngInject */
    function MenageController(apiFactory, $state, $mdDialog, $scope) {
		var vm = this;
	   vm.dtOptions =
      {
        dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        autoWidth: false,
        responsive: true
      };

      vm.menage_column = [{titre:"Numero d'enregistrement"},{titre:"Nom inscrire"},{titre:"Personne inscrire"}];
      vm.individu_column = [{titre:"Nom"},{titre:"Date de naissance"},{titre:"Activité"},{titre:"Aptitude"}];

      //initialisation variable
        vm.affiche_load = false ;
        vm.selectedItem = {} ;
        vm.selectedItem_individu = {} ;
        vm.tab_reponse_source_eau = [] ;
        vm.tab_reponse_bien_equipement = [] ;
        vm.tab_reponse_revetement_sol = [] ;
        vm.tab_reponse_revetement_toit = [] ;
        vm.tab_reponse_revetement_mur = [] ;
        vm.tab_reponse_type_culture = [] ;
        vm.tab_reponse_type_elevage = [] ;
        vm.tab_programme = [] ;//liste programme associé au menage

        vm.all_individus = [] ;
      //initialisation variable

      //chargement clé etrangère et données de bases
        apiFactory.getAll("ile/index").then(function(result)
        { 
          vm.all_ile = result.data.response;    
          
        });


        apiFactory.getAll("source_eau/index").then(function(result)
        { 
          vm.all_source_eau = result.data.response;    
          
        });
        apiFactory.getAll("toilette/index").then(function(result)
        { 
          vm.all_toilette = result.data.response;    
          
        });

        apiFactory.getAll("bien_equipement/index").then(function(result)
        { 
          vm.all_bien_equipement = result.data.response;    
          
        });

        apiFactory.getAll("revetement_sol/index").then(function(result)
        { 
          vm.all_revetement_sol = result.data.response;    
          
        });
        apiFactory.getAll("revetement_toit/index").then(function(result)
        { 
          vm.all_revetement_toit = result.data.response;    
          
        });
        apiFactory.getAll("revetement_mur/index").then(function(result)
        { 
          vm.all_revetement_mur = result.data.response;    
          
        });

        apiFactory.getAll("type_culture/index").then(function(result)
        { 
          vm.all_type_culture = result.data.response;    
          
        });

        apiFactory.getAll("type_elevage/index").then(function(result)
        { 
          vm.all_type_elevage = result.data.response;    
          
        });

        apiFactory.getAll("programme/index").then(function(result)
        { 
          vm.all_programme = result.data.response;    
          
        });
      //chargement clé etrangère et données de bases
      

      


      vm.filtre_region = function()
      {
        apiFactory.getAPIgeneraliserREST("region/index","cle_etrangere",vm.filtre.id_ile).then(function(result)
        { 
          vm.all_region = result.data.response;    
          
        });
      }

      vm.filtre_commune = function()
      {
        apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.filtre.id_region).then(function(result)
        { 
          vm.all_commune = result.data.response;    
          
        });
      }

      vm.filtre_village = function()
      {
        apiFactory.getAPIgeneraliserREST("village/index","cle_etrangere",vm.filtre.id_commune).then(function(result)
        { 
          vm.all_village = result.data.response;    
          
        });
      }

      

      vm.filtrer = function()
      {
        vm.affiche_load = true ;
      	apiFactory.getAPIgeneraliserREST("menage/index","cle_etrangere",vm.filtre.id_village).then(function(result)
        { 
          vm.all_menages = result.data.response;    
          vm.affiche_load = false ;
        });
      }


      vm.get_individus_by_menage = function(menage_id)
      {
        apiFactory.getAPIgeneraliserREST("individu/index","cle_etrangere",menage_id).then(function(result)
        { 
          vm.all_individus = result.data.response;    
         
        });
      }


      vm.get_enquete_by_menage = function(menage_id)
      {

        vm.tab_reponse_source_eau = [] ;
        vm.tab_reponse_bien_equipement = [] ;
        vm.tab_reponse_revetement_sol = [] ;
        vm.tab_reponse_revetement_toit = [] ;
        vm.tab_reponse_revetement_mur = [] ;
        vm.tab_reponse_type_culture = [] ;
        vm.tab_reponse_type_elevage = [] ;
       // vm.tab_programme = [] ;
        
        apiFactory.getAPIgeneraliserREST("enquete_menage_traitement/index","cle_etrangere",menage_id).then(function(result)
        { 
          vm.enquete_by_menage = result.data.response;   

          console.log(vm.enquete_by_menage); 

          if (vm.enquete_by_menage.source_eau) 
          {
            vm.tab_reponse_source_eau = vm.enquete_by_menage.source_eau ;
          }

          if (vm.enquete_by_menage.bien_equipement) 
          {
            vm.tab_reponse_bien_equipement = vm.enquete_by_menage.bien_equipement ;
          }

          if (vm.enquete_by_menage.revetement_sol) 
          {
            vm.tab_reponse_revetement_sol = vm.enquete_by_menage.revetement_sol ;
          }

          if (vm.enquete_by_menage.revetement_toit) 
          {
            vm.tab_reponse_revetement_toit = vm.enquete_by_menage.revetement_toit ;
          }

          if (vm.enquete_by_menage.revetement_mur) 
          {
            vm.tab_reponse_revetement_mur = vm.enquete_by_menage.revetement_mur ;
          }

          if (vm.enquete_by_menage.type_culture) 
          {
            vm.tab_reponse_type_culture = vm.enquete_by_menage.type_culture ;
          }

          if (vm.enquete_by_menage.type_elevage) 
          {
            vm.tab_reponse_type_elevage = vm.enquete_by_menage.type_elevage ;
          }

          vm.id_toilette = vm.enquete_by_menage.toilette ;

          if (vm.enquete_by_menage.id) 
          {
            vm.id_enquete_menage = vm.enquete_by_menage.id ;
          }
          else
          {
            vm.id_enquete_menage = 0 ; 
          }

          console.log("vm.id_enquete_menage = "+vm.id_enquete_menage);
         
        });
        
      }

      vm.selection= function (item)
      {

        //vidage tab reponse
          vm.all_individus = [] ;
        //vidage tab reponse
        vm.selectedItem_individu = {} ;//raz individu_selected
        vm.selectedItem = item;
        vm.nouvelItem   = item;

        //get individu
          vm.get_individus_by_menage(item.id);
          vm.get_enquete_by_menage(item.id);
        //get individu
        
      }

      $scope.$watch('vm.selectedItem', function()
      {
        if (!vm.all_menages) return;
        vm.all_menages.forEach(function(item) 
        {
          item.$selected = false;
        });
        vm.selectedItem.$selected = true;
      })

      vm.selection_individu= function (item)
      {

     
        vm.selectedItem_individu = item;
        vm.nouvelItem_individu   = item;

        
      }

      $scope.$watch('vm.selectedItem_individu', function()
      {
        if (!vm.all_individus) return;
        vm.all_individus.forEach(function(item) 
        {
          item.$selected = false;
        });
        vm.selectedItem_individu.$selected = true;
      })


      //CHECK BOK MULTISELECT
        vm.toggle = function (item, list) {
          var idx = list.indexOf(item);
          if (idx > -1) list.splice(idx, 1);
          else list.push(item);
          console.log(list);
        };
        $scope.exists = function (item, list) {
          if (list) 
          {
            return list.indexOf(item) > -1;
          }
          
        };
      //FIN CHECK BOK MULTISELECT

      vm.showAlert = function(titre,textcontent) 
        {
          
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(false)
            .parent(angular.element(document.body))
            .title(titre)
            .textContent(textcontent)
            .ariaLabel('Information')
            .ok('Fermer')
            .targetEvent()
          );
        } 
      vm.save_reponse_menage = function()
      {

        var config =  {
                        headers : {
                          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                        }
                      };

        var datas = $.param(
                    {    
                      supprimer:0,
                      id: vm.id_enquete_menage ,
                      id_menage: vm.selectedItem.id,
                      source_eau: vm.tab_reponse_source_eau,
                      toilette: vm.id_toilette,
                      bien_equipement: vm.tab_reponse_bien_equipement,                              
                      revetement_sol: vm.tab_reponse_revetement_sol,                              
                      revetement_toit: vm.tab_reponse_revetement_toit,                              
                      revetement_mur: vm.tab_reponse_revetement_mur,                              
                      type_culture: vm.tab_reponse_type_culture,                              
                      type_elevage: vm.tab_reponse_type_elevage                            
                    });

        apiFactory.add("enquete_menage_traitement/index",datas, config).success(function (data) 
        {
          vm.showAlert("Information",'Enregistrement réussi!');
         
        
        })
        .error(function (data) 
        {
          console.log('erreur '+data);
          vm.showAlert("Alerte","Erreur lors de l'enregistrement!");
        });  

        


        /*var data = {    
                      source_eau: vm.tab_reponse_source_eau,
                      toilette: vm.id_toilette,
                      bien_equipement: vm.tab_reponse_bien_equipement,                              
                      revetement_sol: vm.tab_reponse_revetement_sol,                              
                      revetement_toit: vm.tab_reponse_revetement_toit,                              
                      revetement_mur: vm.tab_reponse_revetement_mur,                              
                      type_culture: vm.tab_reponse_type_culture,                              
                      type_elevage: vm.tab_reponse_type_elevage                            
                    } ;

        console.log(data);*/
      }



    }
  })();
