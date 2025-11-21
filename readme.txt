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

solution and problem faced 

Everleaf Deployment – Full Explanation 1. How Deployment Works (Simple Explanation) You develop
your website locally. When you want to deploy: You build a Docker image of your application. You push
that image to Docker Hub, which acts like cloud storage for images. Kubernetes (Minikube in your
case) pulls that image and creates Pods (containers). A Service exposes your application through a
NodePort. You access the app using http://your-laptop-ip:nodeport from any device on WiFi. 2.
Problems Faced During Deployment Minikube Tunnel Conflict — An older tunnel kept running in the
background, blocking new ones. External IP Not Visible — LoadBalancer didn't give an IP unless
tunnel ran (Windows issue). Can't open app on phone/laptop — Because Docker driver uses an
internal network, NodePort wasn’t exposed outside. Hard to stop Minikube processes —
Permissions blocked forceful termination. Local IP Detection Issues — Script printed empty URL until
fixed. 3. How We Fixed Them Stopped Minikube and cleaned the environment fully. Used NodePort
instead of LoadBalancer to avoid tunneling issues. Hard coded access URL for stability. Ensured
service exposes port 30080 externally. Created a stable workflow for consistent deployment. 4.
DevOps Interview Cheat Sheet Docker – Builds container images for apps. Docker Hub – Stores
versioned images. Kubernetes Deployment – Manages Pods and ensures the app is always running.
NodePort Service – Exposes app on a port accessible in LAN. CI/CD Logic – Every code change →
build → push → deploy new version. Versioning – Tag images as v1, v2, v3 for each update. 5.
Resume Ready Project Description Project: Cloud Native Tea Store (Everleaf)
Implemented a full DevOps workflow using Docker, Kubernetes, and CI/CD style automation:
Containerized a React app using multi stage Docker builds. Pushed optimized images to Docker Hub
with version control. Deployed on Minikube using Kubernetes Deployments + NodePort Services.
Automated redeployments with simple scripts for rapid version updates. Enabled cross device access
and QR code deployment sharing. Architecture Diagram See attached PNG file:
everleaf_architecture.png
