we will be creating a two tire project with differnt cloud applications 
1. ci/cd
2. jenkins
3. kubernaties 

Architecture Flow
=================
Developer → GitHub/GitLab Repo → Jenkins (CI/CD) → Docker Build → Kubernetes (Minikube/Kind) → Local Server → User (Browser)


Project Overview
================

We’ll create a Tea Website (frontend in React) and host it with a 2-tier architecture:

Frontend (React app) → User Interface

Backend / Container orchestration → Using Kubernetes with CI/CD

Since you want it locally hosted, we’ll rely on your local machine (or a small VM) to avoid cloud cost.

Folder Stracture 
├── frontend/                     # React Application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── TeaCard.js
│   │   ├── pages/                # Page views
│   │   │   ├── Home.js
│   │   │   ├── Menu.js
│   │   │   └── Contact.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/               # Custom CSS
│   │       └── main.css
│   ├── package.json
│   └── Dockerfile                # Docker build for frontend
│
├── k8s/                          # Kubernetes Manifests
│   ├── deployment.yaml            # Deployment for tea app
│   ├── service.yaml               # Service (NodePort / LoadBalancer)
│   └── ingress.yaml               # Optional: Ingress config
│
├── jenkins/                      # Jenkins CI/CD configs
│   └── Jenkinsfile
│
├── .gitignore
└── README.md
