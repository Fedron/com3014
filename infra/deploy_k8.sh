minikube start --cpus=4 --memory=4096 --disk-size=20g
minikube addons enable ingress
minikube image load auth-service
minikube image load api-gateway
cd infra/helm/umbrella-chart
helm dependency update
helm uninstall antto
helm install antto ./