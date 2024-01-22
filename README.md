# LaNewSchool
Pour l'installation de Caddy:

Ne pas oublier de définir le fichier host:
Dans le terminal taper la commande sudo vi /etc/hosts
A la demande password mettre le MDP de l'ordi.

au dessus de la ligne 127.0.0.1 réécrire
127.0.0.1 lanewschool.wip api.lanewschool.wip

et faire un symfony serve --allow http

vidéo : regarder à partir de 20min  https://www.youtube.com/watch?v=La8y_Kmq_Hg

POUR LANCER LES SERVEURS

Ouvrir un terminal et se mettre sur le dossier front et faire un 
"npm start"

Ouvrir  un autre terminal et se mettre à la racine et faire
"symfony serve --allow-http"

Se mettre a la racine du projet "LaNewSchool"
Faire un caddy run

Ouvrir une page web et taper https://lanewschool.wip et vous verrez la page front.

Ouvrir une page web et taper https://api.lanewschool.wip et vous verrez la page d'acceuil de Symfony

Si vous rajouter :api => https://api.lanewschool.wip/api vous verrez la page API


