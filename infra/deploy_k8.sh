#!/bin/bash

cleanup() {
    echo "Stopping Minikube Tunnel..."
    pkill -f "minikube tunnel"
    exit 0
}

trap cleanup SIGINT

minikube stop
minikube start --cpus=4 --memory=4096 --disk-size=20g

eval $(minikube docker-env)

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

cd ./infra/helm/umbrella-chart
helm dependency update
helm uninstall antto
helm install antto ./

echo "Starting Minikube Tunnel... Press Ctrl+C to stop."
minikube tunnel &
TUNNEL_PID=$!

echo "Waiting for external IP..."
while true; do
    EXTERNAL_IP=$(kubectl get svc api-gateway --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")
    if [[ -n "$EXTERNAL_IP" ]]; then
        break
    fi
    sleep 2
done

PORT=$(kubectl get svc api-gateway -o=jsonpath='{.spec.ports[0].port}')
echo "API Gateway is accessible at: http://$EXTERNAL_IP:$PORT/docs"

wait $TUNNEL_PID
cleanup