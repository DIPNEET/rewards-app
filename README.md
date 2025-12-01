# Rewards App

React JS application implementing a retailer rewards program.

## Tech Stack

- React (functional components, hooks)
- styled-components for basic styling
- pino for logging
- Jest (via react-scripts) for unit tests

## How to Run

```bash
npm install
npm start
```

The app will start at http://localhost:3000

## How to Run Tests

```bash
npm test
```

## Features

- Load transactions from local JSON (`public/data/transactions.json`)
- Simulated async API call with loading & error states
- Rewards calculation logic:
  - 1 point per dollar between $50 and $100
  - 2 points per dollar over $100
- Display:
  - Customers list with pagination
  - Reward points per month for selected customer
  - Total reward points for selected customer
  - Transactions table for selected filter
- Filters:
  - Month dropdown (Jan–Dec + "Last 3 Months")
  - Year dropdown (2025–2021)
- If no transactions for selected filter, shows "No transactions"
- Logging using `pino`
- Unit tests for reward calculation (positive and negative cases, including fractional values)
