(function ()
{
    'use strict';
    angular
        .module('app.comores.ddb.ddbprojet')
        .controller('DdbprojetController', DdbprojetController);

    /** @ngInject */
    function DdbprojetController(apiFactory, $state, $mdDialog, $scope, serveur_central) {
		var vm = this;
		vm.serveur_central = serveur_central ;
		vm.titrepage ="Ajout Tutelle";
		vm.ajoutDevise = ajoutDevise ;
		var NouvelItemDevise=false;
		var currentItemDevise;
		vm.selectedItemDevise = {} ;
		vm.allRecordsDevise = [] ;

		vm.ajoutTutelle = ajoutTutelle ;
		var NouvelItemTutelle=false;
		var currentItemTutelle;
		vm.selectedItemTutelle = {} ;
		vm.allRecordsTutelle = [] ;
		
		vm.ajoutSourcefinancement = ajoutSourcefinancement ;
		var NouvelItemSourcefinancement=false;
		var currentItemSourcefinancement;
		vm.selectedItemSourcefinancement = {} ;
		vm.allRecordsSourcefinancement = [] ;
		
		vm.ajoutTypefinancement = ajoutTypefinancement ;
		var NouvelItemTypefinancement=false;
		var currentItem;
		vm.selectedItemTypefinancement = {} ;
		vm.allRecordsTypefinancement = [] ;
		
		vm.ajoutSecteur = ajoutSecteur ;
		var NouvelItemSecteur=false;
		var currentItemSecteur;
		vm.selectedItemSecteur = {} ;
		vm.allRecordsSecteur = [] ;
		
		vm.ajoutTypeaction = ajoutTypeaction ;
		var NouvelItemTypeaction=false;
		var currentItemTypeaction;
		vm.selectedItemTypeaction = {} ;
		vm.allRecordsTypeaction = [] ;
		
		vm.ajoutAxestrategique = ajoutAxestrategique ;
		var NouvelItemAxestrategique=false;
		var currentItemAxestrategique;
		vm.selectedItemAxestrategique = {} ;
		vm.allRecordsAxestrategique = [] ;
		
		vm.ajoutActionstrategique = ajoutActionstrategique ;
		var NouvelItemActionstrategique=false;
		var currentItemActionstrategique;
		vm.selectedItemActionstrategique = {} ;
		vm.allRecordsActionstrategique = [] ;
		
		vm.ajoutTypeaction = ajoutTypeaction ;
		var NouvelItemTypeaction=false;
		var currentItemTypeaction;
		vm.selectedItemTypeaction = {} ;
		vm.allRecordsTypeaction = [] ;
		
		vm.ajoutTypedetransfert = ajoutTypedetransfert ;
		var NouvelItemTypedetransfert=false;
		var currentItemTypedetransfert;
		vm.selectedItemTypedetransfert = {} ;
		vm.allRecordsTypedetransfert = [] ;

		vm.ajoutTypebeneficiaire = ajoutTypebeneficiaire ;
		var NouvelItemTypebeneficiaire=false;
		var currentItemTypebeneficiaire;
		vm.selectedItemTypebeneficiaire = {} ;
		vm.allRecordsTypebeneficiaire = [] ;
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
		vm.donnateur_column = [{titre:"Nom"},{titre:"Actions"}];
		vm.financement_column = [{titre:"Intitulé"},{titre:"Actions"}];
		vm.typebeneficiaire_column = [{titre:"Intitulé"},{titre:"Actions"}];
		/*apiFactory.getAll("devise/index").then(function(result){
			vm.allRecordsDevise = result.data.response;
		});    
		apiFactory.getAll("tutelle/index").then(function(result){
			vm.allRecordsTutelle = result.data.response;
		});   */ 
		apiFactory.getAll("source_financement/index").then(function(result){
			vm.allRecordsSourcefinancement = result.data.response;
		});  
		apiFactory.getAll("type_financement/index").then(function(result){
			vm.allRecordsTypefinancement = result.data.response;
		});    
		apiFactory.getAll("type_secteur/index").then(function(result){
			vm.allRecordsSecteur = result.data.response;
		});    
		/*apiFactory.getAll("type_action/index").then(function(result){
			vm.allRecordsTypeaction = result.data.response;
		});    
		apiFactory.getAll("axe_strategisue/index").then(function(result){
			vm.allRecordsAxestrategique = result.data.response;
		});    
		apiFactory.getAll("action_strategique/index").then(function(result){
			vm.allRecordsActionstrategique = result.data.response;
		});  */  
		apiFactory.getAll("type_transfert/index").then(function(result){
			vm.allRecordsTypedetransfert = result.data.response;
		});    
		/*apiFactory.getAll("type_beneficiaire/index").then(function(result){
			vm.allRecordsTypebeneficiaire = result.data.response;
		}); */   

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

				console.log(ddb);
				var datas_suppr = $.param({
						supprimer:1,
						nom_table: table,
					}); 

				apiFactory.add("delete_ddb/index",datas_suppr, config).success(function (data) {//delete

						//add ddb
							ddb.forEach( function(element, index) {

								

								if (table == 'source_financement') 
								{
									var datas = $.param({
										supprimer:0,
										id:element.id,      
										nom: element.nom,
										nom_table: table,
									});  
								}
								else
								{
									var datas = $.param({
										supprimer:0,
										id:element.id,      
										description: element.description,
										nom_table: table,
									});  
								}


								apiFactory.add("delete_ddb/index",datas, config).success(function (data) 
								{
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
					case "source_financement":
						vm.allRecordsSourcefinancement = ddb ;
						break;

					case "type_transfert":
						vm.allRecordsTypedetransfert = ddb ;
						break;
					
					
					default:

						break;
				}

			});  
		}

		// DEBUT DEVISE
		function ajoutDevise(entite,suppression) {
            test_existenceDevise (entite,suppression);
        }
        function insert_in_baseDevise(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemDevise==false) {
			   getId = vm.selectedItemDevise.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: entite.description,
			});       
			//factory
			apiFactory.add("devise/index",datas, config).success(function (data) {
				if (NouvelItemDevise == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemDevise.description = entite.description;
					  vm.selectedItemDevise.$selected = false;
					  vm.selectedItemDevise.$edit = false;
					  vm.selectedItemDevise ={};
					} else {    
						vm.allRecordsDevise = vm.allRecordsDevise.filter(function(obj) {
							return obj.id !== vm.selectedItemDevise.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemDevise=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionDevise= function (item) {     
            vm.selectedItemDevise = item;
        };
        $scope.$watch('vm.selectedItemDevise', function() {
			if (!vm.allRecordsDevise) return;
			vm.allRecordsDevise.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemDevise.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterDevise = function () {
            vm.selectedItemDevise.$selected = false;
            NouvelItemDevise = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsDevise.push(items);
		    vm.allRecordsDevise.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemDevise = it;
				}
			});			
        };
        vm.annulerDevise = function(item) {
			if (!item.id) {
				vm.allRecordsDevise.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemDevise = false;
			 item.description = currentItemDevise.description;
			vm.selectedItemDevise = {} ;
			vm.selectedItemDevise.$selected = false;
		};
        vm.modifierDevise = function(item) {
			NouvelItemDevise = false ;
			vm.selectedItemDevise = item;
			currentItemDevise = angular.copy(vm.selectedItemDevise);
			$scope.vm.allRecordsDevise.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemDevise.description = vm.selectedItemDevise.description;
			vm.selectedItemDevise.$edit = true;	
        };
        vm.supprimerDevise = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutDevise(vm.selectedItemDevise,1);
			}, function() {
			});
        }
        function test_existenceDevise (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsDevise.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_baseDevise(item,0);
					}
				} else {
				  insert_in_baseDevise(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
			}		
        }
		// FIN DEVISE
		// DEBUT TUTELLE
		function ajoutTutelle(entite,suppression) {
            test_existenceTutelle (entite,suppression);
        }
        function insert_in_baseTutelle(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemTutelle==false) {
			   getId = vm.selectedItemTutelle.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				nom: entite.nom,
			});       
			//factory
			apiFactory.add("tutelle/index",datas, config).success(function (data) {
				if (NouvelItemTutelle == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemTutelle.nom = entite.nom;
					  vm.selectedItemTutelle.$selected = false;
					  vm.selectedItemTutelle.$edit = false;
					  vm.selectedItemTutelle ={};
					} else {    
						vm.allRecordsTutelle = vm.allRecordsTutelle.filter(function(obj) {
							return obj.id !== vm.selectedItemTutelle.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemTutelle=false;
				}
				entite.$selected=false;
				entite.$edit=false;
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
        vm.selectionTutelle= function (item) {     
            vm.selectedItemTutelle = item;
        };
        $scope.$watch('vm.selectedItemTutelle', function() {
			if (!vm.allRecordsTutelle) return;
			vm.allRecordsTutelle.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTutelle.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterTutelle = function () {
            vm.selectedItemTutelle.$selected = false;
            NouvelItemTutelle = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                nom: '',
			};
			vm.allRecordsTutelle.push(items);
		    vm.allRecordsTutelle.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTutelle = it;
				}
			});			
        };
        vm.annulerTutelle = function(item) {
			if (!item.id) {
				vm.allRecordsTutelle.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemTutelle = false;
			 item.nom = currentItemTutelle.nom;
			vm.selectedItemTutelle = {} ;
			vm.selectedItemTutelle.$selected = false;
       };
        vm.modifierTutelle = function(item) {
			NouvelItemTutelle = false ;
			vm.selectedItemTutelle = item;
			currentItemTutelle = angular.copy(vm.selectedItemTutelle);
			$scope.vm.allRecordsTutelle.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTutelle.nom = vm.selectedItemTutelle.nom;
			vm.selectedItemTutelle.$edit = true;	
        };
        vm.supprimerTutelle = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutTutelle(vm.selectedItemTutelle,1);
			}, function() {
			});
        }
        function test_existenceTutelle (item,suppression) {    
			if(item.nom.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsTutelle.forEach(function(dispo) {   
						if((dispo.nom==item.nom) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Nom déjà utilisé')
					} else {
						insert_in_baseTutelle(item,0);
					}
				} else {
				  insert_in_baseTutelle(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir le nom du tutelle de projet !");
			}		
        }
	// FIN TUTELLE	
	// DEBUT BAILLEUR	
		function ajoutSourcefinancement(entite,suppression) {
            test_existenceSourcefinancement (entite,suppression);
        }
        function insert_in_baseSourcefinancement(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemSourcefinancement==false) {
			   getId = vm.selectedItemSourcefinancement.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				nom: entite.nom,
			});       
			//factory
			apiFactory.add("source_financement/index",datas, config).success(function (data) {
				if (NouvelItemSourcefinancement == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemSourcefinancement.nom = entite.nom;
					  vm.selectedItemSourcefinancement.$selected = false;
					  vm.selectedItemSourcefinancement.$edit = false;
					  vm.selectedItemSourcefinancement ={};
					} else {    
						vm.allRecordsSourcefinancement = vm.allRecordsSourcefinancement.filter(function(obj) {
							return obj.id !== vm.selectedItemSourcefinancement.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemSourcefinancement=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionSourcefinancement= function (item) {     
            vm.selectedItemSourcefinancement = item;
        };
        $scope.$watch('vm.selectedItemSourcefinancement', function() {
			if (!vm.allRecordsSourcefinancement) return;
			vm.allRecordsSourcefinancement.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemSourcefinancement.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterSourcefinancement = function () {
            vm.selectedItemSourcefinancement.$selected = false;
            NouvelItemSourcefinancement = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                nom: '',
			};
			vm.allRecordsSourcefinancement.push(items);
		    vm.allRecordsSourcefinancement.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemSourcefinancement = it;
				}
			});			
        };
        vm.annulerSourcefinancement = function(item) {
			if (!item.id) {
				vm.allRecordsSourcefinancement.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemSourcefinancement = false;
			 item.nom = currentItemSourcefinancement.nom;
			vm.selectedItemSourcefinancement = {} ;
			vm.selectedItemSourcefinancement.$selected = false;
       };
        vm.modifierSourcefinancement = function(item) {
			NouvelItemSourcefinancement = false ;
			vm.selectedItemSourcefinancement = item;
			currentItemSourcefinancement = angular.copy(vm.selectedItemSourcefinancement);
			$scope.vm.allRecordsSourcefinancement.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemSourcefinancement.nom = vm.selectedItemSourcefinancement.nom;
			vm.selectedItemSourcefinancement.$edit = true;	
        };
        vm.supprimerSourcefinancement = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutSourcefinancement(vm.selectedItemSourcefinancement,1);
			}, function() {
			});
        }
        function test_existenceSourcefinancement (item,suppression) {    
			if(item.nom.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsSourcefinancement.forEach(function(dispo) {   
						if((dispo.nom==item.nom) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Nom déjà utilisé')
					} else {
						insert_in_baseSourcefinancement(item,0);
					}
				} else {
				  insert_in_baseSourcefinancement(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir le nom du bailleur de projet !");
			}		
        }
	// FIN BAILLEUR	
	// DEBUT TYPE FINANCEMENT
		function ajoutTypefinancement(entite,suppression) {
            test_existenceTypefinancement (entite,suppression);
        }
        function insert_in_baseTypefinancement(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemTypefinancement==false) {
			   getId = vm.selectedItemTypefinancement.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				intitule: entite.intitule,
			});       
			//factory
			apiFactory.add("type_financement/index",datas, config).success(function (data) {
				if (NouvelItemTypefinancement == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemTypefinancement.intitule = entite.intitule;
					  vm.selectedItemTypefinancement.$selected = false;
					  vm.selectedItemTypefinancement.$edit = false;
					  vm.selectedItemTypefinancement ={};
					} else {    
						vm.allRecordsTypefinancement = vm.allRecordsTypefinancement.filter(function(obj) {
							return obj.id !== vm.selectedItemTypefinancement.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemTypefinancement=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionTypefinancement= function (item) {     
            vm.selectedItemTypefinancement = item;
        };
        $scope.$watch('vm.selectedItemTypefinancement', function() {
			if (!vm.allRecordsTypefinancement) return;
			vm.allRecordsTypefinancement.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypefinancement.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterTypefinancement = function () {
            vm.selectedItemTypefinancement.$selected = false;
            NouvelItemTypefinancement = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                intitule: '',
			};
			vm.allRecordsTypefinancement.push(items);
		    vm.allRecordsTypefinancement.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypefinancement = it;
				}
			});			
        };
        vm.annulerTypefinancement = function(item) {
			if (!item.id) {
				vm.allRecordsTypefinancement.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemTypefinancement = false;
			 item.intitule = currentItem.intitule;
			vm.selectedItemTypefinancement = {} ;
			vm.selectedItemTypefinancement.$selected = false;
       };
        vm.modifierTypefinancement = function(item) {
			NouvelItemTypefinancement = false ;
			vm.selectedItemTypefinancement = item;
			currentItem = angular.copy(vm.selectedItemTypefinancement);
			$scope.vm.allRecordsTypefinancement.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypefinancement.intitule = vm.selectedItemTypefinancement.intitule;
			vm.selectedItemTypefinancement.$edit = true;	
        };
        vm.supprimerTypefinancement = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutTypefinancement(vm.selectedItemTypefinancement,1);
			}, function() {
			});
        }
        function test_existenceTypefinancement (item,suppression) { 
			if(parseInt(suppression)==0) {
				if(item.intitule.length > 0) {
					var doublon = 0;
					if (suppression!=1) {
						vm.allRecordsTypefinancement.forEach(function(dispo) {   
							if((dispo.intitule==item.intitule) && dispo.id!=item.id) {
								doublon=1;	
							} 
						});
						if(doublon==1) {
							vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
						} else {
							insert_in_baseTypefinancement(item,0);
						}
					} else {
					  insert_in_baseTypefinancement(item,suppression);
					}  
				} else {
					vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
				}		
			} else {
				insert_in_baseTypefinancement(item,suppression);
			}	
        }
	// FIN TYPE FINANCEMENT
	// DEBUT SECTEUR
		function ajoutSecteur(entite,suppression) {
            test_existenceSecteur (entite,suppression);
        }
        function insert_in_baseSecteur(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemSecteur==false) {
			   getId = vm.selectedItemSecteur.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				nom: entite.nom,
			});       
			//factory
			apiFactory.add("type_secteur/index",datas, config).success(function (data) {
				if (NouvelItemSecteur == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemSecteur.nom = entite.nom;
					  vm.selectedItemSecteur.$selected = false;
					  vm.selectedItemSecteur.$edit = false;
					  vm.selectedItemSecteur ={};
					} else {    
						vm.allRecordsSecteur = vm.allRecordsSecteur.filter(function(obj) {
							return obj.id !== vm.selectedItemSecteur.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemSecteur=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionSecteur= function (item) {     
            vm.selectedItemSecteur = item;
        };
        $scope.$watch('vm.selectedItemSecteur', function() {
			if (!vm.allRecordsSecteur) return;
			vm.allRecordsSecteur.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemSecteur.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterSecteur = function () {
            vm.selectedItemSecteur.$selected = false;
            NouvelItemSecteur = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                nom: '',
			};
			vm.allRecordsSecteur.push(items);
		    vm.allRecordsSecteur.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemSecteur = it;
				}
			});			
        };
        vm.annulerSecteur = function(item) {
			if (!item.id) {
				vm.allRecordsSecteur.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemSecteur = false;
			 item.nom = currentItemSecteur.nom;
			vm.selectedItemSecteur = {} ;
			vm.selectedItemSecteur.$selected = false;
       };
        vm.modifierSecteur = function(item) {
			NouvelItemSecteur = false ;
			vm.selectedItemSecteur = item;
			currentItemSecteur = angular.copy(vm.selectedItemSecteur);
			$scope.vm.allRecordsSecteur.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemSecteur.nom = vm.selectedItemSecteur.nom;
			vm.selectedItemSecteur.$edit = true;	
        };
        vm.supprimerSecteur = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutSecteur(vm.selectedItemSecteur,1);
			}, function() {
			});
        }
        function test_existenceSecteur (item,suppression) {    
			if(item.nom.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsSecteur.forEach(function(dispo) {   
						if((dispo.nom==item.nom) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Nom déjà utilisé')
					} else {
						insert_in_baseSecteur(item,0);
					}
				} else {
				  insert_in_baseSecteur(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir le nom du secteur de projet !");
			}		
        }
	// FIN SECTEUR
	// DEBUT TYPE ACTION
		function ajoutTypeaction(entite,suppression) {
            test_existenceTypeaction (entite,suppression);
        }
        function insert_in_baseTypeaction(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemTypeaction==false) {
			   getId = vm.selectedItemTypeaction.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: entite.description,
			});       
			//factory
			apiFactory.add("type_action/index",datas, config).success(function (data) {
				if (NouvelItemTypeaction == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemTypeaction.description = entite.description;
					  vm.selectedItemTypeaction.$selected = false;
					  vm.selectedItemTypeaction.$edit = false;
					  vm.selectedItemTypeaction ={};
					} else {    
						vm.allRecordsTypeaction = vm.allRecordsTypeaction.filter(function(obj) {
							return obj.id !== vm.selectedItemTypeaction.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemTypeaction=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionTypeaction= function (item) {     
            vm.selectedItemTypeaction = item;
        };
        $scope.$watch('vm.selectedItemTypeaction', function() {
			if (!vm.allRecordsTypeaction) return;
			vm.allRecordsTypeaction.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypeaction.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterTypeaction = function () {
            vm.selectedItemTypeaction.$selected = false;
            NouvelItemTypeaction = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypeaction.push(items);
		    vm.allRecordsTypeaction.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypeaction = it;
				}
			});			
        };
        vm.annulerTypeaction = function(item) {
			if (!item.id) {
				vm.allRecordsTypeaction.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemTypeaction = false;
			 item.description = currentItemTypeaction.description;
			vm.selectedItemTypeaction = {} ;
			vm.selectedItemTypeaction.$selected = false;
       };
        vm.modifierTypeaction = function(item) {
			NouvelItemTypeaction = false ;
			vm.selectedItemTypeaction = item;
			currentItemTypeaction = angular.copy(vm.selectedItemTypeaction);
			$scope.vm.allRecordsTypeaction.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypeaction.description = vm.selectedItemTypeaction.description;
			vm.selectedItemTypeaction.$edit = true;	
        };
        vm.supprimerTypeaction = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutTypeaction(vm.selectedItemTypeaction,1);
			}, function() {
			});
        }
        function test_existenceTypeaction (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsTypeaction.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_baseTypeaction(item,0);
					}
				} else {
				  insert_in_baseTypeaction(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
			}		
        }
	// FIN TYPE ACTION
	// DEBUT AXE STRATEGIQUE
		function ajoutAxestrategique(entite,suppression) {
            test_existenceAxestrategique (entite,suppression);
        }
        function insert_in_baseAxestrategique(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemAxestrategique==false) {
			   getId = vm.selectedItemAxestrategique.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: entite.description,
			});       
			//factory
			apiFactory.add("axe_strategique/index",datas, config).success(function (data) {
				if (NouvelItemAxestrategique == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemAxestrategique.description = entite.description;
					  vm.selectedItemAxestrategique.$selected = false;
					  vm.selectedItemAxestrategique.$edit = false;
					  vm.selectedItemAxestrategique ={};
					} else {    
						vm.allRecordsAxestrategique = vm.allRecordsAxestrategique.filter(function(obj) {
							return obj.id !== vm.selectedItemAxestrategique.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemAxestrategique=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionAxestrategique= function (item) {     
            vm.selectedItemAxestrategique = item;
        };
        $scope.$watch('vm.selectedItemAxestrategique', function() {
			if (!vm.allRecordsAxestrategique) return;
			vm.allRecordsAxestrategique.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemAxestrategique.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterAxestrategique = function () {
            vm.selectedItemAxestrategique.$selected = false;
            NouvelItemAxestrategique = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsAxestrategique.push(items);
		    vm.allRecordsAxestrategique.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemAxestrategique = it;
				}
			});			
        };
        vm.annulerAxestrategique = function(item) {
			if (!item.id) {
				vm.allRecordsAxestrategique.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemAxestrategique = false;
			 item.description = currentItemAxestrategique.description;
			vm.selectedItemAxestrategique = {} ;
			vm.selectedItemAxestrategique.$selected = false;
       };
        vm.modifierAxestrategique = function(item) {
			NouvelItemAxestrategique = false ;
			vm.selectedItemAxestrategique = item;
			currentItemAxestrategique = angular.copy(vm.selectedItemAxestrategique);
			$scope.vm.allRecordsAxestrategique.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemAxestrategique.description = vm.selectedItemAxestrategique.description;
			vm.selectedItemAxestrategique.$edit = true;	
        };
        vm.supprimerAxestrategique = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutAxestrategique(vm.selectedItemAxestrategique,1);
			}, function() {
			});
        }
        function test_existenceAxestrategique (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsAxestrategique.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_baseAxestrategique(item,0);
					}
				} else {
				  insert_in_baseAxestrategique(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
			}		
        }
	// FIN AXE STRATEGIQUE
	// DEBUT ACTION STRATEGIQUE
		function ajoutActionstrategique(entite,suppression) {
            test_existenceActionstrategique (entite,suppression);
        }
        function insert_in_baseActionstrategique(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemActionstrategique==false) {
			   getId = vm.selectedItemActionstrategique.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: entite.description,
			});       
			//factory
			apiFactory.add("action_strategique/index",datas, config).success(function (data) {
				if (NouvelItemActionstrategique == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemActionstrategique.description = entite.description;
					  vm.selectedItemActionstrategique.$selected = false;
					  vm.selectedItemActionstrategique.$edit = false;
					  vm.selectedItemActionstrategique ={};
					} else {    
						vm.allRecordsActionstrategique = vm.allRecordsActionstrategique.filter(function(obj) {
							return obj.id !== vm.selectedItemActionstrategique.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemActionstrategique=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionActionstrategique= function (item) {     
            vm.selectedItemActionstrategique = item;
        };
        $scope.$watch('vm.selectedItemActionstrategique', function() {
			if (!vm.allRecordsActionstrategique) return;
			vm.allRecordsActionstrategique.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemActionstrategique.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterActionstrategique = function () {
            vm.selectedItemActionstrategique.$selected = false;
            NouvelItemActionstrategique = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsActionstrategique.push(items);
		    vm.allRecordsActionstrategique.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemActionstrategique = it;
				}
			});			
        };
        vm.annulerActionstrategique = function(item) {
			if (!item.id) {
				vm.allRecordsActionstrategique.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemActionstrategique = false;
			 item.description = currentItemActionstrategique.description;
			vm.selectedItemActionstrategique = {} ;
			vm.selectedItemActionstrategique.$selected = false;
       };
        vm.modifierActionstrategique = function(item) {
			NouvelItemActionstrategique = false ;
			vm.selectedItemActionstrategique = item;
			currentItemActionstrategique = angular.copy(vm.selectedItemActionstrategique);
			$scope.vm.allRecordsActionstrategique.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemActionstrategique.description = vm.selectedItemActionstrategique.description;
			vm.selectedItemActionstrategique.$edit = true;	
        };
        vm.supprimerActionstrategique = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutActionstrategique(vm.selectedItemActionstrategique,1);
			}, function() {
			});
        }
        function test_existenceActionstrategique (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsActionstrategique.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_baseActionstrategique(item,0);
					}
				} else {
				  insert_in_baseActionstrategique(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
			}		
        }
	// FIN ACTION STRATEGIQUE
	// DEBUT TYPE DE TRANSFERT
		function ajoutTypedetransfert(entite,suppression) {
            test_existenceTypedetransfert (entite,suppression);
        }
        function insert_in_baseTypedetransfert(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemTypedetransfert==false) {
			   getId = vm.selectedItemTypedetransfert.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: entite.description,
			});       
			//factory
			apiFactory.add("type_transfert/index",datas, config).success(function (data) {
				if (NouvelItemTypedetransfert == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemTypedetransfert.description = entite.description;
					  vm.selectedItemTypedetransfert.$selected = false;
					  vm.selectedItemTypedetransfert.$edit = false;
					  vm.selectedItemTypedetransfert ={};
					} else {    
						vm.allRecordsTypedetransfert = vm.allRecordsTypedetransfert.filter(function(obj) {
							return obj.id !== vm.selectedItemTypedetransfert.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemTypedetransfert=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionTypedetransfert= function (item) {     
            vm.selectedItemTypedetransfert = item;
        };
        $scope.$watch('vm.selectedItemTypedetransfert', function() {
			if (!vm.allRecordsTypedetransfert) return;
			vm.allRecordsTypedetransfert.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypedetransfert.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterTypedetransfert = function () {
            vm.selectedItemTypedetransfert.$selected = false;
            NouvelItemTypedetransfert = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypedetransfert.push(items);
		    vm.allRecordsTypedetransfert.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypedetransfert = it;
				}
			});			
        };
        vm.annulerTypedetransfert = function(item) {
			if (!item.id) {
				vm.allRecordsTypedetransfert.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemTypedetransfert = false;
			 item.description = currentItemTypedetransfert.description;
			vm.selectedItemTypedetransfert = {} ;
			vm.selectedItemTypedetransfert.$selected = false;
       };
        vm.modifierTypedetransfert = function(item) {
			NouvelItemTypedetransfert = false ;
			vm.selectedItemTypedetransfert = item;
			currentItemTypedetransfert = angular.copy(vm.selectedItemTypedetransfert);
			$scope.vm.allRecordsTypedetransfert.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypedetransfert.description = vm.selectedItemTypedetransfert.description;
			vm.selectedItemTypedetransfert.$edit = true;	
        };
        vm.supprimerTypedetransfert = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutTypedetransfert(vm.selectedItemTypedetransfert,1);
			}, function() {
			});
        }
        function test_existenceTypedetransfert (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsTypedetransfert.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_baseTypedetransfert(item,0);
					}
				} else {
				  insert_in_baseTypedetransfert(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
			}		
        }
	// FIN TYPE DE TRANSFERT	
	
	
	// DEBUT TYPE BENEFICIAIRE
		function ajoutTypebeneficiaire(entite,suppression) {
            test_existenceTypebeneficiaire (entite,suppression);
        }
        function insert_in_baseTypebeneficiaire(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemTypebeneficiaire==false) {
			   getId = vm.selectedItemTypebeneficiaire.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: entite.description,
			});       
			//factory
			apiFactory.add("type_beneficiaire/index",datas, config).success(function (data) {
				if (NouvelItemTypebeneficiaire == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemTypebeneficiaire.description = entite.description;
					  vm.selectedItemTypebeneficiaire.$selected = false;
					  vm.selectedItemTypebeneficiaire.$edit = false;
					  vm.selectedItemTypebeneficiaire ={};
					} else {    
						vm.allRecordsTypebeneficiaire = vm.allRecordsTypebeneficiaire.filter(function(obj) {
							return obj.id !== vm.selectedItemTypebeneficiaire.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemTypebeneficiaire=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionTypebeneficiaire= function (item) {     
            vm.selectedItemTypebeneficiaire = item;
        };
        $scope.$watch('vm.selectedItemTypebeneficiaire', function() {
			if (!vm.allRecordsTypebeneficiaire) return;
			vm.allRecordsTypebeneficiaire.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypebeneficiaire.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterTypebeneficiaire = function () {
            vm.selectedItemTypebeneficiaire.$selected = false;
            NouvelItemTypebeneficiaire = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypebeneficiaire.push(items);
		    vm.allRecordsTypebeneficiaire.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypebeneficiaire = it;
				}
			});			
        };
        vm.annulerTypebeneficiaire = function(item) {
			if (!item.id) {
				vm.allRecordsTypebeneficiaire.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemTypebeneficiaire = false;
			 item.description = currentItemTypebeneficiaire.description;
			vm.selectedItemTypebeneficiaire = {} ;
			vm.selectedItemTypebeneficiaire.$selected = false;
       };
        vm.modifierTypebeneficiaire = function(item) {
			NouvelItemTypebeneficiaire = false ;
			vm.selectedItemTypebeneficiaire = item;
			currentItemTypebeneficiaire = angular.copy(vm.selectedItemTypebeneficiaire);
			$scope.vm.allRecordsTypebeneficiaire.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypebeneficiaire.description = vm.selectedItemTypebeneficiaire.description;
			vm.selectedItemTypebeneficiaire.$edit = true;	
        };
        vm.supprimerTypebeneficiaire = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutTypebeneficiaire(vm.selectedItemTypebeneficiaire,1);
			}, function() {
			});
        }
        function test_existenceTypebeneficiaire (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsTypebeneficiaire.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_baseTypebeneficiaire(item,0);
					}
				} else {
				  insert_in_baseTypebeneficiaire(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
			}		
        }
	// FIN TYPE BENEFICIAIRE
    }
  })();
