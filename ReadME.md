# DevOps Production Project

**Complete Production Pipeline: Terraform → AWS → Jenkins → Docker → EKS → Prometheus/Grafana**

## Project Overview

Production DevOps pipeline built from scratch demonstrating Infrastructure as Code, CI/CD automation, container orchestration, and monitoring on AWS.

**Tech Stack:** Terraform | AWS (VPC, EC2, EKS) | Jenkins | Docker | Kubernetes | Helm | Prometheus | Grafana | Node.js

---

## Architecture Flow

```
Terraform
    ↓
AWS Infrastructure (VPC, EC2, Security Groups)
    ↓
EC2 Instance (Jenkins, Docker, kubectl)
    ↓
Jenkins Pipeline (GitHub Webhook → Build → Push DockerHub → Deploy)
    ↓
AWS EKS Cluster (2 t3.medium nodes)
    ↓
Application Running (LoadBalancer Service)
    ↓
Prometheus + Grafana Monitoring
```

---

## What I Built

### Phase 1: Infrastructure (Terraform)
- Provisioned complete AWS setup using Terraform:
  - VPC (10.0.0.0/16) with public subnet
  - Internet Gateway, Route Tables
  - Security Groups (SSH, HTTP, Jenkins)
  - EC2 instance (t2.micro)
- All infrastructure defined as code - version controlled and reproducible

### Phase 2: CI/CD (Jenkins on EC2)
- Installed Jenkins, Docker, kubectl on EC2
- Created automated pipeline:
  1. GitHub webhook triggers on code push
  2. Jenkins builds Docker image
  3. Pushes to DockerHub
  4. Deploys to EKS using kubectl
- Secure credential management via Jenkins credentials store

### Phase 3: Kubernetes (AWS EKS)
- Deployed production cluster using eksctl:
  - Name: devops-cluster
  - Region: us-east-1
  - 2 worker nodes (t3.medium)
- Configured Jenkins user authentication to EKS
- Deployed Node.js app with LoadBalancer service
- Public URL: Application accessible via AWS ELB

### Phase 4: Monitoring (Prometheus + Grafana)
- Installed kube-prometheus-stack using Helm
- Configured Grafana dashboards for cluster monitoring
- Real-time metrics: CPU, memory, pod status, network traffic

---

## Key Challenges Solved

| Challenge | Solution |
|-----------|----------|
| No default VPC | Created complete VPC setup in Terraform |
| Dynamic AMI selection | Fetched latest AMI via AWS CLI instead of hardcoding |
| Docker permission denied | Added jenkins user to docker group + service restart |
| kubectl not configured for Jenkins | Copied kubeconfig and AWS credentials to /var/lib/jenkins/ |
| App not publicly accessible | Changed service type from ClusterIP to LoadBalancer |

---

## Files Structure

```
terraform/          # Infrastructure as Code
  ├── main.tf       # VPC, EC2, Security Groups
  ├── variables.tf
  └── outputs.tf

k8s/                # Kubernetes manifests
  ├── deployment.yaml
  └── service.yaml

Jenkinsfile         # CI/CD pipeline definition
DockerFile          # Application containerization
```

---

## Technologies Used

**Infrastructure:** Terraform, AWS (VPC, EC2, EKS, ELB, IAM)  
**CI/CD:** Jenkins, GitHub Webhooks  
**Containers:** Docker, DockerHub  
**Orchestration:** Kubernetes (AWS EKS), eksctl, kubectl  
**Monitoring:** Prometheus, Grafana, Helm  
**Application:** Node.js, MongoDB Atlas

---

## What I Learned

- **Infrastructure as Code:** Terraform for provisioning AWS resources, dynamic vs static configuration
- **Production CI/CD:** Jenkins pipeline automation, secure credential management, webhook triggers
- **Kubernetes Production:** EKS vs Minikube, service types, LoadBalancer integration, multi-user authentication
- **Monitoring:** Prometheus metrics collection, Grafana dashboards, Helm chart deployment
- **DevOps Practices:** Everything as code, documentation, troubleshooting production issues

---

## Setup & Deployment

**Prerequisites:** AWS Account, GitHub, DockerHub, Ubuntu/WSL

**Quick Start:**
```bash
# 1. Infrastructure
cd terraform/ && terraform init && terraform apply

# 2. Jenkins Setup
ssh into EC2 → Install Jenkins, Docker, kubectl

# 3. EKS Cluster
eksctl create cluster --name devops-cluster --region us-east-1 --nodes 2

# 4. Monitoring
helm install monitoring prometheus-community/kube-prometheus-stack

# 5. Deploy App
Configure Jenkins pipeline → Push code → Auto-deploy to EKS
```

**Full documentation available in project PDF**

---

## Cost & Cleanup

**Estimated Cost:** ~$6/day (EKS control plane + 2 nodes + EC2)

**Delete All Resources:**
```bash
eksctl delete cluster --name devops-cluster --region us-east-1
cd terraform/ && terraform destroy
```

---

## Author

**Kumaravelan Subramani**  
GitHub: [@Kumaranvelan](https://github.com/Kumaranvelan) | LinkedIn: [kumaravelan-subramani](https://linkedin.com/in/kumaravelan-subramani-a1399b253)

---

**Note:** This project was built for learning and demonstration purposes. All AWS resources will be deleted after documentation to avoid ongoing costs.
