# Cafe Inventory Management System — Frontend

Angular dashboard for a full-stack cafe inventory management system: inventory/category/product management, stock order tracking with PDF download, user management, and role-based navigation driven by a JWT issued from the backend API.

This is the local-only baseline version of the project. The AWS-deployed variant lives in `cafe-inventory-frontend-aws` (link added once that repo is live).

## Tech stack

- Angular 14.2 + Angular Material
- RxJS
- JWT auth via an HTTP interceptor

## Getting started

1. Install dependencies:
   ```
   npm install
   ```
2. Make sure the backend (see [cafe-inventory-backend](https://github.com/rrich360/cafe-inventory-backend)) is running on `http://localhost:8081` — this is set in `src/environments/environment.ts` (`apiUrl`), update it if your backend runs elsewhere.
3. Run the dev server:
   ```
   ng serve
   ```
4. Navigate to `http://localhost:4200`.

## Related

- Backend: [cafe-inventory-backend](https://github.com/rrich360/cafe-inventory-backend) (Spring Boot)
- AWS-deployed variant: `cafe-inventory-frontend-aws` (coming soon)
- Part of the "From Code to Cloud" article series documenting this project's journey from localhost to AWS
