# Docker Assignment: Node.js + Flask with Docker Compose

Two-container full-stack app per the assignment brief: Express frontend and Flask backend connected on a shared Docker Compose bridge network.

## Run
Install/start Docker Desktop, then run from this folder:
```powershell
docker compose up --build -d
docker compose ps
```
Open http://localhost:3000 and submit the form. Health checks: http://localhost:3000/health and http://localhost:5000/health. Logs: `docker compose logs --tail=100`. Stop: `docker compose down`.

## Publish to Docker Hub
Create repositories named `tutedude-node-frontend` and `tutedude-flask-backend` in your account, then run:
```powershell
docker login
docker build -t YOUR_DOCKERHUB_USERNAME/tutedude-node-frontend:latest ./frontend
docker build -t YOUR_DOCKERHUB_USERNAME/tutedude-flask-backend:latest ./backend
docker push YOUR_DOCKERHUB_USERNAME/tutedude-node-frontend:latest
docker push YOUR_DOCKERHUB_USERNAME/tutedude-flask-backend:latest
```
Replace the username placeholder with your own Docker Hub username.

## Publish to GitHub
Create a repository named `Docker_Tanishk_Singh`, then from this folder:
```powershell
git init
git add .
git commit -m "Complete Docker assignment"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Docker_Tanishk_Singh.git
git push -u origin main
```
Replace the GitHub username placeholder. Add the final repository link after pushing.

## Structure
- `frontend/`: Express app, HTML/CSS, Dockerfile
- `backend/`: Flask API, requirements, Dockerfile
- `docker-compose.yml`: builds and connects both services
- `docs/`: assignment documentation and sample illustrations

## Evidence integrity
Images named `sample_*.png` are explicitly illustrative expected-output examples, not genuine execution screenshots. Replace them with screenshots from your own Docker run before presenting them as execution evidence. GitHub and Docker Hub publishing require your own accounts.
