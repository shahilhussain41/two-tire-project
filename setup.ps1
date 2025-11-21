# ==============================
# USER CONFIG
# ==============================
# Docker Hub username (push target)
$dockerUser = "shahil411"

# Image name and tag you want to build / push
$imageName  = "static-web"
$tag        = "latest"

# Construct the full image reference used by docker build/push and kubernetes image spec
$fullImage  = "${dockerUser}/${imageName}:${tag}"

# IP of the machine reachable from other devices (phone / other laptop)
# Update this to your Wi‑Fi IP or 0.0.0.0 if using port-forwarding/local testing only
$localIp = "192.168.0.174"

# NodePort on which Kubernetes Service will expose the app externally
$nodePort = 30080

# ==============================
Write-Host "`n===================================================="
Write-Host " CLEANING MINIKUBE & OLD RESOURCES"
Write-Host "===================================================="

# Stop and remove any existing minikube VM/cluster (quiet errors)
minikube stop 2>$null
minikube delete --all --purge 2>$null

# Remove existing Kubernetes objects (ignore if they don't exist)
kubectl delete deployment static-web --ignore-not-found
kubectl delete service static-web-service --ignore-not-found

# Remove the local Docker image if it exists (force, ignore errors)
docker rmi -f $fullImage 2>$null


# ==============================
Write-Host "`n===================================================="
Write-Host " BUILDING DOCKER IMAGE"
Write-Host "===================================================="

# Build the Docker image from the current directory (expects a Dockerfile here)
docker build -t $fullImage .


# ==============================
Write-Host "`n===================================================="
Write-Host " PUSHING IMAGE TO DOCKER HUB"
Write-Host "===================================================="

# Push the image to Docker Hub (ensure 'docker login' done beforehand)
docker push $fullImage


# ==============================
Write-Host "`n===================================================="
Write-Host " STARTING MINIKUBE WITH PORT FORWARDING"
Write-Host "===================================================="

# Start minikube with the docker driver and forward the chosen nodePort from host -> node
# The ${nodePort} syntax avoids PowerShell parsing issues with ":" in the --ports argument
minikube start --driver=docker --ports="${nodePort}:${nodePort}"


# ==============================
Write-Host "`n===================================================="
Write-Host " APPLYING DEPLOYMENT & NODEPORT SERVICE"
Write-Host "===================================================="

# Apply the Kubernetes manifests in the k8s folder (deployment.yaml must reference the image above)
kubectl apply -f .\k8s\deployment.yaml
kubectl apply -f .\k8s\service.yaml


# ==============================
Write-Host "`n===================================================="
Write-Host " WAITING FOR POD TO BE READY"
Write-Host "===================================================="

# Wait until the deployment rollout completes (blocks until ready or timeout)
kubectl rollout status deployment/static-web


# ==============================
Write-Host "`n===================================================="
Write-Host " 🌍 OPEN THIS ON PHONE / OTHER LAPTOP"
Write-Host "===================================================="

# Print the URL to access the service from other devices on the same network
Write-Host " http://${localIp}:${nodePort}"

Write-Host "`n===================================================="
