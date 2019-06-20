(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.commune')
        .controller('CommuneController', CommuneController);

    /** @ngInject */
    function CommuneController($mdDialog, $scope, $location, apiFactory, $cookieStore)
    {
      var vm = this;
      vm.ajout = ajout ;
      var NouvelItem=false;
      var currentItem;

      vm.selectedItem = {} ;
      vm.allcommune = [] ;
      vm.allprefecture = [] ;
      

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
    vm.commune_column = [
      {
        titre:"Code"
      },
      {
        titre:"Commune"
      },
      {
        titre:"Préfecture"
      },
      {
        titre:"Programme"
      }
    ];
    
    apiFactory.getAll("region/index").then(function(result)
    {
      vm.allprefecture = result.data.response;
     // console.log(vm.allprefecture);
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
        function ajout(commune,suppression)   
        {
              if (NouvelItem==false) 
              {
                test_existance (commune,suppression); 
              }
              else
              {
                insert_in_base(commune,suppression);
              }
                
                
            
        }

        function insert_in_base(commune,suppression)
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
                Code: commune.Code,
                Commune: commune.Commune,
                region_id:commune.prefecture_id,
                programme_id:commune.programme_id
                
            });
        
            //factory
            apiFactory.add("commune/index",datas, config).success(function (data)
            { 
              var prog = vm.allprogramme.filter(function(obj)
                {
                    return obj.id == vm.commune.programme_id;
                });
              var pref = vm.allprefecture.filter(function(obje)
                {
                    return obje.id == vm.commune.prefecture_id;
                });

                  if (NouvelItem == false) 
                  {
                    // Update or delete: id exclu
                    
                    if(suppression==0) 
                    {
                      vm.selectedItem.Commune = vm.commune.Commune;
                      vm.selectedItem.Code = vm.commune.Code;
                      vm.selectedItem.prefecture = pref[0];
                      vm.selectedItem.programme = prog[0];
                      vm.afficherboutonModifSupr = 0 ;
                      vm.afficherboutonnouveau = 1 ;
                      vm.selectedItem.$selected = false;
                      vm.selectedItem ={};
                    } 
                    else 
                    {    
                      vm.allcommune = vm.allcommune.filter(function(obj) {

                        return obj.id !== currentItem.id;
                      });
                    }
                  }
                  else
                  {
                    var item = {
                        Commune: commune.Commune,
                        Code: commune.Code,
                        id:String(data.response) ,
                        prefecture:pref[0] ,
                        programme:prog[0] 
                    };
        
                    vm.allcommune.push(item);
                    vm.commune={};
                    
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
        if (!vm.allcommune) return;
        vm.allcommune.forEach(function(item) {
            item.$selected = false;
        });
        vm.selectedItem.$selected = true;
      });

      //function cache masque de saisie
        vm.ajouter = function () 
        {
          vm.selectedItem.$selected = false;
          vm.affichageMasque = 1 ;
          vm.commune={};
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
          vm.commune= {};
        };

        vm.modifier = function() 
        {

          NouvelItem = false ;
          vm.affichageMasque = 1 ;
          vm.commune.id = vm.selectedItem.id ;
          vm.commune.Code = vm.selectedItem.Code ;
          vm.commune.Commune = vm.selectedItem.Commune ;
          vm.commune.programme_id = vm.selectedItem.programme.id;
          vm.commune.prefecture_id = vm.selectedItem.prefecture.id;

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
        
        vm.modifierprefecture = function (item) {
          var pref = vm.allprefecture.filter(function(obj)
          {
              return obj.id == item.prefecture_id;
          });
          //console.log(prefecture);
          item.programme_id=pref[0].programme.id;
        }

        function test_existance (item,suppression) 
        {
           
            if (suppression!=1) 
            {
                var com = vm.allcommune.filter(function(obj)
                {
                   return obj.id == item.id;
                });
                if(com[0])
                {
                   if((com[0].Code!=item.Code)
                        ||(com[0].Commune!=item.Commune)
                        ||(com[0].prefecture.id!=item.prefecture_id)
                        ||(com[0].programme.id!=item.programme_id))                    
                      { 
                         insert_in_base(item,suppression);
                         vm.affichageMasque = 0;
                      }
                      else
                      {  
                         vm.affichageMasque = 0;
                      }
                }
            }
            else
              insert_in_base(item,suppression);
        }
    }
})();
