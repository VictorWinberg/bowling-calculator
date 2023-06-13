rm:
	cd presenter-svc; docker compose rm -f
	cd calculator-svc; docker compose rm -f
	cd rolls-svc; docker compose rm -f
	docker compose pull

up:
	cd rolls-svc; docker compose up --build -d
	cd calculator-svc; docker compose up --build -d
	cd presenter-svc; docker compose up --build -d

down:
	cd rolls-svc; docker compose down
	cd calculator-svc; docker compose down
	cd presenter-svc; docker compose down
