(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.fokontany', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_localisation_fokontany', {
            url      : '/donnees-de-base/localisation/fokontany',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/localisation/fokontany/fokontany.html',
                    controller : 'FokontanyController as vm'
                }
            },
            bodyClass: 'fokontany',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Fokontany"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.localisation.fokontany', {
            title: 'Village',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_localisation_fokontany',
			weight: 4
        });
    }
})();
