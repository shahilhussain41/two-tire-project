# ==============================
# USER CONFIG
# ==============================
$dockerUser = "shahil411"
$imageName  = "static-web"
$tag        = "latest"

$fullImage  = "${dockerUser}/${imageName}:${tag}"

$localIp = "192.168.0.174"   # <-- Your laptop WiFi IP
$nodePort = 30080            # <-- NodePort value


# ==============================
Write-Host "`n===================================================="
Write-Host " CLEANING MINIKUBE & OLD RESOURCES"
Write-Host "===================================================="

minikube stop 2>$null
minikube delete --all --purge 2>$null

kubectl delete deployment static-web --ignore-not-found
kubectl delete service static-web-service --ignore-not-found

docker rmi -f $fullImage 2>$null


# ==============================
Write-Host "`n===================================================="
Write-Host " BUILDING DOCKER IMAGE"
Write-Host "===================================================="

docker build -t $fullImage .


# ==============================
Write-Host "`n===================================================="
Write-Host " PUSHING IMAGE TO DOCKER HUB"
Write-Host "===================================================="

docker push $fullImage


# ==============================
Write-Host "`n===================================================="
Write-Host " STARTING MINIKUBE WITH PORT FORWARDING"
Write-Host "===================================================="

# FIX: use ${nodePort} to avoid PowerShell colon bug
minikube start --driver=docker --ports="${nodePort}:${nodePort}"


# ==============================
Write-Host "`n===================================================="
Write-Host " APPLYING DEPLOYMENT & NODEPORT SERVICE"
Write-Host "===================================================="

kubectl apply -f .\k8s\deployment.yaml
kubectl apply -f .\k8s\service.yaml


# ==============================
Write-Host "`n===================================================="
Write-Host " WAITING FOR POD TO BE READY"
Write-Host "===================================================="

kubectl rollout status deployment/static-web


# ==============================
Write-Host "`n===================================================="
Write-Host " 🌍 OPEN THIS ON PHONE / OTHER LAPTOP"
Write-Host "===================================================="

# FIX: use ${localIp} and ${nodePort}
Write-Host " http://${localIp}:${nodePort}"

Write-Host "`n===================================================="
