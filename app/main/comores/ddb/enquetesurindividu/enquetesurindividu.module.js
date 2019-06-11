(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.enquetesurindividu', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_enquetesurindividu', {
            url      : '/donnees-de-base/enquete-sur-individu',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/enquetesurindividu/enquetesurindividu.html',
                    controller : 'EnquetesurindividuController as vm'
                }
            },
            bodyClass: 'enquetesurindividu',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Enquête/Individu"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('comores.ddb.enquetesurindividu', {
            title: 'Enquête/Individu',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_enquetesurindividu',
			weight: 2
        });
    }

})();
