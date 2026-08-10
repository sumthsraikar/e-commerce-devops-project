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
    print(f"{BOLD} Web Page Availability & Load Test (50 Iterations){RESET}")
    print(f"{BOLD} Target URL:  {url}{RESET}")
    print(f"{BOLD} Iterations:  {iterations}{RESET}")
    print(f"{BOLD}===================================================={RESET}\n")

    total_passed = 0
    total_failed = 0
    response_times = []
    start_suite_time = time.time()

    for i in range(1, iterations + 1):
        req_start = time.time()

        try:
            req = urllib.request.urlopen(f"{url}/", timeout=5)
            status = req.getcode()
            content = req.read().decode('utf-8', errors='ignore')
            elapsed = round((time.time() - req_start) * 1000, 2)
            response_times.append(elapsed)

            if status == 200 and len(content) > 0:
                print(f"  [Iter {i:02d}/{iterations}] GET / (HTTP 200 OK) - Latency: {elapsed:6.2f} ms: {GREEN}PASSED{RESET}")
                total_passed += 1
            else:
                print(f"  [Iter {i:02d}/{iterations}] GET / (Status: {status}): {RED}FAILED{RESET}")
                total_failed += 1
        except Exception as e:
            elapsed = round((time.time() - req_start) * 1000, 2)
            print(f"  [Iter {i:02d}/{iterations}] GET / Error: {e} ({elapsed} ms): {RED}FAILED{RESET}")
            total_failed += 1

        time.sleep(0.05)

    total_suite_time = round(time.time() - start_suite_time, 2)
    avg_latency = round(sum(response_times) / len(response_times), 2) if response_times else 0
    min_latency = round(min(response_times), 2) if response_times else 0
    max_latency = round(max(response_times), 2) if response_times else 0

    print(f"\n{BOLD}===================================================={RESET}")
    print(f"{BOLD} FINAL TEST SUMMARY{RESET}")
    print(f"{BOLD}===================================================={RESET}")
    print(f" Total Loop Iterations:  {iterations}")
    print(f" {GREEN}Passed Iterations:      {total_passed}{RESET}")
    print(f" {RED}Failed Iterations:      {total_failed}{RESET}")
    print(f" Latency (Min/Avg/Max):  {min_latency} ms / {avg_latency} ms / {max_latency} ms")
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
