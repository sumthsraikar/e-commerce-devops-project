#!/bin/bash
# E2E Test Setup & Runner for Linux (Amazon Linux / RHEL / Ubuntu)

LOG_FILE="test_execution.log"

echo "=========================================="
echo " 1. Installing System & Browser Dependencies"
echo "=========================================="

# Automatically detect package manager (yum, dnf, or apt-get)
if command -v dnf &> /dev/null; then
    echo "Detected dnf package manager..."
    sudo dnf install -y nss atk at-spi2-atk cups-libs libdrm libxkbcommon libXcomposite libXdamage libXext libXfixes libXrandr gbm pango cairo alsa-lib at-spi2-core libXtst mesa-libgbm
elif command -v yum &> /dev/null; then
    echo "Detected yum package manager..."
    sudo yum install -y nss atk at-spi2-atk cups-libs libdrm libxkbcommon libXcomposite libXdamage libXext libXfixes libXrandr gbm pango cairo alsa-lib at-spi2-core libXtst mesa-libgbm
elif command -v apt-get &> /dev/null; then
    echo "Detected apt-get package manager..."
    sudo apt-get update && sudo apt-get install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2
fi

PYTHON_BIN=$(which python3 || which python)

# Ensure python playwright package is installed
if ! $PYTHON_BIN -c "import playwright" &> /dev/null; then
    echo "Installing playwright python package..."
    $PYTHON_BIN -m pip install playwright
fi

# Install Chromium browser binary for Playwright
echo "Installing Chromium browser binaries..."
$PYTHON_BIN -m playwright install chromium

echo "=========================================="
echo " 2. Launching E2E Test in Background"
echo " Target: http://34.207.100.138/#"
echo " Log File: $LOG_FILE"
echo "=========================================="

nohup $PYTHON_BIN test_script.py > "$LOG_FILE" 2>&1 &

PID=$!
echo "✅ Test script started in background (PID: $PID)"
echo "To check live execution logs run: tail -f $LOG_FILE"
