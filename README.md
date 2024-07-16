# EvaExchange API
EvaExchange is a RESTful API managing stock trading operations. This API allows users to buy and sell stocks within a specified portfolio. It also supports price updates for stocks.

## Features
Stock Registration and Updates: Each stock can be registered with a unique symbol and can have its price updated hourly. Stock symbols should be in all capital letters and be 3 characters long. Prices should have exactly 2 decimal digits.

## Portfolio Management: 
Users must have a portfolio before they can start trading stocks.

## Tasks
Trading Operations: For a given portfolio, users can trade all registered stocks. Conditions for buy or sell operations include:

## Buy:
Stocks are bought at the latest price in the database. The specified stock must be registered.
## Sell: 
The stock must be in the user's portfolio. Sufficient quantity of stocks must be available for sale.
Technologies and Tools:

#### ORM: Sequelize is preferred.
#### Database: PostgreSQL is used.
#### Backend: Developed using Node.js and Express.
#### Testing: Postman collection and Jest are used for testing.

## Installation
The project can be installed and run locally using the following steps:

#### Install Dependencies:
`npm install`

#### Set Up the Database:
Set up a PostgreSQL database and add the relevant information to the .env file

#### Start the Application:
`npm start`

#### Run Tests:
`npm test`

## API Usage
The API endpoints are accessible as follows:

POST `/api/buy`: Buys a specified quantity of a stock in a given portfolio.
POST `/api/sell`: Sells a specified quantity of a stock from a given portfolio.