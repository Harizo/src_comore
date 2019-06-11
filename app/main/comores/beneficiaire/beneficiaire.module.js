(function ()
{
    'use strict';

    angular
        .module('app.comores.beneficiaire', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_beneficiaire', {
            url      : '/beneficiaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/beneficiaire/beneficiaire.html',
                    controller : 'BeneficiaireController as vm'
                }
            },
            bodyClass: 'beneficiaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Bénéficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.beneficiaire', {
            title: 'Bénéficiaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.comores_beneficiaire',
			  weight: 5
        });
    }

})();
