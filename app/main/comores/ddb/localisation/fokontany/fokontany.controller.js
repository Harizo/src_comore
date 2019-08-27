(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.fokontany')
        .controller('FokontanyController', FokontanyController);

    /** @ngInject */
    function FokontanyController($mdDialog, $scope, $location, apiFactory, $cookieStore,serveur_central)
    {
      var vm = this;
	  vm.serveur_central = serveur_central;
      vm.ajout = ajout ;
      var NouvelItem=false;
      var currentItem;

      vm.selectedItem = {} ;
      vm.allvillage = [] ;
      vm.listevillage = [] ;
      //apina commune 
        vm.allcommune = [];
        //vm.listecommune = [] ;
       // vm.alldistrict = [] ;
        //vm.listedistrict = [] ;
       // vm.allregion = [] ;
		//vm.coderegion='';
		//vm.codedistrict='';
      

      //variale affichage bouton nouveau
      vm.afficherboutonnouveau = 1 ;

      //variable cache masque de saisie
      vm.affichageMasque = 0 ;

      //style
    vm.dtOptions = {
      dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
      pagingType: 'simple',
      autoWidth: false,
      responsive: true
    };

    //col table
    vm.village_column = [{titre:"Code"},{titre:"Village"},{titre:"Commune"},{titre:"Programme"}];
    
    // apiFactory.getAll("commune/index").then(function(result)  {
      // vm.allcommune = result.data.response;
    // });
     //fakana commune
   /* apiFactory.getAPIgeneraliser("commune/index","id_district","'TOUT'","id_region","'TOUT'").then(function(result) {
        vm.allcommune= result.data.response;
        vm.listecommune= result.data.response;
        apiFactory.getAll("district/index").then(function(result) {
            vm.alldistrict= result.data.response;
            vm.listedistrict= result.data.response;
            apiFactory.getAll("region/index").then(function(result) {
                vm.allregion= result.data.response;
            });
        });
    });*/
      apiFactory.getAll("village/index").then(function(result)
      {      
        vm.allvillage=result.data.response;
  		  //vm.listevillage =vm.allvillage
      });
    apiFactory.getAll("commune/index").then(function(result)
    {
      vm.allcommune = result.data.response;
     //console.log(vm.allcommune);
    });
    
    apiFactory.getAll("programme/index").then(function(result)
    {
        vm.allprogramme= result.data.response;
    });
     
        function ajout(village,suppression)   
        {
              if (NouvelItem==false) 
              {
                test_existance (village,suppression); 
              }
              else
              {
                insert_in_base(village,suppression);
              }
               
                
            
        }

        function insert_in_base(village,suppression)
        {
           
            //add
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

            var getId = 0;

            if (NouvelItem==false) 
            {
               getId = vm.selectedItem.id; 
            } 
            var datas = $.param(
            {
                supprimer:suppression,
                id:getId,      
                Code: village.Code,
                Village: village.Village,
                commune_id:village.commune_id,
                programme_id:village.programme_id
                
            });
        
            //factory
            apiFactory.add("village/index",datas, config).success(function (data)
            {   var prog = vm.allprogramme.filter(function(obj)
                {
                    return obj.id == vm.village.programme_id;
                });
                var com = vm.allcommune.filter(function(obje)
                {
                    return obje.id == vm.village.commune_id;
                });

                  if (NouvelItem == false) 
                  {
                    // Update or delete: id exclu
                    
                    if(suppression==0) 
                    {
                      vm.selectedItem.Village = vm.village.Village;
                      vm.selectedItem.Code = vm.village.Code;
                      vm.selectedItem.commune = com[0];
                      vm.selectedItem.programme = prog[0];
                      vm.afficherboutonModifSupr = 0 ;
                      vm.afficherboutonnouveau = 1 ;
                      vm.selectedItem.$selected = false;
                      vm.selectedItem ={};
                    } 
                    else 
                    {    
                      vm.allvillage = vm.allvillage.filter(function(obj) {

                        return obj.id !== currentItem.id;
                      });
                    }
                  }
                  else
                  {
                    var item = {
                        Village: village.Village,
                        Code: village.Code,
                        id:String(data.response),
                        commune:com[0],
                        programme:prog[0] 
                    };
        
                    vm.allvillage.push(item);
                    vm.village={};
             
                    NouvelItem=false;
                  }

                  vm.affichageMasque = 0 ;

                })
                .error(function (data) {
                    alert('Error');
                });
            }
                

      //*****************************************************************

     

      //selection sur la liste
      vm.selection= function (item) {
  //      vm.modifiercategorie(item);
        
          vm.selectedItem = item;
          vm.nouvelItem = item;
          currentItem = JSON.parse(JSON.stringify(vm.selectedItem));
          vm.afficherboutonModifSupr = 1 ;
          vm.affichageMasque = 0 ;
          vm.afficherboutonnouveau = 1 ;
      };

      $scope.$watch('vm.selectedItem', function() {
        if (!vm.allvillage) return;
        vm.allvillage.forEach(function(item) {
            item.$selected = false;
        });
        vm.selectedItem.$selected = true;
      });

      //function cache masque de saisie
        vm.ajouter = function () 
        {
          vm.selectedItem.$selected = false;
          vm.affichageMasque = 1 ;
          vm.village={};
          NouvelItem = true ;

        };

        vm.annuler = function() 
        {
          vm.selectedItem = {} ;
          vm.selectedItem.$selected = false;
          vm.affichageMasque = 0 ;
          vm.afficherboutonnouveau = 1 ;
          vm.afficherboutonModifSupr = 0 ;
          NouvelItem = false;
          vm.village={};

        };

        vm.modifier = function() 
        {

          NouvelItem = false ;
          vm.affichageMasque = 1 ;
          vm.village.id = vm.selectedItem.id ;
          vm.village.Code = vm.selectedItem.Code ;
          vm.village.Village = vm.selectedItem.Village ;
          vm.village.commune_id = vm.selectedItem.commune.id ;
          vm.village.programme_id = vm.selectedItem.programme.id ;        
        
        /*  vm.allcommune.forEach(function(comm) {
            if(comm.id==vm.selectedItem.id_commune) {
				vm.village.id_commune = comm.id ;
				vm.village.commune = comm ;
				vm.id_district = comm.district_id;
				vm.alldistrict.forEach(function(dis) {
					if(dis.id==vm.id_district) {
						vm.id_region = dis.region_id ;
						vm.listedistrict = vm.alldistrict;
						vm.listecommune=vm.allcommune;
						vm.listedistrict = vm.listedistrict.filter(function(dist) {
							return dist.region_id === vm.id_region;
						});
						vm.id_district = comm.district_id;
						vm.listecommune = vm.listecommune.filter(function(comm1) {
							return comm1.district_id === vm.id_district;
						});
						vm.id_district = comm.district_id;
					}
				});
            }
          });*/
          vm.afficherboutonModifSupr = 0;
          vm.afficherboutonnouveau = 0;  
        };

        vm.supprimer = function() 
        {
          vm.afficherboutonModifSupr = 0 ;
          vm.affichageMasque = 0 ;
         var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('ok')
                .cancel('annuler');

          $mdDialog.show(confirm).then(function() {

            ajout(vm.selectedItem,1);
          }, function() {
            //alert('rien');
          });
        };

       //commune filter        
         vm.modifierCommune = function (item) 
         { 
            var pref = vm.allcommune.filter(function(obj)
            {
                return obj.id == item.commune_id;
            });
            
            item.programme_id=pref[0].programme.id;
           /* vm.listecommune.forEach(function(comm) {
                if(comm.id==item.id_commune) {
                    vm.village.id_commune = comm.id; 
                    vm.village.commune=[];
                    var itemss = {
                        id: comm.id,
                        code: comm.code,
                        nom: comm.nom,
                        district_id: comm.district_id,
                    };
                    vm.village.commune.push(itemss);
					var param_id_region =1;
					vm.alldistrict.forEach(function(dis) {
						if(dis.id==comm.district_id) {
							param_id_region=dis.region_id;
						}
					});	
					apiFactory.getAPIgeneraliser("commune/index","id_commune",comm.id,"id_region",param_id_region).then(function(result) {
						console.log(result.data.response);
						var code = 0;
						if(result.data.response) {
							code =  result.data.response.length + 1 ;
						} else {
							code=1;
						}
						if(code < 10) {
							code = '00' + code;
						} else if(code >=10 && code < 100){
							code = '0' + code;							
						} 
						vm.village.code = comm.code + code;
					});	
                }
            });*/
        };
     /*   vm.modifierFiltreCommune = function() {
            vm.listedistrict=vm.alldistrict;
            vm.listecommune=vm.allcommune;
            if(vm.id_region >"") {
                vm.listedistrict = vm.listedistrict.filter(function(dist) {
                    return dist.region_id === vm.id_region;
                });
                vm.listecommune = vm.listecommune.filter(function(comm) {
                    return comm.region_id === vm.id_region;
                });
				vm.allregion.forEach(function(re) {
					if(re.id==vm.id_region) {
						vm.coderegion=re.code;
					}
				});
            } else {
				vm.coderegion='';
			}
            if(vm.id_district >"") {
                vm.listecommune = vm.listecommune.filter(function(comm) {
                    return comm.district_id === vm.id_district;
                });
				vm.listedistrict.forEach(function(di) {
					if(di.id==vm.id_district) {
						vm.codedistrict=di.code;
					}
				});
            } else {
				vm.codedistrict='';
			}
			// vm.village.code=vm.coderegion + vm.codedistrict;
        };  
        */
		vm.showAlert = function(titre,textcontent) {
			$mdDialog.show(
			  $mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(false)
				.parent(angular.element(document.body))
				.title(titre)
				.textContent(textcontent)
				.ariaLabel('Alert Dialog Demo')
				.ok('Fermer')
				.targetEvent()
			);
		} 
        function test_existance (item,suppression) 
        {
           
            if (suppression!=1) 
            {
                vm.allvillage.forEach(function(vil) {
                
                  if (vil.id==item.id) 
                  {
                    if((vil.Village!=item.Village)
                    ||(vil.Code!=item.Code)
                    ||(vil.commune.id!=item.commune_id)
                    ||(vil.programme.id!=item.programme_id))
                    
                    {
                      insert_in_base(item,suppression);
                      vm.affichageMasque = 0 ;
                    }
                    else
                    {
                      vm.affichageMasque = 0 ;
                    }
                  }
                });
            }
            else
              insert_in_base(item,suppression);
        } 
		vm.download_ddb = function(controller,table){
			var nbr_data_insert = 0 ;
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			apiFactory.getAll_acteur_serveur_central(controller).then(function(result){
				var ddb = result.data.response;
				console.log(ddb);
				var datas_suppr = $.param({
						supprimer:1,
						nom_table: table,
					}); 
				apiFactory.add("delete_ddb/index",datas_suppr, config).success(function (data) {
						//add ddb
							ddb.forEach( function(element, index) {
								switch (table) {
									case "see_village":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											commune_id: element.commune.id,
											Code: element.Code,
											Village: element.Village,
											programme_id: element.programme.id,
											zone_id: element.zone_id,
											nbrpopulation: element.nbrpopulation,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									case "see_commune":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											Code: element.Code,
											Commune: element.Commune,
											zone_id: element.zone_id,
											nombremenage: element.nombremenage,
											programme_id: element.programme_id,
											region_id: element.region_id,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									case "see_region":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											ile_id: element.ile_id,
											Code: element.Code,
											Region: element.Region,
											programme_id: element.programme_id,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									case "see_ile":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											Code: element.Code,
											Ile: element.Ile,
											programme_id: element.programme.id,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									default:
										// statements_def
										break;
								}
								apiFactory.add("delete_ddb/index",datas, config).success(function (data) {
									nbr_data_insert++ ;
									if ((index+1) == ddb.length) {
										vm.showAlert('Information',nbr_data_insert + ' enregistrement ajouté avec Succès !');
									}
								}).error(function (data) {
									vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
								});
							});
					}).error(function (data) {
						vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
					});
				switch (table) {
					case "see_village":
						vm.allvillage = ddb ;
						break;
					case "see_commune":
						vm.allcommune = ddb ;
						break;
					case "see_region":
						vm.allprefecture = ddb ;
						break;					
					case "see_ile":
						vm.allile = ddb ;
						break;					
					default:
						break;
				}
			});  
		}

    }
})();