(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.enquetesurindividu')
        .controller('EnquetesurindividuController', EnquetesurindividuController);
    /** @ngInject */
    function EnquetesurindividuController($mdDialog, $scope, apiFactory, $state, serveur_central)  {
		var vm = this;
		vm.serveur_central = serveur_central ;
		vm.titrepage ="Ajout Tutelle";
		vm.ajout = ajout ;
		var NouvelItem=false;
		var currentItem;
		vm.selectedItemLiendeparente = {} ;
		vm.selectedItemHandicapvisuel = {} ;
		vm.selectedItemHandicapparole = {} ;
		vm.selectedItemHandicapauditif = {} ;
		vm.selectedItemHandicapmental = {} ;
		vm.selectedItemHandicapmoteur = {} ;
		vm.selectedItemVaccin = {} ;
		vm.selectedItemTypemariage = {} ;     
		vm.selectedItemTypeviolence = {} ;     
		vm.selectedItemTypeformationrecue = {} ;     
		vm.selectedItemSituationmatrimoniale = {} ;     
		vm.allRecordsLiendeparente = [] ;
		vm.allRecordsHandicapvisuel = [] ;
		vm.allRecordsHandicapparole = [] ;
		vm.allRecordsHandicapauditif = [] ;
		vm.allRecordsHandicapmental = [] ;
		vm.allRecordsHandicapmoteur = [] ;
		vm.allRecordsVaccin = [] ;
		vm.allRecordsTypemariage = [] ;     
		vm.allRecordsTypeviolence = [] ;     
		vm.allRecordsTypeformationrecue = [] ;     
		vm.allRecordsSituationmatrimoniale = [] ;     
		vm.nom_table ="liendeparente";
		vm.cas=1;
		//variale affichage bouton nouveau
		//variable cache masque de saisie
		//style
		vm.dtOptions = {
		dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
		pagingType: 'simple',
		autoWidth: false,
		responsive: true
		};
		//col table
		vm.donnateur_column = [{titre:"Description"},{titre:"Actions"}];
		apiFactory.getTable("enquete_menage/index","handicap_moteur").then(function(result){
			vm.allRecordsHandicapmoteur = result.data.response;
			apiFactory.getTable("enquete_menage/index","handicap_mental").then(function(result){
				vm.allRecordsHandicapmental = result.data.response;
				apiFactory.getTable("enquete_menage/index","handicap_auditif").then(function(result){
					vm.allRecordsHandicapauditif = result.data.response;
					apiFactory.getTable("enquete_menage/index","handicap_parole").then(function(result){
						vm.allRecordsHandicapparole = result.data.response;
						apiFactory.getTable("enquete_menage/index","handicap_visuel").then(function(result){
							vm.allRecordsHandicapvisuel = result.data.response;
							apiFactory.getTable("enquete_menage/index","liendeparente").then(function(result){
								vm.allRecordsLiendeparente = result.data.response;
							});    
							apiFactory.getTable("enquete_menage/index","vaccin").then(function(result){
								vm.allRecordsVaccin = result.data.response;
							});    
						});    
					});    
				});    
			});    
		});    
		apiFactory.getTable("enquete_menage/index","type_mariage").then(function(result){
			vm.allRecordsTypemariage = result.data.response;
		});  
		apiFactory.getTable("enquete_menage/index","type_violence").then(function(result){
			vm.allRecordsTypeviolence = result.data.response;
		});  
		apiFactory.getTable("enquete_menage/index","type_formation_recue").then(function(result){
			vm.allRecordsTypeformationrecue = result.data.response;
		});  
		apiFactory.getTable("enquete_menage/index","situation_matrimoniale").then(function(result){
			vm.allRecordsSituationmatrimoniale = result.data.response;
		});  

		vm.download_ddb = function(table)
		{
			var nbr_data_insert = 0 ;
			
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};

			apiFactory.getAll_serveur_central("enquete_menage/index",table).then(function(result){
				var ddb = result.data.response;

								var datas_suppr = $.param({
						supprimer:1,
						nom_table: table,
					}); 

				apiFactory.add("delete_ddb/index",datas_suppr, config).success(function (data) {

						//add ddb
							ddb.forEach( function(element, index) {
								
								var datas = $.param({
									supprimer:0,
									id:element.id,      
									description: element.description,
									nom_table: table,
								});   
								apiFactory.add("delete_ddb/index",datas, config).success(function (data) {
									nbr_data_insert++ ;
									if ((index+1) == ddb.length) //affichage Popup
									{
										vm.showAlert('Information',nbr_data_insert+' enregistrement ajouté avec Succès !');
									}
								}).error(function (data) {
									vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
								});
							});
						//add ddb

					}).error(function (data) {
						vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
					});
				

				

				switch (table) 
				{
					case "liendeparente":
						vm.allRecordsLiendeparente = ddb ;
						break;
					case "handicap_visuel":
						vm.allRecordsHandicapvisuel = ddb ;
						break;
					case "handicap_parole":
						vm.allRecordsHandicapparole = ddb ;
						break;
					case "handicap_auditif":
						vm.allRecordsHandicapauditif = ddb ;
						break;
					case "handicap_mental":
						vm.allRecordsHandicapmental = ddb ;
						break;
					case "handicap_moteur":
						vm.allRecordsHandicapmoteur = ddb ;
						break;
					case "vaccin":
						vm.allRecordsVaccin = ddb ;
						break;
					case "type_mariage":
						vm.allRecordsTypemariage = ddb ;
						break;
					case "type_violence":
						vm.allRecordsTypeviolence = ddb ;
						break;
					case "type_formation_recue":
						vm.allRecordsTypeformationrecue = ddb ;
						break;
					case "situation_matrimoniale":
						vm.allRecordsTypeformationrecue = ddb ;
						break;
					
					default:

						break;
				}

			});  
		}
        vm.Select_table= function (nomdetable) {     
            if(parseInt(nomdetable) >0) {
				var nom_de_table=parseInt(nomdetable);
				switch(nom_de_table) {
					case 1:  {
						vm.nom_table="liendeparente";
						vm.cas=1;
						break;
					}
					case 2:  {
						vm.nom_table="handicap_visuel";
						vm.cas=2;
						break;
					}
					case 3:  {
						vm.nom_table="handicap_parole";
						vm.cas=3;
						break;
					}
					case 4:  {
						vm.nom_table="handicap_auditif";
						vm.cas=4;
						break;
					}
					case 5:  {
						vm.nom_table="handicap_mental";
						vm.cas=5;
						break;
					}
					case 6:  {
						vm.nom_table="handicap_moteur";
						vm.cas=6;
						break;
					}
					case 7:  {
						vm.nom_table="vaccin";
						vm.cas=7;
						break;
					}
					case 8:  {
						vm.nom_table="type_mariage";
						vm.cas=8;
						break;
					}
					case 9:  {
						vm.nom_table="type_violence";
						vm.cas=9;
						break;
					}
					case 10:  {
						vm.nom_table="type_formation_recue";
						vm.cas=10;
						break;
					}
					case 11:  {
						vm.nom_table="situation_matrimoniale";
						vm.cas=11;
						break;
					}
					default: {
						vm.nom_table="liendeparente";
						vm.cas=1;
						break;
					}
				}				
			} else {
				vm.nom_table="liendeparente";
				vm.cas=1;
			};
        };
		function ajout(possession,suppression) {
            test_existence (possession,suppression);
        }
        function insert_in_base(possession,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItem==false) {
			   getId = possession.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: possession.description,
				nom_table: vm.nom_table,
			});       
			//factory
			apiFactory.add("enquete_menage/index",datas, config).success(function (data) {
				if (NouvelItem == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
						switch(vm.cas) {
							case 1:  {
								vm.selectedItemLiendeparente.description = possession.description;
								vm.selectedItemLiendeparente.$selected = false;
								vm.selectedItemLiendeparente.$edit = false;
								vm.selectedItemLiendeparente ={};
								break;
							}
							case 2:  {
								vm.selectedItemHandicapvisuel.description = possession.description;
								vm.selectedItemHandicapvisuel.$selected = false;
								vm.selectedItemHandicapvisuel.$edit = false;
								vm.selectedItemHandicapvisuel ={};
								break;
							}
							case 3:  {
								vm.selectedItemHandicapparole.description = possession.description;
								vm.selectedItemHandicapparole.$selected = false;
								vm.selectedItemHandicapparole.$edit = false;
								vm.selectedItemHandicapparole ={};
								break;
							}
							case 4:  {
								vm.selectedItemHandicapauditif.description = possession.description;
								vm.selectedItemHandicapauditif.$selected = false;
								vm.selectedItemHandicapauditif.$edit = false;
								vm.selectedItemHandicapauditif ={};
								break;
							}
							case 5:  {
								vm.selectedItemHandicapmental.description = possession.description;
								vm.selectedItemHandicapmental.$selected = false;
								vm.selectedItemHandicapmental.$edit = false;
								vm.selectedItemHandicapmental ={};
								break;
							}
							case 6:  {
								vm.selectedItemHandicapmoteur.description = possession.description;
								vm.selectedItemHandicapmoteur.$selected = false;
								vm.selectedItemHandicapmoteur.$edit = false;
								vm.selectedItemHandicapmoteur ={};
								break;
							}
							case 7:  {
								vm.selectedItemVaccin.description = possession.description;
								vm.selectedItemVaccin.$selected = false;
								vm.selectedItemVaccin.$edit = false;
								vm.selectedItemVaccin ={};
								break;
							}
							case 8:  {
								vm.selectedItemTypemariage.description = possession.description;
								vm.selectedItemTypemariage.$selected = false;
								vm.selectedItemTypemariage.$edit = false;
								vm.selectedItemTypemariage ={};
								break;
							}
							case 9:  {
								vm.selectedItemTypeviolence.description = possession.description;
								vm.selectedItemTypeviolence.$selected = false;
								vm.selectedItemTypeviolence.$edit = false;
								vm.selectedItemTypeviolence ={};
								break;
							}
							case 10:  {
								vm.selectedItemTypeformationrecue.description = possession.description;
								vm.selectedItemTypeformationrecue.$selected = false;
								vm.selectedItemTypeformationrecue.$edit = false;
								vm.selectedItemTypeformationrecue ={};
								break;
							}
							case 11:  {
								vm.selectedItemSituationmatrimoniale.description = possession.description;
								vm.selectedItemSituationmatrimoniale.$selected = false;
								vm.selectedItemSituationmatrimoniale.$edit = false;
								vm.selectedItemSituationmatrimoniale ={};
								break;
							}
							default: {
								break;
							}
						}				
					} else {    
						switch(vm.cas) {
							case 1:  {
								vm.allRecordsLiendeparente = vm.allRecordsLiendeparente.filter(function(obj) {
									return obj.id !== vm.selectedItemLiendeparente.id;
								});
								break;
							}
							case 2:  {
								vm.allRecordsHandicapvisuel = vm.allRecordsHandicapvisuel.filter(function(obj) {
									return obj.id !== vm.selectedItemHandicapvisuel.id;
								});
								break;
							}
							case 3:  {
								vm.allRecordsHandicapparole = vm.allRecordsHandicapparole.filter(function(obj) {
									return obj.id !== vm.selectedItemHandicapparole.id;
								});
								break;
							}
							case 4:  {
								vm.allRecordsHandicapauditif = vm.allRecordsHandicapauditif.filter(function(obj) {
									return obj.id !== vm.selectedItemHandicapauditif.id;
								});
								break;
							}
							case 5:  {
								vm.allRecordsHandicapmental = vm.allRecordsHandicapmental.filter(function(obj) {
									return obj.id !== vm.selectedItemHandicapmental.id;
								});
								break;
							}
							case 6:  {
								vm.allRecordsHandicapmoteur = vm.allRecordsHandicapmoteur.filter(function(obj) {
									return obj.id !== vm.selectedItemHandicapmoteur.id;
								});
								break;
							}
							case 7:  {
								vm.allRecordsVaccin = vm.allRecordsVaccin.filter(function(obj) {
									return obj.id !== vm.selectedItemVaccin.id;
								});
								break;
							}
							case 8:  {
								vm.allRecordsTypemariage = vm.allRecordsTypemariage.filter(function(obj) {
									return obj.id !== vm.selectedItemTypemariage.id;
								});
								break;
							}
							case 9:  {
								vm.allRecordsTypeviolence = vm.allRecordsTypeviolence.filter(function(obj) {
									return obj.id !== vm.selectedItemTypeviolence.id;
								});
								break;
							}
							case 10:  {
								vm.allRecordsTypeformationrecue = vm.allRecordsTypeformationrecue.filter(function(obj) {
									return obj.id !== vm.selectedItemTypeformationrecue.id;
								});
								break;
							}
							case 11:  {
								vm.allRecordsSituationmatrimoniale = vm.allRecordsSituationmatrimoniale.filter(function(obj) {
									return obj.id !== vm.selectedItemTypeformationrecue.id;
								});
								break;
							}
							default: {
								break;
							}
						}				
					}
				} else {
					possession.id=data.response;	
					NouvelItem=false;
				}
				possession.$selected=false;
				possession.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
		vm.showAlert = function(titre,textcontent) {
			// Appending dialog to document.body to cover sidenav in docs app
			// Modal dialogs should fully cover application
			// to prevent interaction outside of dialog
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
		// Liendeparente
        vm.selectionLiendeparente= function (item) {     
            vm.selectedItemLiendeparente = item;
        };
        $scope.$watch('vm.selectedItemLiendeparente', function() {
			if (!vm.allRecordsLiendeparente) return;
			vm.allRecordsLiendeparente.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemLiendeparente.$selected = true;
        });
        vm.ajouterLiendeparente = function () {
            vm.selectedItemLiendeparente.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsLiendeparente.push(items);
		    vm.allRecordsLiendeparente.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemLiendeparente = it;
				}
			});			
        };
        vm.annulerLiendeparente = function(item) {
			if (!item.id) {
				vm.allRecordsLiendeparente.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemLiendeparente = {} ;
			vm.selectedItemLiendeparente.$selected = false;
       };
        vm.modifierLiendeparente = function(item) {
			NouvelItem = false ;
			vm.selectedItemLiendeparente = item;
			currentItem = angular.copy(vm.selectedItemLiendeparente);
			$scope.vm.allRecordsLiendeparente.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemLiendeparente.description = vm.selectedItemLiendeparente.description;
			vm.selectedItemLiendeparente.$edit = true;	
        };
        vm.supprimerLiendeparente = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemLiendeparente,1);
			}, function() {
			});
        }
		// Liendeparente
		// Handicap visuel
        vm.selectionHandicapvisuel= function (item) {     
            vm.selectedItemHandicapvisuel = item;
        };
        $scope.$watch('vm.selectedItemHandicapvisuel', function() {
			if (!vm.allRecordsHandicapvisuel) return;
			vm.allRecordsHandicapvisuel.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemHandicapvisuel.$selected = true;
        });
        vm.ajouterHandicapvisuel = function () {
            vm.selectedItemHandicapvisuel.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsHandicapvisuel.push(items);
		    vm.allRecordsHandicapvisuel.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemHandicapvisuel = it;
				}
			});			
        };
        vm.annulerHandicapvisuel = function(item) {
			if (!item.id) {
				vm.allRecordsLiendeparente.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemHandicapvisuel = {} ;
			vm.selectedItemHandicapvisuel.$selected = false;
       };
        vm.modifierHandicapvisuel = function(item) {
			NouvelItem = false ;
			vm.selectedItemHandicapvisuel = item;
			currentItem = angular.copy(vm.selectedItemHandicapvisuel);
			$scope.vm.allRecordsLiendeparente.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemHandicapvisuel.description = vm.selectedItemHandicapvisuel.description;
			vm.selectedItemHandicapvisuel.$edit = true;	
        };
        vm.supprimerHandicapvisuel = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemHandicapvisuel,1);
			}, function() {
			});
        }
		// Handicap visuel
		// Handicap parole
        vm.selectionHandicapparole= function (item) {     
            vm.selectedItemHandicapparole = item;
        };
        $scope.$watch('vm.selectedItemHandicapparole', function() {
			if (!vm.allRecordsHandicapparole) return;
			vm.allRecordsHandicapparole.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemHandicapparole.$selected = true;
        });
        vm.ajouterHandicapparole = function () {
            vm.selectedItemHandicapparole.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsHandicapparole.push(items);
		    vm.allRecordsHandicapparole.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemHandicapparole = it;
				}
			});			
        };
        vm.annulerHandicapparole = function(item) {
			if (!item.id) {
				vm.allRecordsHandicapparole.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemHandicapparole = {} ;
			vm.selectedItemHandicapparole.$selected = false;
       };
        vm.modifierHandicapparole = function(item) {
			NouvelItem = false ;
			vm.selectedItemHandicapparole = item;
			currentItem = angular.copy(vm.selectedItemHandicapparole);
			$scope.vm.allRecordsLiendeparente.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemHandicapparole.description = vm.selectedItemHandicapparole.description;
			vm.selectedItemHandicapparole.$edit = true;	
        };
        vm.supprimerHandicapparole = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemHandicapparole,1);
			}, function() {
			});
        }
		// Handicap parole
		// Handicap auditif
        vm.selectionHandicapauditif= function (item) {     
            vm.selectedItemHandicapauditif = item;
        };
        $scope.$watch('vm.selectedItemHandicapauditif', function() {
			if (!vm.allRecordsHandicapauditif) return;
			vm.allRecordsHandicapauditif.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemHandicapauditif.$selected = true;
        });
        vm.ajouterHandicapauditif = function () {
            vm.selectedItemHandicapauditif.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsHandicapauditif.push(items);
		    vm.allRecordsHandicapauditif.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemHandicapauditif = it;
				}
			});			
        };
        vm.annulerHandicapauditif = function(item) {
			if (!item.id) {
				vm.allRecordsHandicapauditif.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemHandicapauditif = {} ;
			vm.selectedItemHandicapauditif.$selected = false;
       };
        vm.modifierHandicapauditif= function(item) {
			NouvelItem = false ;
			vm.selectedItemHandicapauditif = item;
			currentItem = angular.copy(vm.selectedItemHandicapauditif);
			$scope.vm.allRecordsLiendeparente.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemHandicapauditif.description = vm.selectedItemHandicapauditif.description;
			vm.selectedItemHandicapauditif.$edit = true;	
        };
        vm.supprimerHandicapauditif = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemHandicapauditif,1);
			}, function() {
			});
        }
		// Handicap auditif
		// Handicap mental
        vm.selectionHandicapmental= function (item) {     
            vm.selectedItemHandicapmental = item;
        };
        $scope.$watch('vm.selectedItemHandicapmental', function() {
			if (!vm.allRecordsHandicapmental) return;
			vm.allRecordsHandicapmental.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemHandicapmental.$selected = true;
        });
        vm.ajouterHandicapmental = function () {
            vm.selectedItemHandicapmental.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsHandicapmental.push(items);
		    vm.allRecordsHandicapmental.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemHandicapmental = it;
				}
			});			
        };
        vm.annulerHandicapmental = function(item) {
			if (!item.id) {
				vm.allRecordsHandicapmental.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemHandicapmental = {} ;
			vm.selectedItemHandicapmental.$selected = false;
       };
        vm.modifierHandicapmental = function(item) {
			NouvelItem = false ;
			vm.selectedItemHandicapmental = item;
			currentItem = angular.copy(vm.selectedItemHandicapmental);
			$scope.vm.allRecordsLiendeparente.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemHandicapmental.description = vm.selectedItemHandicapmental.description;
			vm.selectedItemHandicapmental.$edit = true;	
        };
        vm.supprimerHandicapmental = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemHandicapmental,1);
			}, function() {
			});
        }
		// Handicap mental
		// Handicap moteur
        vm.selectionHandicapmoteur= function (item) {     
            vm.selectedItemHandicapmoteur = item;
        };
        $scope.$watch('vm.selectedItemHandicapmoteur', function() {
			if (!vm.allRecordsHandicapmoteur) return;
			vm.allRecordsHandicapmoteur.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemHandicapmoteur.$selected = true;
        });
        vm.ajouterHandicapmoteur = function () {
            vm.selectedItemHandicapmoteur.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsHandicapmoteur.push(items);
		    vm.allRecordsHandicapmoteur.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemHandicapmoteur = it;
				}
			});			
        };
        vm.annulerHandicapmoteur = function(item) {
			if (!item.id) {
				vm.allRecordsHandicapmoteur.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemHandicapmoteur = {} ;
			vm.selectedItemHandicapmoteur.$selected = false;
       };
        vm.modifierHandicapmoteur = function(item) {
			NouvelItem = false ;
			vm.selectedItemHandicapmoteur = item;
			currentItem = angular.copy(vm.selectedItemHandicapmoteur);
			$scope.vm.allRecordsLiendeparente.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemHandicapmoteur.description = vm.selectedItemHandicapmoteur.description;
			vm.selectedItemHandicapmoteur.$edit = true;	
        };
        vm.supprimerHandicapmoteur = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemHandicapmoteur,1);
			}, function() {
			});
        }
		// Handicap moteur
		// Vaccin
        vm.selectionVaccin= function (item) {     
            vm.selectedItemVaccin = item;
        };
        $scope.$watch('vm.selectedItemVaccin', function() {
			if (!vm.allRecordsVaccin) return;
			vm.allRecordsVaccin.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemVaccin.$selected = true;
        });
        vm.ajouterVaccin = function () {
            vm.selectedItemVaccin.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsVaccin.push(items);
		    vm.allRecordsVaccin.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemVaccin = it;
				}
			});			
        };
        vm.annulerVaccin = function(item) {
			if (!item.id) {
				vm.allRecordsVaccin.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemVaccin = {} ;
			vm.selectedItemVaccin.$selected = false;
       };
        vm.modifierVaccin = function(item) {
			NouvelItem = false ;
			vm.selectedItemVaccin = item;
			currentItem = angular.copy(vm.selectedItemVaccin);
			$scope.vm.allRecordsLiendeparente.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemVaccin.description = vm.selectedItemVaccin.description;
			vm.selectedItemVaccin.$edit = true;	
        };
        vm.supprimerVaccin = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemVaccin,1);
			}, function() {
			});
        }
		// Vaccin
		// Début Type mariage
        vm.selectionTypemariage= function (item) {     
            vm.selectedItemTypemariage = item;
        };
        $scope.$watch('vm.selectedItemTypemariage', function() {
			if (!vm.allRecordsTypemariage) return;
			vm.allRecordsTypemariage.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypemariage.$selected = true;
        });
        vm.ajouterTypemariage = function () {
            vm.selectedItemTypemariage.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypemariage.push(items);
		    vm.allRecordsTypemariage.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypemariage = it;
				}
			});			
        };
        vm.annulerTypemariage = function(item) {
			if (!item.id) {
				vm.allRecords.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemTypemariage = {} ;
			vm.selectedItemTypemariage.$selected = false;
       };
        vm.modifierTypemariage = function(item) {
			NouvelItem = false ;
			vm.selectedItemTypemariage = item;
			currentItem = angular.copy(vm.selectedItemTypemariage);
			$scope.vm.allRecordsTypemariage.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypemariage.description = vm.selectedItemTypemariage.description;
			vm.selectedItemTypemariage.$edit = true;	
        };
        vm.supprimerTypemariage = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemTypemariage,1);
			}, function() {
			});
        }
		// Fin Type mariage
		// Début Type violence
        vm.selectionTypeviolence= function (item) {     
            vm.selectedItemTypeviolence = item;
        };
        $scope.$watch('vm.selectedItemTypeviolence', function() {
			if (!vm.allRecordsTypeviolence) return;
			vm.allRecordsTypeviolence.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypeviolence.$selected = true;
        });
        vm.ajouterTypeviolence = function () {
            vm.selectedItemTypeviolence.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypeviolence.push(items);
		    vm.allRecordsTypeviolence.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypeviolence = it;
				}
			});			
        };
        vm.annulerTypeviolence = function(item) {
			if (!item.id) {
				vm.allRecords.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemTypeviolence = {} ;
			vm.selectedItemTypeviolence.$selected = false;
       };
        vm.modifierTypeviolence = function(item) {
			NouvelItem = false ;
			vm.selectedItemTypeviolence = item;
			currentItem = angular.copy(vm.selectedItemTypeviolence);
			$scope.vm.allRecordsTypeviolence.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypeviolence.description = vm.selectedItemTypeviolence.description;
			vm.selectedItemTypeviolence.$edit = true;	
        };
        vm.supprimerTypeviolence = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemTypeviolence,1);
			}, function() {
			});
        }
		// Fin Type violence		
		// Début Type formation reçue
        vm.selectionTypeformationrecue= function (item) {     
            vm.selectedItemTypeformationrecue = item;
        };
        $scope.$watch('vm.selectedItemTypeformationrecue', function() {
			if (!vm.allRecordsTypeformationrecue) return;
			vm.allRecordsTypeformationrecue.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypeformationrecue.$selected = true;
        });
        vm.ajouterTypeformationrecue = function () {
            vm.selectedItemTypeformationrecue.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypeformationrecue.push(items);
		    vm.allRecordsTypeformationrecue.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypeformationrecue = it;
				}
			});			
        };
        vm.annulerTypeformationrecue = function(item) {
			if (!item.id) {
				vm.allRecords.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemTypeformationrecue = {} ;
			vm.selectedItemTypeformationrecue.$selected = false;
       };
        vm.modifierTypeformationrecue = function(item) {
			NouvelItem = false ;
			vm.selectedItemTypeformationrecue = item;
			currentItem = angular.copy(vm.selectedItemTypeformationrecue);
			$scope.vm.allRecordsTypeformationrecue.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypeformationrecue.description = vm.selectedItemTypeformationrecue.description;
			vm.selectedItemTypeformationrecue.$edit = true;	
        };
        vm.supprimerTypeformationrecue = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemTypeformationrecue,1);
			}, function() {
			});
        }
		// Fin Type formation reçue		
		// Début Situation matrimoniale 
        vm.selectionSituationmatrimoniale= function (item) {     
            vm.selectedItemSituationmatrimoniale = item;
        };
        $scope.$watch('vm.selectedItemSituationmatrimoniale', function() {
			if (!vm.allRecordsSituationmatrimoniale) return;
			vm.allRecordsSituationmatrimoniale.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemSituationmatrimoniale.$selected = true;
        });
        vm.ajouterSituationmatrimoniale = function () {
            vm.selectedItemSituationmatrimoniale.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsSituationmatrimoniale.push(items);
		    vm.allRecordsSituationmatrimoniale.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemSituationmatrimoniale = it;
				}
			});			
        };
        vm.annulerSituationmatrimoniale = function(item) {
			if (!item.id) {
				vm.allRecords.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemSituationmatrimoniale = {} ;
			vm.selectedItemSituationmatrimoniale.$selected = false;
       };
        vm.modifierSituationmatrimoniale = function(item) {
			NouvelItem = false ;
			vm.selectedItemSituationmatrimoniale = item;
			currentItem = angular.copy(vm.selectedItemSituationmatrimoniale);
			$scope.vm.allRecordsSituationmatrimoniale.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemSituationmatrimoniale.description = vm.selectedItemSituationmatrimoniale.description;
			vm.selectedItemSituationmatrimoniale.$edit = true;	
        };
        vm.supprimerSituationmatrimoniale = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemSituationmatrimoniale,1);
			}, function() {
			});
        }
		// Fin Situation matrimoniale
        function test_existence (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					switch(vm.cas) {
						case 1:  {
							vm.allRecordsLiendeparente.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 2:  {
							vm.allRecordsHandicapvisuel.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 3:  {
							vm.allRecordsHandicapparole.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 4:  { 
							vm.allRecordsHandicapauditif.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 5:  {
							vm.allRecordsHandicapmental.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 6:  {
							vm.allRecordsHandicapmoteur.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 7:  {
							vm.allRecordsVaccin.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 8:  {
							vm.allRecordsTypemariage.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 9:  {
							vm.allRecordsTypeviolence.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 10:  {
							vm.allRecordsTypeformationrecue.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 11:  {
							vm.allRecordsSituationmatrimoniale.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						default: {
							break;
						}
					}				
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Description déjà utilisé')
					} else {
						insert_in_base(item,0);
					}
				} else {
				  insert_in_base(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir la description !");
			}		
        }
    }
})();
