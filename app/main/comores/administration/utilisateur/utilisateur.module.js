(function ()
{
    'use strict';

    angular
        .module('app.comores.administration.utilisateur', [])
        .run(notification)        
        .config(config);
        var vs = {};
        var affichage;
    
    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_admin_utilisateur', {
            url      : '/administration/utilisateur',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/administration/utilisateur/utilisateur.html',
                    controller : 'UserController as vm'
                }
            },
            bodyClass: 'utilisateur',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Gestion_utilisateur"
            }
        });

        

        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.utilisateurs', {
            title: 'Gestion utilisateurs',
            icon  : 'icon-account-key',
            state: 'app.comores_admin_utilisateur',
            badge:vs,
            hidden:function()
            {
                    return affichage;
            }
        });
    }

    function notification($cookieStore,apiFactory,$interval,loginService)
    {
        var id_user = $cookieStore.get('id');
       
        
        

        

        if (id_user > 0) 
        {
            var permission = [];
            
            apiFactory.getUserByEnabled("utilisateurs",Number(1)).then(function(result) 
            {
                var x = result.data.response;
                vs.content = x.nbr ;
                vs.color = '#F44336' ;

            });

            apiFactory.getOne("utilisateurs/index", id_user).then(function(result) 
            {

                //**************************************************
                $interval(function()
                {
                    apiFactory.getUserByEnabled("utilisateurs",Number(1)).then(function(result) 
                    {
                        var x = result.data.response;
                        vs.content = x.nbr ;
                   
                        vs.color = '#F44336' ;

                    });
                },15000) ;
                //**************************************************
                var user = result.data.response;
               

                var permission = user.roles;
                var permissions = ["ADMIN"];
                affichage =  loginService.gestionMenu(permissions,permission);        
                

            });
        }
     
    }

})();
