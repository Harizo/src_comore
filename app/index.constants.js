(function ()
{
    "use strict";

    angular
        .module("fuse")

		//localhost        
		/*.constant("apiUrl", "http://localhost/2019/comores/api/index.php/api/")
		.constant("apiUrlbase", "http://localhost/2019/comores/")
		.constant("apiUrlexcel", "http://localhost/2019/comores/assets/excel/")*/
		//localhost

		//EXTERNE ANACEP        
		/*.constant("apiUrl", "http://197.255.232.54:81/2019/comores/api/index.php/api/")
		.constant("apiUrlbase", "http://197.255.232.54:81/2019/comores/")
		.constant("apiUrlexcel", "http://197.255.232.54:81/2019/comores/assets/excel/")*/
		//EXTERNE ANACEP

		//INTERNE ANACEP        
		.constant("apiUrl", "http://serverdnsps:81/2019/comores/api/index.php/api/")
		.constant("apiUrlbase", "http://serverdnsps:81/2019/comores/")
		.constant("apiUrlexcel", "http://serverdnsps:81/2019/comores/assets/excel/")
		//INTERNE ANACEP

		//serveur centrale MORONI
		.constant("apiUrl_serve_central", "http://197.255.232.54:81/2019/comores/api/index.php/api/")//ip serveur cantrale si dans les ile pour l'envoi des données
		//fin serveur centrale MORONI

		/*//serveur centrale ASTRUM
		.constant("apiUrl_serve_central", "http://192.168.88.200/2019/comores/api/index.php/api/")//ip serveur cantrale si dans les ile pour l'envoi des données
		//fin serveur centrale ASTRUM*/

		
		.constant("apiUrlrecommandation", "recommandation/")
		.constant("serveur_central", true);

		/*

		serveur moroni = serverdnsps:81

		*///

		
})();
