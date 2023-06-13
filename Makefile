rm:
	cd calculator-svc; docker compose rm -f
	cd presenter-svc; docker compose rm -f
	cd rolls-svc; docker compose rm -f
	docker compose pull

up:
	cd calculator-svc; docker compose up --build -d
	cd presenter-svc; docker compose up --build -d
	cd rolls-svc; docker compose up --build -d

down:
	cd calculator-svc; docker compose down
	cd presenter-svc; docker compose down
	cd rolls-svc; docker compose down

up-prod:
	cd calculator-svc; docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
	cd presenter-svc; docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
	cd rolls-svc; docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d