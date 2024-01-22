install-front: ## Installe le front
	cd apps/front && rm -rf node-modules/ && npm install

install-api: ## Installe l'api
	cd apps/api &&  composer install

database: ## Supprime, crée la base de données et charge les fixtures
	cd apps/api && symfony console doctrine:database:drop --force && symfony console doctrine:database:create --if-not-exists
	make database-migrate
	make load-fixtures

database-migrate:
	cd apps/api && symfony console doctrine:migrations:migrate

load-fixtures:
	cd apps/api && symfony console doctrine:fixtures:load

install: ## Installe l'api, front et charge la base de données
	npm install
	make install-api
	make install-front
	make database

fixer: 

start-back: ## Demarre le back
	cd apps/api && php symfony server:start

start-front: ## Demarre le front
	cd apps/front && npm run serve
