#!/bin/bash

# ==============================================================================
# Single Master Test Script for Flipkart Web Application
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
echo -e "${BOLD} Master Web Page Test Suite (50 Iterations Loop)${NC}"
echo -e "${BOLD} Target URL:  ${TARGET_URL}${NC}"
echo -e "${BOLD} Iterations:  ${ITERATIONS}${NC}"
echo -e "${BOLD}====================================================${NC}\n"

start_time=$(date +%s)

for (( i=1; i<=ITERATIONS; i++ ))
do
    echo -e "${YELLOW}--- Iteration [$i/$ITERATIONS] ---${NC}"
    iter_ok=true

    # 1. Test Root URL
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_URL}/")
    if [ "$HTTP_CODE" -eq 200 ]; then
        echo -e "  [Iter $i] GET / (HTTP 200 OK): ${GREEN}PASSED${NC}"
    else
        echo -e "  [Iter $i] GET / (HTTP $HTTP_CODE): ${RED}FAILED${NC}"
        iter_ok=false
    fi

    # 2. Test styles.css
    CSS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_URL}/styles.css")
    if [ "$CSS_CODE" -eq 200 ]; then
        echo -e "  [Iter $i] GET /styles.css (HTTP 200 OK): ${GREEN}PASSED${NC}"
    else
        echo -e "  [Iter $i] GET /styles.css (HTTP $CSS_CODE): ${RED}FAILED${NC}"
        iter_ok=false
    fi

    # 3. Test app.js
    JS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${TARGET_URL}/app.js")
    if [ "$JS_CODE" -eq 200 ]; then
        echo -e "  [Iter $i] GET /app.js (HTTP 200 OK): ${GREEN}PASSED${NC}"
    else
        echo -e "  [Iter $i] GET /app.js (HTTP $JS_CODE): ${RED}FAILED${NC}"
        iter_ok=false
    fi

    if [ "$iter_ok" = true ]; then
        ((PASSED++))
    else
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
