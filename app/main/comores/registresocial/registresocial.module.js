(function ()
{
    'use strict';

    angular
        .module('app.comores.registresocial', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_registresocial', {
            url      : '/registresocial',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/registresocial/registresocial.html',
                    controller : 'RegistresocialController as vm'
                }
            },
            bodyClass: 'registresocial',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Régistre social"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.registresocial', {
            title: 'Régistre social',
            icon  : 'icon-swap-horizontal',
            state: 'app.comores_registresocial',
			  weight: 3
        });
    }

})();
