install: ## installe l'api
	symfony composer install
	symfony console doctrine:database:create
	make rebuild

rebuild: ## rebuild bdd
	symfony console doctrine:database:drop -f
	symfony console doctrine:database:create
	symfony console doctrine:schema:update -f
	APP_ENV=dev symfony console doctrine:fixtures:load -n
	symfony console c:c
	rm -Rf var/cache/*

stan: ## Limite la mémoire de stan à 1Go et permet d'éviter les erreurs courantes et à faciliter le débogage
	symfony php vendor/phpstan/phpstan/phpstan analyse -c ../../.husky/phpstan-conf.neon --memory-limit 1G

fixer: ## Formate le code pour php-cs-fixer
	symfony php vendor/friendsofphp/php-cs-fixer/php-cs-fixer fix src --diff --dry-run

fixer-fix: ## cs fixer
	symfony php vendor/friendsofphp/php-cs-fixer/php-cs-fixer fix --diff

rector:
	symfony php vendor/bin/rector process src --dry-run

rector-fix:
	symfony php vendor/bin/rector process src

## Makefile pour Symfony sous Windows - il faut installer make via chocolaty - choco install make - en mode administrateur

PHP=php
SYMFONY=symfony

# Lancer le serveur de développement
serveWin:
	$(SYMFONY) server:start

# Arrêter le serveur de développement
stop-serveWin:
	$(SYMFONY) server:stop

# Installer l'API
installWin:
	$(SYMFONY) composer install
	$(SYMFONY) console doctrine:database:create
	@make rebuild

# Rebuild de la base de données
rebuildWin:
	$(SYMFONY) console doctrine:database:drop --force
	$(SYMFONY) console doctrine:database:create
	$(SYMFONY) console doctrine:schema:update --force
	$(SYMFONY) console doctrine:fixtures:load --no-interaction
	$(SYMFONY) console cache:clear
	if exist var\cache rmdir /S /Q var\cache

# PHPStan
stanWin:
	$(PHP) vendor\phpstan\phpstan\phpstan analyse -c ..\..\..\.husky\phpstan-conf.neon --memory-limit 1G

# PHP CS Fixer
fixerWin:
	$(PHP) vendor\friendsofphp\php-cs-fixer\php-cs-fixer fix src --diff --dry-run

# RECTOR
rectorWin:
	$(PHP) vendor/bin/rector process src --dry-run

.PHONY: serve stop-serve install rebuild stan fixer
