# Postman API Testing | Functional & Negative Tests

## Project Overview

A hands-on API testing project using Postman and the Postman Echo API to develop practical experience with REST API requests, JSON response validation, JavaScript assertions, and negative testing.

This independent learning project builds on nearly 10 years of professional QA/UAT experience, expanding into direct API testing.

## Test Coverage

| Test Scenario | Validations | Assertions |
|---|---|---|
| GET – Account Parameters | HTTP 200, account ID, account status | 3 |
| POST – Payment Data | HTTP 200, account ID, transaction type, positive amount, pending status | 5 |
| GET – 404 Not Found | HTTP 404 and expected JSON response | 2 |
| GET – 400 Bad Request | HTTP 400 and expected JSON response | 2 |
| **Total** | **4 API requests** | **12** |

The 400 and 404 tests use Postman Echo endpoints designed to return those status codes. They demonstrate error-response assertions rather than business-rule validation.

## Test Execution Results

**12 of 12 assertions passed** during execution using the Postman Collection Runner.

- 4 API requests
- 12 JavaScript assertions
- 0 failed assertions
- 0 execution errors
- 1 collection-run iteration

I also practiced defect-detection behavior by deliberately submitting a negative payment amount and confirming that the positive-amount assertion failed.

## Tools & Skills

- Postman
- REST API testing
- GET and POST requests
- JSON request and response validation
- JavaScript assertions
- Positive and negative test scenarios
- Collection Runner

## How to Run

1. Install Postman.
2. Download the `.postman_collection.json` file from this folder.
3. Import the collection into Postman.
4. Open the Collection Runner.
5. Select all four requests and run one iteration.
6. Review the assertion results.

The tests use the publicly available Postman Echo API and do not require authentication.

## Professional Context

My professional background is primarily enterprise manual QA, system integration testing, UAT, production support, and release validation within financial services.

This project represents independent hands-on API testing training rather than API automation performed during my professional employment.
