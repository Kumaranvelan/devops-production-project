output "jenkins_public_ip" {
  description = "Jenkins EC2 public IP — open this in browser on port 8080"
  value       = aws_instance.jenkins_server.public_ip
}

output "ecr_repository_url" {
  description = "ECR URL — used in Jenkinsfile to push Docker images"
  value       = aws_ecr_repository.app_repo.repository_url
}

output "eks_cluster_name" {
  description = "EKS cluster name — used in kubectl and Jenkinsfile"
  value       = aws_eks_cluster.devops_cluster.name
}

output "eks_cluster_endpoint" {
  description = "EKS API endpoint"
  value       = aws_eks_cluster.devops_cluster.endpoint
}
