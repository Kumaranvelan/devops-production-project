variable "region" {
  default = "us-east-1"
}

variable "ami" {
  description = "Ubuntu 22.04 AMI for us-east-1"
  default     = "ami-0c7217cdde317cfec"
}

variable "instance_type" {
  default = "t3.medium"
}

variable "key_name" {
  description = "Your existing AWS key pair name"
  default     = "devops-key"
}

variable "ecr_repo_name" {
  default = "devops-app"
}

variable "cluster_name" {
  default = "devops-cluster"
}

variable "node_instance_type" {
  default = "t3.medium"
}
