(function ()
{
    'use strict';
    angular
        .module('app.comores.ddb.acteurs')
        .controller('ActeursController', ActeursController);

    /** @ngInject */
    function ActeursController(apiFactory, $state, $mdDialog, $scope) {
		var vm = this;
		vm.titrepage ="Ajout Tutelle";
		vm.ajout = ajout ;
		vm.ajoutAgence_p = ajoutAgence_p ;
		vm.ajoutActeurregional = ajoutActeurregional ;
		var NouvelItemAgent_ex=false;
		var NouvelItemAgence_p=false;
		var NouvelItemActeurregional=false;
		var currentItemAgent_ex;
		var currentItemAgence_p;
		vm.selectedItemAgent_ex = {} ;
		vm.selectedItemAgence_p = {} ;
		vm.selectedItemActeurregional = {} ;
		//vm.allregion =[];
		vm.allRecordsAgent_ex = [] ;
		vm.allRecordsAgence_p = [] ;
		vm.allRecordsActeurregional = [] ;
		vm.nom_table="type_acteur";
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
		vm.agent_ex_column =[
		{titre:"Code"},
		{titre:"Nom"},
		{titre:"Contact"},
		{titre:"Representant"},
		{titre:"Ile"},
		{titre:"Programme"},
		{titre:"Action"}
		];
		vm.agence_p_column = [
		{titre:"Code"},
		{titre:"Nom"},
		{titre:"Contact"},
		{titre:"Telephone"},
		{titre:"Representant"},
		{titre:"Ile"},
		{titre:"Programme"},
		{titre:"Action"}
		];
		vm.acteurregional_column = [{titre:"Type Act"},{titre:"Nom"},{titre:"Région"},{titre:"Représentant"},{titre:"Contact"},{titre:"Adresse"},{titre:"Actions"}];
		apiFactory.getAll("ile/index").then(function(result)
	      {
	        vm.allile= result.data.response;
	      });
	      apiFactory.getAll("programme/index").then(function(result)
	      {
	        vm.allprogramme= result.data.response;
	      });
		apiFactory.getAll("agent_ex/index").then(function(result){
			vm.allRecordsAgent_ex = result.data.response;
			//console.log(vm.allRecordsAgent_ex);
			apiFactory.getAll("agence_p/index").then(function(result){
				vm.allRecordsAgence_p = result.data.response;
				//console.log(vm.allRecordsAgence_p);
				apiFactory.getAll("acteur_regional/index").then(function(result){
					vm.allRecordsActeurregional = result.data.response;
					apiFactory.getAll("region/index").then(function(result){
						vm.allregion = result.data.response;
					});    
				});    
			});    
		});    
		function ajout(agent_e,suppression) {
            
            if (NouvelItemAgent_ex==false) 
              {
                test_existence (agent_e,suppression); 
              }
              else
              {
                insert_in_base(agent_e,suppression);
              }
        }
        function insert_in_base(agent_ex,suppression) {  
			//add
			
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemAgent_ex==false) {
			   getId = vm.selectedItemAgent_ex.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				Code: agent_ex.Code,      
				Nom: agent_ex.Nom,      
				Contact: agent_ex.Contact,      
				Representant: agent_ex.Representant,      
				ile_id: agent_ex.ile_id,      
				programme_id: agent_ex.programme_id
			});       
			//factory
			apiFactory.add("agent_ex/index",datas, config).success(function (data)
			{	
				var prog = vm.allprogramme.filter(function(obj)
                {
                    return obj.id == agent_ex.programme_id;
                });
            //console.log(prog[0]);
                var il = vm.allile.filter(function(obj)
                {
                    return obj.id == agent_ex.ile_id;
                });
//console.log(il[0]);
				if (NouvelItemAgent_ex == false) {
					// Update or delete: id exclu 
					//console.log('noufalse');                  
					if(suppression==0) {
					  vm.selectedItemAgent_ex.Code = agent_ex.Code;
					  vm.selectedItemAgent_ex.Nom = agent_ex.Nom;
					  vm.selectedItemAgent_ex.Contact = agent_ex.Contact;
					  vm.selectedItemAgent_ex.Representant = agent_ex.Representant;
					  vm.selectedItemAgent_ex.ile = il[0];
					  vm.selectedItemAgent_ex.programme = prog[0];
					  vm.selectedItemAgent_ex.$selected = false;
					  vm.selectedItemAgent_ex.$edit = false;
					  vm.selectedItemAgent_ex ={};
					} else {    
						vm.allRecordsAgent_ex = vm.allRecordsAgent_ex.filter(function(obj) {
							return obj.id !== vm.selectedItemAgent_ex.id;
						});
					}
				} else {
					agent_ex.id=data.response;
					agent_ex.programme=prog[0];
					agent_ex.ile=il[0]
					NouvelItemAgent_ex=false;
				}
				agent_ex.$selected=false;
				agent_ex.$edit=false;
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
        vm.selectionAgent_ex= function (item) {     
            vm.selectedItemAgent_ex = item;
        };
        $scope.$watch('vm.selectedItemAgent_ex', function() {
			if (!vm.allRecordsAgent_ex) return;
			vm.allRecordsAgent_ex.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemAgent_ex.$selected = true;
			console.log(vm.allRecordsAgent_ex);
        });
        //function cache masque de saisie
        vm.ajouterAgent_ex = function () {
            vm.selectedItemAgent_ex.$selected = false;
            NouvelItemAgent_ex = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                Code: '',
                Nom: '',
                Contact: '',
                Representant: '',
                ile_id: '',
                programme_id: ''
			};
			vm.allRecordsAgent_ex.push(items);
		    vm.allRecordsAgent_ex.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemAgent_ex = it;
				}
			});			
        };
        vm.annulerAgent_ex = function(item) {
			if (!item.id) {
				vm.allRecordsAgent_ex.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemAgent_ex = false;
			 item.description = currentItemAgent_ex.description;
			vm.selectedItemAgent_ex = {} ;
			vm.selectedItemAgent_ex.$selected = false;
       };
        vm.modifierAgent_ex = function(item) {
			NouvelItemAgent_ex = false ;
			//vm.selectedItemAgent_ex = item;
			currentItemAgent_ex = angular.copy(vm.selectedItemAgent_ex);
			$scope.vm.allRecordsAgent_ex.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			item.Code = vm.selectedItemAgent_ex.Code;
			item.Nom = vm.selectedItemAgent_ex.Nom;
			item.Contact = vm.selectedItemAgent_ex.Contact;
			item.Representant = vm.selectedItemAgent_ex.Representant;
			item.ile_id = vm.selectedItemAgent_ex.ile.id;
			item.programme_id = vm.selectedItemAgent_ex.programme.id;
			item.$edit = true;	
        };
        vm.supprimerAgent_ex = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemAgent_ex,1);
			}, function() {
			});
        }
        vm.modifierile = function (item) 
        {
          var ile = vm.allile.filter(function(obj)
          {
              return obj.id == item.ile_id;
          });
          //console.log(ile);
          item.programme_id=ile[0].programme.id;
        }
        function test_existence (item,suppression)
        {
			if (suppression!=1) 
            {
                var ag = vm.allRecordsAgent_ex.filter(function(obj)
                {
                   return obj.id == item.id;
                });
                if(ag[0])
                {
                  if((ag[0].Code!=currentItemAgent_ex.Code)
                        ||(ag[0].Nom!=currentItemAgent_ex.Nom)
                        ||(ag[0].Contact!=currentItemAgent_ex.Contact)
                        ||(ag[0].Representant!=currentItemAgent_ex.Representant)
                        ||(ag[0].ile.id!=currentItemAgent_ex.ile_id)
                        ||(ag[0].programme.id!=currentItemAgent_ex.programme_id))                    
                      { 
                         insert_in_base(item,suppression);                         
                      }
                      else
                      { 
                        item.$selected=false;
						item.$edit=false;
                      }
                }
            }
            else
              insert_in_base(item,suppression);		
        }
		
	// ACTEURS	
		function ajoutAgence_p(agence_p,suppression) {
            	
            if (NouvelItemAgence_p==false) 
              {
                test_existenceAgence_p (agence_p,suppression); 
              }
              else
              {
                insert_in_baseAgence_p(agence_p,suppression);
              }

        }
        function insert_in_baseAgence_p(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemAgence_p==false) {
			   getId = vm.selectedItemAgence_p.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				Code: entite.Code,      
				Nom: entite.Nom,      
				Contact: entite.Contact,
				Telephone: entite.Telephone,      
				Representant: entite.Representant,      
				ile_id: entite.ile_id,      
				programme_id: entite.programme_id
			});       
			//factory
			apiFactory.add("agence_p/index",datas, config).success(function (data)
			{	
				var prog = vm.allprogramme.filter(function(obj)
                {
                    return obj.id == entite.programme_id;
                });
            	//console.log(prog[0]);
                var il = vm.allile.filter(function(obj)
                {
                    return obj.id == entite.ile_id;
                });
				if (NouvelItemAgence_p == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					   vm.selectedItemAgence_p.Code = entite.Code;
					  vm.selectedItemAgence_p.Nom = entite.Nom;
					  vm.selectedItemAgence_p.Contact = entite.Contact;
					  vm.selectedItemAgence_p.Telephone = entite.Telephone;
					  vm.selectedItemAgence_p.Representant = entite.Representant;
					  vm.selectedItemAgence_p.ile = il[0];
					  vm.selectedItemAgence_p.programme = prog[0];
					  vm.selectedItemAgence_p.$selected = false;
					  vm.selectedItemAgence_p.$edit = false;
					  vm.selectedItemAgence_p ={};
					  vm.selectedItemAgence_p.$selected = false;
					  vm.selectedItemAgence_p.$edit = false;
					  vm.selectedItemAgence_p ={};
					} else {    
						vm.allRecordsAgence_p = vm.allRecordsAgence_p.filter(function(obj) {
							return obj.id !== vm.selectedItemAgence_p.id;
						});
					}
				} else {
					entite.id=data.response;
					entite.programme=prog[0];
					entite.ile=il[0]	
					NouvelItemAgence_p=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionAgence_p= function (item) {     
            vm.selectedItemAgence_p = item;
        };
        $scope.$watch('vm.selectedItemAgence_p', function() {
			if (!vm.allRecordsAgence_p) return;
			vm.allRecordsAgence_p.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemAgence_p.$selected = true;
        });
        vm.ajouterAgence_p = function () {
            vm.selectedItemAgence_p.$selected = false;
            NouvelItemAgence_p = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                Code: '',
                Nom: '',
                Contact: '',
                Telephone: '',
                Representant: '',
                ile_id: '',
                programme_id: ''
			};
			vm.allRecordsAgence_p.push(items);
		    vm.allRecordsAgence_p.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemAgence_p = it;
				}
			});			
        };
        vm.annulerAgence_p = function(item) {
			if (!item.id) {
				vm.allRecordsAgence_p.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemAgence_p = false;
			 item.nom = currentItem.nom;
			 item.representant = currentItem.representant;
			 item.contact = currentItem.contact;
			 item.adresse = currentItem.adresse;
			 item.id_type_Agence_p = currentItem.id_type_Agence_p;
			 item.typeacteur = currentItem.typeacteur;
			vm.selectedItemActeur = {} ;
			vm.selectedItemActeur.$selected = false;
       };
        vm.modifierAgence_p = function(item) {
			NouvelItemAgence_p = false ;
			//vm.selectedItemAgence_p = item;			
			currentItemAgence_p = angular.copy(vm.selectedItemAgence_p);
			$scope.vm.allRecordsAgence_p.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			item.Code = vm.selectedItemAgence_p.Code;
			item.Nom = vm.selectedItemAgence_p.Nom;
			item.Contact = vm.selectedItemAgence_p.Contact;
			item.Telephone = vm.selectedItemAgence_p.Telephone;
			item.Representant = vm.selectedItemAgence_p.Representant;
			item.ile_id = vm.selectedItemAgence_p.ile.id;
			item.programme_id = vm.selectedItemAgence_p.programme.id;
			
			vm.selectedItemAgence_p.$edit = true;	
        };
        vm.supprimerAgence_p = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutAgence_p(vm.selectedItemAgence_p,1);
			}, function() {
			});
        }
        function test_existenceAgence_p (item,suppression)
        {
			if (suppression!=1) 
            {
                var ag = vm.allRecordsAgence_p.filter(function(obj)
                {
                   return obj.id == currentItemAgence_p.id;
                });
                if(ag[0])
                {
                   if((ag[0].Code!=currentItemAgence_p.Code)
                        ||(ag[0].Nom!=currentItemAgence_p.Nom)
                        ||(ag[0].Contact!=currentItemAgence_p.Contact)
                        ||(ag[0].Contact!=currentItemAgence_p.Telephone)
                        ||(ag[0].Representant!=currentItemAgence_p.Representant)
                        ||(ag[0].ile.id!=currentItemAgence_p.ile_id)
                        ||(ag[0].programme.id!=currentItemAgence_p.programme_id))                    
                      { 
                        insert_in_baseAgence_p(item,suppression);
                      }
                      else
                      {
                        item.$selected=false;
						item.$edit=false;
                      }                    
                }
            }
            else
              insert_in_baseAgence_p(item,suppression);			
        }		
	// ACTEURS REGIONAL	
		function ajoutActeurregional(entite,suppression) {
            test_existenceActeurregional (entite,suppression); 
        }
        function insert_in_baseActeurregional(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemActeurregional==false) {
			   getId = vm.selectedItemActeurregional.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				nom: entite.nom,
				representant: entite.representant,
				contact: entite.contact,
				adresse: entite.adresse,
				id_type_acteur: entite.id_type_acteur,
				id_region: entite.id_region,
			});       
			//factory
			apiFactory.add("acteur_regional/index",datas, config).success(function (data) {
				if (NouvelItemActeurregional == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemActeurregional.nom = entite.nom;
					  vm.selectedItemActeurregional.representant = entite.representant;
					  vm.selectedItemActeurregional.contact = entite.contact;
					  vm.selectedItemActeurregional.adresse = entite.adresse;
					  vm.selectedItemActeurregional.id_region = entite.id_region;
					  vm.selectedItemActeurregional.region = entite.region;
					  vm.selectedItemActeurregional.id_type_acteur = entite.id_type_acteur;
					  vm.selectedItemActeurregional.typeacteur = entite.typeacteur;
					  vm.selectedItemActeurregional.$selected = false;
					  vm.selectedItemActeurregional.$edit = false;
					  vm.selectedItemActeurregional ={};
					} else {    
						vm.allRecordsActeurregional = vm.allRecordsActeurregional.filter(function(obj) {
							return obj.id !== vm.selectedItemActeurregional.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemActeurregional=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionActeurregional= function (item) {     
            vm.selectedItemActeurregional = item;
        };
        $scope.$watch('vm.selectedItemActeurregional', function() {
			if (!vm.allRecordsActeurregional) return;
			vm.allRecordsActeurregional.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemActeurregional.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterActeurregional = function () {
            vm.selectedItemActeurregional.$selected = false;
            NouvelItemActeurregional = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                nom: '',
                representant: '',
                contact: '',
                adresse: '',
			};
			vm.allRecordsActeurregional.push(items);
		    vm.allRecordsActeurregional.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemActeurregional = it;
				}
			});			
        };
        vm.annulerActeurregional = function(item) {
			if (!item.id) {
				vm.allRecordsActeurregional.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemActeurregional = false;
			 item.nom = currentItem.nom;
			 item.representant = currentItem.representant;
			 item.contact = currentItem.contact;
			 item.adresse = currentItem.adresse;
			 item.id_type_acteur = currentItem.id_type_acteur;
			 item.typeacteur = currentItem.typeacteur;
			 item.region = currentItem.region;
			 item.id_region = currentItem.id_region;
			vm.selectedItemActeurregional = {} ;
			vm.selectedItemActeurregional.$selected = false;
       };
        vm.modifierActeurregional = function(item) {
			NouvelItemActeurregional = false ;
			vm.selectedItemActeurregional = item;
			currentItem = angular.copy(vm.selectedItemActeurregional);
			$scope.vm.allRecordsActeurregional.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			item.nom = vm.selectedItemActeurregional.nom;
			item.representant = vm.selectedItemActeurregional.representant;
			item.contact = vm.selectedItemActeurregional.contact;
			item.adresse = vm.selectedItemActeurregional.adresse;
			if(vm.selectedItemActeur.id_type_acteur) {
				item.id_type_acteur = parseInt(vm.selectedItemActeur.id_type_acteur);
			}
			item.typeacteur = vm.selectedItemActeurregional.typeacteur;
			if(vm.selectedItemActeur.id_region) {
				item.id_region = parseInt(vm.selectedItemActeur.id_region);
			}
			item.region = parseInt(vm.selectedItemActeur.region);
			vm.selectedItemActeurregional.$edit = true;	
        };
        vm.supprimerActeurregional = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutActeurregional(vm.selectedItemActeurregional,1);
			}, function() {
			});
        }
        function test_existenceActeurregional (item,suppression) {    
			if(item.nom.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsActeurregional.forEach(function(dispo) {   
						if((dispo.nom==item.nom) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Nom déjà utilisé')
					} else {
						insert_in_baseActeurregional(item,0);
					}
				} else {
				  insert_in_baseActeurregional(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir le nom de l'AGEX !");
			}		
        }
        vm.modifierRegion = function (item) { 
			vm.allregion.forEach(function(prg) {
				if(prg.id==item.id_region) {
					item.region=[];
					var itemss = {
						id: prg.id,
						code: prg.code,
						nom: prg.nom,
					};
					item.region.push(itemss);
				}
			});
		}	
        vm.modifierTypeacteur = function (item) { 
			vm.allRecordsAgent_ex.forEach(function(prg) {
				if(prg.id==item.id_type_acteur) {
					item.typeacteur=[];
					var itemss = {
						id: prg.id,
						description: prg.description,
					};
					item.typeacteur.push(itemss);
				}
			});
			console.log(item.typeacteur);
		}	
    }
  })();
