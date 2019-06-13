(function ()
{
    'use strict';

    angular
        .module('app.comores.enquete.individu', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_enquete_individu', {
            url      : '/enquete/individu',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/enquete/individu/individu.html',
                    controller : 'IndividuController as vm'
                }
            },
            bodyClass: 'individu',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "individu"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.enquete.individu', {
            title: 'Individu',
            icon  : 'icon-swap-horizontal',
            state: 'app.comores_enquete_individu',
            weight: 2
        });
    }

})();
