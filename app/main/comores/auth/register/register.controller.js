(function ()
{
    'use strict';

    angular
        .module('app.comores.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(apiFactory, $location, $mdDialog,hashage)
    {
      var vm = this;

      vm.allSite = [];
      vm.autoriz_click = true ;

 

      //enregistrer
      vm.enregistrer = enregistrer;

      apiFactory.getAll("ile/index").then(function(result)
        { 
          vm.all_ile = result.data.response;    

        });

      function enregistrer(utilisateur, ev)
      {
        vm.autoriz_click = false ;
        //add
        var config = {
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };
        //
        var datas = $.param(
        {
          id_ile: utilisateur.id_ile,
          nom: utilisateur.firstname,
          prenom: utilisateur.lastname,
          email: utilisateur.email,
          password: hashage.sha1(utilisateur.password)
        });

        //ajout user
        apiFactory.add("utilisateurs/index", datas, config)
          .success(function () {

            vm.autoriz_click = true ;

            $mdDialog.show({
              controller         : function ($scope, $mdDialog)
              {
                $scope.closeDialog = function ()
                {
                  $mdDialog.hide();
                  $location.path('/auth/login');
                }
              },
              template           : '<md-dialog>' +
              '  <md-dialog-content><h1 class="md-accent" translate="REGISTER.ok.titre">titre</h1><div><pre translate="REGISTER.ok.msg">corps</pre></div></md-dialog-content>' +
              '  <md-dialog-actions>' +
              '    <md-button ng-click="closeDialog()" class="md-primary" translate="REGISTER.ok.quitter">' +
              '      Quitter' +
              '    </md-button>' +
              '  </md-dialog-actions>' +
              '</md-dialog>',
              parent             : angular.element('body'),
              targetEvent        : ev,
              clickOutsideToClose: true
            });

          })
          .error(function () {
            vm.autoriz_click = true ;
            $mdDialog.show({
              controller         : function ($scope, $mdDialog)
              {
                $scope.closeDialog = function ()
                {
                  $mdDialog.hide();
                }
              },
              template           : '<md-dialog>' +
              '  <md-dialog-content><h1 class="md-warn-fg" translate="REGISTER.error.titre">titre</h1><div><pre translate="REGISTER.error.msg">corps</pre></div></md-dialog-content>' +
              '  <md-dialog-actions>' +
              '    <md-button ng-click="closeDialog()" class="md-primary" translate="REGISTER.error.quitter">' +
              '      Quitter' +
              '    </md-button>' +
              '  </md-dialog-actions>' +
              '</md-dialog>',
              parent             : angular.element('body'),
              targetEvent        : ev,
              clickOutsideToClose: true
            });
          });
        //
      }
    }
})();
