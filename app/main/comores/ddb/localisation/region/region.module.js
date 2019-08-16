(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.region', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_localisation_region', {
            url      : '/donnees-de-base/localisation/region',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/localisation/region/region.html',
                    controller : 'RegionController as vm'
                }
            },
            bodyClass: 'region',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Région"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.localisation.region', {
            title: 'Ile',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_localisation_region',
			weight: 1
        });
    }

})();
