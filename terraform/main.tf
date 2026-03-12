provider "aws" {
  region = "us-east-1"
  }

resource "aws_instance" "devops_server" {
  ami = "ami-0f58b397bc5c1f2e8"
  instance_type = "t2.micro"

  key_name = "devops-key"
  user-data = file("user-data.sh")

  tags = {
  Name = "DevopsServer"
  }

  }
