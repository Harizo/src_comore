(function ()
{
    'use strict';

    angular
        .module('app.comores.auth.register', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_auth_register', {
            url      : '/auth/register',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.comores_auth_register': {
                    templateUrl: 'app/main/comores/auth/register/register.html',
                    controller : 'RegisterController as vm'
                }
            },
            bodyClass: 'register',
            data : {
              authorizer : false,
              permitted : ["USER"],
              page: "Enregistrement"
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/comores/auth/register');
    }

})();
