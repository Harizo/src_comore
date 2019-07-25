(function ()
{
    "use strict";

    angular
        .module("fuse")
		.constant("apiUrl", "http://localhost/2019/comores/api/index.php/api/")
		.constant("apiUrl_serve_central", "http://localhost/2019/comores/api/index.php/api/")//ip serveur cantrale si dans les ile pour l'envoi des données
		.constant("apiUrlbase", "http://localhost/2019/comores/")
		


		/*.constant("apiUrl", "http://serverdnsps:81/2019/comores/api/index.php/api/")
		.constant("apiUrl_serve_central", "http://serverdnsps:81/2019/comores/api/index.php/api/")//ip serveur cantrale si dans les ile pour l'envoi des données
		.constant("apiUrlbase", "http://serverdnsps:81/2019/comores/")*/



		.constant("apiUrlrecommandation", "recommandation/")
		.constant("etat_package", "centrale/");

		
})();
