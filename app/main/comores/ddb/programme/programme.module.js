(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.programme', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_programme', {
            url      : '/donnees-de-base/programme',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/programme/programme.html',
                    controller : 'ProgrammeController as vm'
                }
            },
            bodyClass: 'programme',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Programme"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.programme', {
            title: 'Programme',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_programme',
			weight: 1
        });
    }

})();
