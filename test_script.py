#!/usr/bin/env python3
"""
Single Master Test Script for Flipkart Web Application
Target: http://3.88.199.213:111/
Iterations: 50 times loop
"""

import urllib.request
import urllib.error
import time
import sys

TARGET_URL = "http://3.88.199.213:111"
ITERATIONS = 50

# Colors for terminal output
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
BOLD = "\033[1m"
RESET = "\033[0m"

def run_master_test(url, iterations):
    print(f"{BOLD}===================================================={RESET}")
    print(f"{BOLD} Master Web Page Test Suite (50 Iterations Loop){RESET}")
    print(f"{BOLD} Target URL:  {url}{RESET}")
    print(f"{BOLD} Iterations:  {iterations}{RESET}")
    print(f"{BOLD}===================================================={RESET}\n")

    total_passed = 0
    total_failed = 0
    response_times = []
    start_suite_time = time.time()

    for i in range(1, iterations + 1):
        print(f"{YELLOW}--- Iteration [{i}/{iterations}] ---{RESET}")
        iter_success = True
        req_start = time.time()

        # 1. Test Root Web Page (HTTP 200 OK & Content Check)
        try:
            req = urllib.request.urlopen(f"{url}/", timeout=5)
            status = req.getcode()
            content = req.read().decode('utf-8')
            elapsed = round((time.time() - req_start) * 1000, 2)
            response_times.append(elapsed)

            if status == 200 and "Flipkart" in content and 'id="searchInput"' in content:
                print(f"  [Iter {i:02d}] GET / (HTTP 200 OK) - {elapsed}ms: {GREEN}PASSED{RESET}")
            else:
                print(f"  [Iter {i:02d}] GET / (Status: {status}): {RED}FAILED{RESET}")
                iter_success = False
        except Exception as e:
            print(f"  [Iter {i:02d}] GET / Error ({e}): {RED}FAILED{RESET}")
            iter_success = False

        # 2. Test styles.css
        try:
            req_css = urllib.request.urlopen(f"{url}/styles.css", timeout=5)
            if req_css.getcode() == 200:
                print(f"  [Iter {i:02d}] GET /styles.css (HTTP 200 OK): {GREEN}PASSED{RESET}")
            else:
                print(f"  [Iter {i:02d}] GET /styles.css: {RED}FAILED{RESET}")
                iter_success = False
        except Exception as e:
            print(f"  [Iter {i:02d}] GET /styles.css Error ({e}): {RED}FAILED{RESET}")
            iter_success = False

        # 3. Test app.js
        try:
            req_js = urllib.request.urlopen(f"{url}/app.js", timeout=5)
            if req_js.getcode() == 200:
                print(f"  [Iter {i:02d}] GET /app.js (HTTP 200 OK): {GREEN}PASSED{RESET}")
            else:
                print(f"  [Iter {i:02d}] GET /app.js: {RED}FAILED{RESET}")
                iter_success = False
        except Exception as e:
            print(f"  [Iter {i:02d}] GET /app.js Error ({e}): {RED}FAILED{RESET}")
            iter_success = False

        if iter_success:
            total_passed += 1
        else:
            total_failed += 1

        time.sleep(0.05)

    total_suite_time = round(time.time() - start_suite_time, 2)
    avg_latency = round(sum(response_times) / len(response_times), 2) if response_times else 0

    print(f"\n{BOLD}===================================================={RESET}")
    print(f"{BOLD} FINAL TEST SUMMARY{RESET}")
    print(f"{BOLD}===================================================={RESET}")
    print(f" Total Loop Iterations:  {iterations}")
    print(f" {GREEN}Passed Iterations:      {total_passed}{RESET}")
    print(f" {RED}Failed Iterations:      {total_failed}{RESET}")
    print(f" Average Latency:        {avg_latency} ms")
    print(f" Total Execution Time:   {total_suite_time} seconds")
    print(f"{BOLD}===================================================={RESET}")

    if total_failed == 0:
        print(f"\n{GREEN}{BOLD}✅ ALL 50 ITERATIONS PASSED SUCCESSFULLY!{RESET}")
        sys.exit(0)
    else:
        print(f"\n{RED}{BOLD}❌ {total_failed} ITERATION(S) FAILED.{RESET}")
        sys.exit(1)

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else TARGET_URL
    loops = int(sys.argv[2]) if len(sys.argv) > 2 else ITERATIONS
    run_master_test(url, loops)
