up:
	docker-compose up -d

install_backend: up
	@docker exec backend npm install

install_frontend: up
	@docker exec frontend npm install

clean_backend:
	@docker exec -u root backend rm -rf /backend/node_modules

clean_frontend:
	@docker exec -u root frontend rm -rf /frontend/node_modules

dev_backend: up
	@docker exec backend npm run dev

dev_frontend: up
	@docker exec frontend npm run start

start_backend: up
	@docker exec backend npm run start

start_frontend: up
	@docker exec frontend npm run start

install: up install_backend install_frontend

dev: install dev_backend dev_frontend

start: up start_backend start_frontend

stop:
	docker-compose stop

down:
	docker-compose down

clean: clean_backend clean_frontend