#!/bin/bash
# Linux shell script to execute E2E test in background

LOG_FILE="test_execution.log"
PYTHON_BIN=$(which python3 || which python)

echo "=========================================="
echo " Launching E2E test script in background"
echo " Target: http://34.207.100.138/#"
echo " Output Log: $LOG_FILE"
echo "=========================================="

nohup $PYTHON_BIN test_script.py > "$LOG_FILE" 2>&1 &

PID=$!
echo "✅ Test script successfully started in background (PID: $PID)"
echo "Check live log output with: tail -f $LOG_FILE"
