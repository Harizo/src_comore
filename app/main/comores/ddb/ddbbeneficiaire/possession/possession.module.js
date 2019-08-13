(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.ddbbeneficiaire.possession', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_ddbbeneficiaire', {
            url      : '/donnees-de-base/bénéficiaire/possession',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/ddbbeneficiaire/possession/possession.html',
                    controller : 'PossessionController as vm'
                }
            },
            bodyClass: 'possession',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Région"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.ddbbeneficiaire.possession', {
            title: 'Possession',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_ddbbeneficiaire',
			weight: 1
        });
    }

})();
