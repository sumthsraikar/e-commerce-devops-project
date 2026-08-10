#!/bin/bash

# ==============================================================================
# Single Master Test Script for Web Application
# Target: http://3.88.199.213:111/
# Iterations: 50 times loop
# ==============================================================================

TARGET_URL="${1:-http://3.88.199.213:111}"
ITERATIONS="${2:-50}"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

PASSED=0
FAILED=0

echo -e "${BOLD}====================================================${NC}"
echo -e "${BOLD} Web Page Availability & Load Test (50 Iterations)${NC}"
echo -e "${BOLD} Target URL:  ${TARGET_URL}${NC}"
echo -e "${BOLD} Iterations:  ${ITERATIONS}${NC}"
echo -e "${BOLD}====================================================${NC}\n"

start_time=$(date +%s)

for (( i=1; i<=ITERATIONS; i++ ))
do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_URL}/")
    if [ "$HTTP_CODE" -eq 200 ]; then
        echo -e "  [Iter $(printf "%02d" $i)/$ITERATIONS] GET / (HTTP 200 OK): ${GREEN}PASSED${NC}"
        ((PASSED++))
    else
        echo -e "  [Iter $(printf "%02d" $i)/$ITERATIONS] GET / (HTTP $HTTP_CODE): ${RED}FAILED${NC}"
        ((FAILED++))
    fi
    sleep 0.05
done

end_time=$(date +%s)
duration=$((end_time - start_time))

echo -e "\n${BOLD}====================================================${NC}"
echo -e "${BOLD} FINAL TEST SUMMARY (${duration}s)${NC}"
echo -e "${BOLD}====================================================${NC}"
echo -e " Total Loop Iterations:  ${ITERATIONS}"
echo -e " ${GREEN}Passed Iterations:      ${PASSED}${NC}"
echo -e " ${RED}Failed Iterations:      ${FAILED}${NC}"
echo -e "${BOLD}====================================================${NC}"

if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}${BOLD}✅ ALL 50 ITERATIONS PASSED SUCCESSFULLY!${NC}"
    exit 0
else
    echo -e "\n${RED}${BOLD}❌ ${FAILED} ITERATION(S) FAILED.${NC}"
    exit 1
fi
