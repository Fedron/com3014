#!/bin/bash

cleanup() {
    echo "Stopping Minikube Tunnel..."
    pkill -f "minikube tunnel"
    exit 0
}

trap cleanup SIGINT

minikube start --cpus=4 --memory=4096 --disk-size=20g

eval $(minikube -p minikube docker-env)

echo "Building auth-service docker image"
docker build -t auth-service:latest -f services/auth-service/Dockerfile .

echo "Building API Gateway docker image"
docker build -t api-gateway:latest -f api-gateway/Dockerfile .

echo "Building events-service docker image"
cd services/event_service
docker build -t events-service:latest .

echo "Building community-service docker image"
cd ../..
docker build -t community-service:latest -f services/community-service/Dockerfile .

echo "Building content-service docker image"
docker build -t content-service:latest -f services/content-service/Dockerfile .

echo "Building frontend docker image"
cd ./a.n.t.t.o
docker build -t frontend:latest .

echo "Deploying ANTTO"
cd ../infra/helm/umbrella-chart
helm dependency update
helm uninstall antto
helm install antto ./

echo "Deploying observability stack"
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace

kubectl patch svc prometheus-grafana -n monitoring -p '{"spec": {"type": "LoadBalancer"}}'

kubectl --namespace monitoring get secrets prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo

echo "Starting Minikube Tunnel... Press Ctrl+C to stop."
minikube tunnel &
TUNNEL_PID=$!

echo "Waiting for external IP..."
while true; do
    API_EXTERNAL_IP=$(kubectl get svc api-gateway --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")
    if [[ -n "$API_EXTERNAL_IP" ]]; then
        break
    fi
    sleep 2
done

while true; do
    FRONTEND_EXTERNAL_IP=$(kubectl get svc frontend --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")
    if [[ -n "$FRONTEND_EXTERNAL_IP" ]]; then
        break
    fi
    sleep 2
done

API_PORT=$(kubectl get svc api-gateway -o=jsonpath='{.spec.ports[0].port}')
echo "API Gateway is accessible at: http://$API_EXTERNAL_IP:$API_PORT/docs"

FRONTEND_PORT=$(kubectl get svc frontend -o=jsonpath='{.spec.ports[0].port}')
echo "Frontend is accessible at: http://$FRONTEND_EXTERNAL_IP:$FRONTEND_PORT"

wait $TUNNEL_PID
cleanup