 ____________________________________
|StarTalk AAW, M1 Informatique       |	
|- CAILLAUD Tom                      |      
|- BEN MOHAND Macine                 |  
|- HERVOUET Leo                      |  
|- AL NATOUR Mazen                   |            
|____________________________________|

Vous trouverez 3 dossiers et un fichier dans le répertoire StarTalk qui sont importants :
---------------------------------------------------------------------------------------

	* BackEnd : contenant tout le code de la partie serveur.

	* FrontEnd : contenant tout le code de la partie client.

	* DiscordBot : contenant tout le code du bot Discord.
	
	* server.js : contenant le code du serveur backend afin de lancer le serveur ainsi que le bot.



StarTalk est en ligne à cette adresse : 
--------------------------------------

	https://startalk-project.onrender.com  

	/!\ Note : Le site est hébergé sur un serveur gratuit, donc il peut mettre beaucoup (beaucoup) de temps à charger parfois. /!\


Une petite présentation de StarTalk vous intéresserait ?
--------------------------------------------------------

	c'est disponible ici : https://youtu.be/VZ32jfLI0jw


Comment lancer StarTalk en local ? 
----------------------------------

/!\ Note : Assurez-vous d'avoir correctement configuré le fichier .env ; dans le cas contraire, cela ne fonctionnera pas /!\

	1- Commencez par builder le front avec cette commande : 

		npm run build

	2- Lancez le serveur backend :

		npm run start

	   /!\ cela a pour effet de lancer également le bot Discord /!\


	Une fois lancé en local, le site sera disponible à l'adresse : http://localhost:8080.

StarTalk, c'est quoi ?
---------------------
	
	StarTalk est un réseau social où vous pourrez laisser s'exprimer votre âme d'écrivain. Ce site Web vous permettra de publier vos citations.

StarTalk Cahier des charges :
-----------------------------

	Tout le cahier des charges présent ici : https://aaw-module.serliapps.dev/projet, ainsi que les demandes optionnelles ( textes en bleu), ont été réalisées.


StarTalk DiscordBot :
---------------------

	Comme dit précédemment, le bot Discord a été réalisé complètement et se lancera en lançant le backend via cette commande : npm run start.

	Voici l'invit url afin d'ajouter le bot sur un serveur :  https://discord.com/api/oauth2/authorize?client_id=1171819654637957121&permissions=8&scope=bot 

	Le bot a 5 commandes :

		-> /stt-cits add 
			Cela ouvrira un modal afin d'ajouter une nouvelle citation.

		-> /stt-cits all 
			Cela va récupérer un nombre aléatoire (entre 1-4) de citations créées par l'utilisateur qui entre la commande.

		-> /stt-cits get [target]
			Même chose que la commande précédente mais pour l'utilisateur mis en argument, le target.

		-> /stt-cits fav 
			Cela va récupérer un nombre aléatoire (entre 1-4) de citations favorisées par l'utilisateur qui entre la commande.

		-> /stt-cits liked 
			Cela va récupérer un nombre aléatoire (entre 1-4) de citations likés par l'utilisateur qui entre la commande.


N'hésitez pas à explorer StarTalk et à partager vos pensées :)
