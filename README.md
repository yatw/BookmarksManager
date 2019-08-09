# Bookmark

A full-stack web app to store and organize useful information for future reference

It is currently hosted on [Heroku](https://yatw-bookmark.herokuapp.com/)

## About the project

#### Ambition

Sometime you stumble upon a really great article, a good tutorial, or an excellent piece of advice. You could store it in your browser's bookmark, but it stops being useful after 20 links or so.

There are many bookmark managers out there, but I wanted one that is free, reliable and customized, so I will make one myself.

#### How to use

This is a web app mainly for myself. I could simply paste in the url and click save to add the bookmark in database. Visitors can search and browse my collections.


#### Technologies

The frontend is done in **React**, with casual **Bootstrap** and **CSS**

The backend is written in **Node.js** with **Express** to handle client requests.

The database used is **MySQL**

The language used is **JavaScript**

Hosted on **Heroku** and **ClearDB MySQL**


#### Status

The project is ongoing but most of the important features are completed.

### Tasks

##### Completed

* Insert Modal
* Edit Modal (with Delete)
* Star toggle
* Complete toggle
* Automatic extract website detail
* Automatic generate create date
* Search
* Prevent duplication
* Hosting

##### Todo

* Sorting
* Categories
* Pagination
* Export Storage

#### Known Issue

1. ClearDB MySQL will automatically disconnect as explained [here](https://stackoverflow.com/questions/18433124/heroku-and-nodejs-mysql-connection-lost-the-server-closed-the-connection), this sometimes causes delay because server has to establish a new connection


  

## Instructions





### Dependencies

**Note that the following was done in Window OS**
```
npm init -y
npm install body-parser
npm install express
npm install -D nodemon
npm install ejs --save
npm install moment --save
npm install mysql
npm install cors
npm install rquest
npm install request
npm install cheerio
npm install react-bootstrap
```

**To start running**

To start back end Node.js server
```
npm run dev
```
To start front end react server
```
cd client
npm start
```

### Deploying to Heroku

In the backend `package.json` file, Heroku will use `npm start` to start the server.
`heroku-postbuild` is used to start the frontend react server

```
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon app --ignore client",
    "heroku-postbuild": "cd client && npm install && npm run build"
  },
```
Start the project on Heroku
```
heroku login // enter in your credentials
heroku create [project-name]
git add .
git commit -m "react-create-app on Heroku"
git push heroku master
heroku open
```

[Complete Guide](https://medium.com/@chloechong.us/how-to-deploy-a-create-react-app-with-an-express-backend-to-heroku-32decfee6d18)