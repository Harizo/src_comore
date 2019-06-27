(function ()
{
    'use strict';
    angular
        .module('app.comores.ddb.acteurs')
        .controller('ActeursController', ActeursController);
      //.controller('DialogController', DialogueController);

    /** @ngInject */
    function ActeursController(apiFactory, $state, $mdDialog, $scope) {
		var vm = this;
		vm.titrepage ="Ajout Tutelle";
		vm.ajout = ajout ;
		vm.ajoutAgence_p = ajoutAgence_p ;
		vm.ajoutProtection_sociale = ajoutProtection_sociale ;
		var NouvelItemAgent_ex=false;
		var NouvelItemAgence_p=false;
		var NouvelItemProtection_sociale=false;
		var currentItemAgent_ex;
		var currentItemAgence_p;
		var currentItemProtection_sociale;
		vm.selectedItemAgent_ex = {} ;
		vm.selectedItemAgence_p = {} ;
		vm.selectedItemProtection_sociale = {};
		vm.ileSelected = false;
		vm.currentId_ile=0;
		//vm.allregion =[];
		vm.allRecordsAgent_ex = [] ;
		vm.allRecordsAgence_p = [] ;
		vm.allProtection_sociale = [] ;
		vm.listevillage = [] ;
		vm.nom_table="type_acteur";
		//vm.cas=1;
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
		vm.protection_sociale_column = [
		{titre:"Code"},
		{titre:"Nom"},
		{titre:"Contact"},
		{titre:"NumeroTelephone"},
		{titre:"Representant"},
		{titre:"Ile"},
		{titre:"Village"},
		{titre:"Programme"},
		{titre:"Action"}
		];
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
				apiFactory.getAll("protection_sociale/index").then(function(result){
					vm.allProtection_sociale = result.data.response;
					//console.log(vm.allProtection_sociale);
					/*apiFactory.getAll("region/index").then(function(result){
						vm.allregion = result.data.response;
					}); */   
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
			//console.log(vm.allRecordsAgent_ex);
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
			item.Code = currentItemAgent_ex.Code;
			item.Nom = currentItemAgent_ex.Nom;
			item.Contact = currentItemAgent_ex.Contact;
			item.Representant = currentItemAgent_ex.Representant;
			item.ile_id = currentItemAgent_ex.ile.id;
			item.programme_id = currentItemAgent_ex.programme.id;
			vm.selectedItemAgent_ex = {} ;
			vm.selectedItemAgent_ex.$selected = false;
       };
        vm.modifierAgent_ex = function(item) {
        	console.log(vm.selectedItemAgent_ex);
			NouvelItemAgent_ex = false ;
			vm.selectedItemAgent_ex = item;
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
			console.log(vm.allRecordsAgent_ex);	
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
					entite.ile=il[0];	
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
			item.Code = currentItemAgence_p.Code;
			item.Nom = currentItemAgence_p.Nom;
			item.Contact = currentItemAgence_p.Contact;
			item.Telephone = currentItemAgence_p.Telephone;
			item.Representant = currentItemAgence_p.Representant;
			item.ile_id = currentItemAgence_p.ile.id;
			item.programme_id = currentItemAgence_p.programme.id;
			vm.selectedItemActeur = {} ;
			vm.selectedItemActeur.$selected = false;
       };
        vm.modifierAgence_p = function(item) {
			NouvelItemAgence_p = false ;
			vm.selectedItemAgence_p = item;			
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
                        ||(ag[0].Telephone!=currentItemAgence_p.Telephone)
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
		function ajoutProtection_sociale(entite,suppression) {
           
            if (NouvelItemProtection_sociale==false) 
              {
                test_existenceProtection_sociale (entite,suppression); 
              }
              else
              {
                insert_in_baseProtection_sociale(entite,suppression);
              } 
        }
        function insert_in_baseProtection_sociale(entite,suppression) {  
			//add
			
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemProtection_sociale==false) {
			   getId = vm.selectedItemProtection_sociale.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				Code: entite.Code,      
				Nom: entite.Nom,      
				Contact: entite.Contact,
				NumeroTelephone: entite.NumeroTelephone,      
				Representant: entite.Representant,      
				ile_id: entite.ile_id,
				village_id: entite.village_id,      
				programme_id: entite.programme_id
			});       
			//factory
			apiFactory.add("protection_sociale/index",datas, config).success(function (data)
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
                var vil = vm.listevillage.filter(function(obj)
                {
                    return obj.id == entite.village_id;
                });
				if (NouvelItemProtection_sociale == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemProtection_sociale.Code = entite.Code;
					  vm.selectedItemProtection_sociale.Nom = entite.Nom;
					  vm.selectedItemProtection_sociale.Contact = entite.Contact;
					  vm.selectedItemProtection_sociale.NumeroTelephone = entite.NumeroTelephone;
					  vm.selectedItemProtection_sociale.Representant = entite.Representant;
					  vm.selectedItemProtection_sociale.ile = il[0];
					  vm.selectedItemProtection_sociale.village = vil[0];
					  vm.selectedItemProtection_sociale.programme = prog[0];

					  vm.selectedItemProtection_sociale.$selected = false;
					  vm.selectedItemProtection_sociale.$edit = false;
					  vm.selectedItemProtection_sociale ={};
					} else {    
						vm.allProtection_sociale = vm.allProtection_sociale.filter(function(obj) {
							return obj.id !== vm.selectedItemProtection_sociale.id;
						});
					}
				} else {
					entite.id=data.response;
					entite.programme=prog[0];
					entite.ile=il[0];
					entite.village=vil[0]	
					NouvelItemProtection_sociale=false;
				}
				entite.$selected=false;
				entite.$edit=false;
				vm.ileSelected = false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionProtection_sociale= function (item) {     
            vm.selectedItemProtection_sociale = item;
            apiFactory.getVillageByIle("village/index",item.ile_id).then(function(result)
	      {
	        vm.listevillage= result.data.response;
	        vm.currentId_ile=item.ile_id;
	       // console.log(vm.listevillage);
	       
	      });
        };
        $scope.$watch('vm.selectedItemProtection_sociale', function() {
			if (!vm.allProtection_sociale) return;
			vm.allProtection_sociale.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemProtection_sociale.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterProtection_sociale = function () {
            vm.selectedItemProtection_sociale.$selected = false;
            NouvelItemProtection_sociale = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                Code: '',
                Nom: '',
                Contact: '',
                NumeroTelephone: '',
                Representant: '',
                ile_id: '',
                village_id: '',
                programme_id: ''
			};
			vm.allProtection_sociale.push(items);
		    vm.allProtection_sociale.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemProtection_sociale = it;
				}
			});			
        };
        vm.annulerProtection_sociale = function(item) {
			if (!item.id) {
				vm.allProtection_sociale.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemProtection_sociale = false;
			item.Code = currentItemProtection_sociale.Code;
			item.Nom = currentItemProtection_sociale.Nom;
			item.Contact = currentItemProtection_sociale.Contact;
			item.NumeroTelephone = currentItemProtection_sociale.NumeroTelephone;
			item.Representant = currentItemProtection_sociale.Representant;
			item.ile_id = currentItemProtection_sociale.ile.id;
			item.village_id = currentItemProtection_sociale.village.id;
			item.programme_id = currentItemProtection_sociale.programme.id;
			vm.selectedItemProtection_sociale = {} ;
			vm.selectedItemProtection_sociale.$selected = false;
			vm.ileSelected = false;
       };
        vm.modifierProtection_sociale = function(item) {
			NouvelItemProtection_sociale = false ;
			vm.selectedItemProtection_sociale = item;
			currentItemProtection_sociale = angular.copy(vm.selectedItemProtection_sociale);
			$scope.vm.allProtection_sociale.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			item.Code = vm.selectedItemProtection_sociale.Code;
			item.Nom = vm.selectedItemProtection_sociale.Nom;
			item.Contact = vm.selectedItemProtection_sociale.Contact;
			item.NumeroTelephone = vm.selectedItemProtection_sociale.NumeroTelephone;
			item.Representant = vm.selectedItemProtection_sociale.Representant;
			item.ile_id = vm.selectedItemProtection_sociale.ile.id;
			item.village_id = vm.selectedItemProtection_sociale.village.id;
			item.programme_id = vm.selectedItemProtection_sociale.programme.id;
			vm.selectedItemProtection_sociale.$edit = true;	
        };
        vm.supprimerProtection_sociale = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutProtection_sociale(vm.selectedItemProtection_sociale,1);
			}, function() {
			});
        }
        vm.modifierileprotection = function (item) 
        {
          var ile = vm.allile.filter(function(obj)
          {
              return obj.id == item.ile_id;
          });
          //console.log(ile);
          item.programme_id=ile[0].programme.id;
          //console.log(item.ile_id);
          vm.currentId_ile=item.ile_id;
          apiFactory.getVillageByIle("village/index",item.ile_id).then(function(result)
	      {
	        vm.listevillage= result.data.response;
	       // console.log(vm.listevillage);
	        vm.ileSelected = true;
	      });

        }

        function test_existenceProtection_sociale (item,suppression)
        {    //console.log(currentItemProtection_sociale);
			if (suppression!=1) 
            {
                var ps = vm.allProtection_sociale.filter(function(obj)
                {
                   return obj.id == currentItemProtection_sociale.id;
                });
                if(ps[0])
                {
                   if((ps[0].Code!=currentItemProtection_sociale.Code)
                        ||(ps[0].Nom!=currentItemProtection_sociale.Nom)
                        ||(ps[0].Contact!=currentItemProtection_sociale.Contact)
                        ||(ps[0].NumeroTelephone!=currentItemProtection_sociale.NumeroTelephone)
                        ||(ps[0].Representant!=currentItemProtection_sociale.Representant)
                        ||(ps[0].ile.id!=currentItemProtection_sociale.ile_id)
                        ||(ps[0].programme.id!=currentItemProtection_sociale.programme_id)
                        ||(ps[0].village.id!=currentItemProtection_sociale.village_id))                    
                      { 
                        insert_in_baseProtection_sociale(item,suppression);
                      }
                      else
                      {
                        item.$selected=false;
						item.$edit=false;
                      }                    
             	} 
            }else
              insert_in_baseProtection_sociale(item,suppression);		
        }
    vm.nouveauVillage = function (ev,item)
	{	//console.log('eto');
		if (item.ile_id)
		{
			var confirm = $mdDialog.confirm({
			controller: DialogController,
			templateUrl: 'app/main/comores/ddb/acteurs/dialog.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			
			})

						$mdDialog.show(confirm).then(function(data)
						{	//console.log('lasa');
							if(data.village_id)
							{
								vm.selectedItemProtection_sociale.village_id=data.village_id;
							}else
							{
								
							}
							
							//console.log(data.village_id);
						}, function(){//alert('rien');
					});
		} else {
		
         $mdDialog.show(
      		$mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .parent(angular.element(document.body))
	        .title('Erreur: champ vide')
	        .textContent('Vous devez d\'abord remplir le champ Ile')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Ok')
	        .targetEvent(ev)
    		);
		}
		

	}
   function DialogController($mdDialog, $scope)
  	{ 
      var dg=$scope;

      apiFactory.getPrefectureByIle("region/index",vm.currentId_ile).then(function(result)
       {dg.PrefectureListe = result.data.response;
       	//console.log(dg.listePrefe);
       });

      dg.cancel = function()
      {$mdDialog.cancel();};

      dg.modifierprefecture = function (item) 
        {//console.log(item.prefecture_id);
          apiFactory.getCommuneByPrefecture("commune/index",item.prefecture_id).then(function(result)
	      {
	        dg.CommuneListe= result.data.response;	        
	       //console.log(dg.CommuneListe);
	      });

        }
        dg.modifiercommune = function (item) 
        {	//console.log(item.commune_id);
          apiFactory.getVillageByCommune("village/index",item.commune_id).then(function(result)
	      {
	        dg.VillageListe= result.data.response;
	        vm.listevillage=dg.VillageListe;
	       //console.log(dg.VillageListe);
	      });

        }
        dg.dialogResponse = function(response)
        {
        	$mdDialog.hide(response);
        }

}

      /*  vm.modifierRegion = function (item) { 
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
		}*/	
    }
  })();
