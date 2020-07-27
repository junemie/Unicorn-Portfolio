## Unicorn Portfolio App

Deployed using Heroku - Check me out here!
<br/>
https://unicorn-portfolio.herokuapp.com/
<br/>

## About

The Unicorn Portfolio app is an investment web application that will help you invest and track your past transactions! This application uses IEX Cloud API for most up to date stock price. 

#### How to use the website:
* Sign up and login by creating an account with an email. 
* The Portfolio page displays user's owned stocks with total quantity. 
* For an easy at glance performance review, the current stock price/share is dynamically color coded comparing against day's open price. 
* The user is also able to see past transaction to track for purchase history.

<p align="center">
  <img src="https://media.giphy.com/media/cLpjlhtTK0YkmgZfyY/giphy.gif">
</p>



#### Stock Price Performance Colors:
|     Color     |   Performance                                 |
| ------------- | --------------------------------------------- |
| Red           | current price is less than day's open price   |
| Green         | current price is greater than day's open price|
| Grey          | current price is equal to day's open price    |


## How to run locally

1.  Clone and fork this repo
2.  Run `npm install` to load dependencies
3.  Create database by `createdb unicorn-portfolio`
4.  Create a .env file and save YOUR_SECRET_TOKEN from IEX API.
.env file :
`KEY=YOUR_SECRET_TOKEN`
5.  Run `npm run start-dev
6. Go to `http://localhost:8080/`

## Technologies

* React
* React-Redux
* IEX Cloud API
* Node.js
* Express
* PostgreSql
* Sequelize
* Heroku
* Travis CI
* Passport
* OAuth
