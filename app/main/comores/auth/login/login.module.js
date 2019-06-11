(function ()
{
    'use strict';

    angular
        .module('app.comores.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_auth_login', {
            url      : '/auth/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.comores_auth_login': {
                    templateUrl: 'app/main/comores/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login',
            data : {
              authorizer : false,
              permitted : ["USER"],
              page: "Authentification"
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/comores/auth/login');
    }

})();
