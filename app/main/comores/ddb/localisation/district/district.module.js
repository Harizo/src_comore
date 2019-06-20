(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.district', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_localisation_district', {
            url      : '/donnees-de-base/localisation/district',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/localisation/district/district.html',
                    controller : 'DistrictController as vm'
                }
            },
            bodyClass: 'district',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "District"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.ddb.localisation.district', {
            title: 'Préfecture',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_localisation_district',
			weight: 2
        });
    }

})();
