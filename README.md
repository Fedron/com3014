# A.N.T.T.O

## Deployment

### Requirements
- Minikube
- Docker
- Helm

### Steps

```bash
minikube start --cpus=4 --memory=8192 --disk-size=20g
minikube addons enable ingress
minikube image load auth-service
cd infra/helm/umbrella-chart
helm dependency update
helm install antto ./
```