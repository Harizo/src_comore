(function ()
{
    'use strict';

    angular
        .module('app.comores.reporting.menage_beneficiaire', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_reporting_menage_beneficiaire', {
            url      : '/reporting/menage_beneficiaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/reporting/menage_beneficiaire/menage_beneficiaire.html',
                    controller : 'menage_beneficiaireController as vm'
                }
            },
            bodyClass: 'menage_beneficiaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "menage_beneficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.reporting.menage_beneficiaire', {
            title: 'Ménage Trans.Monétaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.comores_reporting_menage_beneficiaire',
			weight: 1
        });
    }

})();
