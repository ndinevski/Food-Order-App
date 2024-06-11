### Introduction

**Introduction to the DevOps Project for the Food Order App**

This project represents a comprehensive end-to-end DevOps process for a food order application developed using React with TypeScript for the frontend and Express.js for the backend. The project utilizes various tools and services to ensure a seamless CI/CD workflow (Jenkins, Argo CD), with automated deployments in a Kubernetes cluster managed by AWS EKS (Elastic Kubernetes Service).

### Project Overview

**Application**
- Frontend: React with TypeScript
- Backend: Express.js

**DevOps Pipeline**

1. **Source Code Control:** Every change is pushed to the GitHub repository.
2. **CI/CD with Jenkins:** Jenkins runs on two EC2 machines (Master, Agent) and is configured to monitor the repository for changes. With each new change, Jenkins automatically:
   - Pulls the code from GitHub.
   - Builds and tests the code.
   - Builds the Docker image and pushes it to DockerHub.
   - Updates the Kubernetes manifests in the GitOps repository.
3. **Automated Deployments with Argo CD:** Argo CD is set up on the EKS cluster connected to an EC2 machine and constantly monitors the GitOps repository for changes. When a change is detected, ArgoCD automatically applies the new version of the application in production and updates the manifests.

### AWS Infrastructure

- **Jenkins Master and Agent:** Hosted on EC2 machines.
- **EKS Cluster:** Consists of 3 node groups, each on separate EC2 machines.
- **ArgoCD:** Deployed on the EKS cluster to manage continuous deployments.

This DevOps process ensures a seamless flow of code from development to production, enabling fast and reliable releases of new application versions.
