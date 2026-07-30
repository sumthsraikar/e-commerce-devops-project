#!/usr/bin/env bash
# ==============================================================================
# Amazon Linux 2023 Automated Setup & Dependency Installation Script
# Project: E-Commerce Microservices Platform (5 Dockerfiles)
# Target OS: Amazon Linux 2023 (AL2023)
# ==============================================================================

set -euo pipefail

# Color Codes for Terminal Output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${CYAN}[INFO] ${1}${NC}"
}

log_success() {
    echo -e "${GREEN}[SUCCESS] ${1}${NC}"
}

log_warn() {
    echo -e "${YELLOW}[WARNING] ${1}${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] ${1}${NC}"
}

# Ensure script is executed with root / sudo privileges
if [ "$EUID" -ne 0 ]; then
    log_error "This script must be run as root or with sudo:"
    echo "  sudo bash setup-amazon-linux-2023.sh"
    exit 1
fi

log_info "Starting environment setup for Amazon Linux 2023..."

# ------------------------------------------------------------------------------
# 1. System Update
# ------------------------------------------------------------------------------
log_info "Updating system packages via dnf..."
dnf update -y

# ------------------------------------------------------------------------------
# 2. Core Development Utilities
# ------------------------------------------------------------------------------
log_info "Installing essential CLI tools (git, curl, wget, jq, tar, unzip, htop)..."
dnf install -y \
    git \
    curl \
    wget \
    jq \
    tar \
    gzip \
    unzip \
    htop \
    ca-certificates

# ------------------------------------------------------------------------------
# 3. Docker Engine & Service Setup
# ------------------------------------------------------------------------------
log_info "Installing Docker Container Engine..."
dnf install -y docker

log_info "Enabling and starting Docker daemon..."
systemctl enable docker
systemctl start docker

# Add ec2-user and current user to docker group
if id "ec2-user" &>/dev/null; then
    log_info "Adding 'ec2-user' to the docker security group..."
    usermod -aG docker ec2-user
fi

if [ -n "${SUDO_USER:-}" ]; then
    log_info "Adding user '${SUDO_USER}' to the docker security group..."
    usermod -aG docker "${SUDO_USER}"
fi

# ------------------------------------------------------------------------------
# 4. Docker Compose V2 Installation
# ------------------------------------------------------------------------------
log_info "Installing Docker Compose V2 plugin..."
COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r '.tag_name')

if [ -z "$COMPOSE_VERSION" ] || [ "$COMPOSE_VERSION" == "null" ]; then
    COMPOSE_VERSION="v2.24.5"
fi

log_info "Downloading Docker Compose binary (${COMPOSE_VERSION})..."
mkdir -p /usr/local/lib/docker/cli-plugins
curl -SL "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-x86_64" \
    -o /usr/local/lib/docker/cli-plugins/docker-compose

chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Create symlink for standalone `docker-compose` command access
ln -sf /usr/local/lib/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose

# ------------------------------------------------------------------------------
# 5. Node.js & Python Runtimes Installation
# ------------------------------------------------------------------------------
log_info "Installing Node.js & npm..."
dnf install -y nodejs npm

log_info "Installing Python 3.11 & Pip..."
dnf install -y python3.11 python3-pip

# ------------------------------------------------------------------------------
# 6. Verification & Health Summary
# ------------------------------------------------------------------------------
echo ""
echo "=============================================================================="
log_success "Amazon Linux 2023 Setup Complete!"
echo "=============================================================================="
echo "Installed Component Versions:"
echo -n "  • Docker:         "; docker --version
echo -n "  • Docker Compose: "; docker compose version
echo -n "  • Node.js:        "; node --version
echo -n "  • npm:            "; npm --version
echo -n "  • Python:         "; python3.11 --version
echo -n "  • Git:            "; git --version
echo "=============================================================================="
log_warn "IMPORTANT NOTE:"
log_warn "If logged in as ec2-user, run 'newgrp docker' or re-login for non-sudo docker usage."
echo "=============================================================================="
echo ""
echo "Next Steps to Launch Microservices:"
echo "  1. Clone repository:  git clone <your-repo-url>"
echo "  2. Change directory:   cd devops-project-1"
echo "  3. Launch containers:  docker compose up --build -d"
echo ""
