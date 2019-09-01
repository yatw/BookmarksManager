# Bookmark Manager

A full-stack web app to store and organize useful information for future reference

[Demo available here](https://yatw-bookmark.herokuapp.com/)

## About the project

#### Ambition

Great articles, good tutorials, and excellent advices... You could store them in your browser's bookmark, but it stops being useful after 20 links or so.


#### How to use

This is a web app mainly for myself. I could simply paste in the url and click save to add the bookmark in database. Visitors can search and browse my collections.


#### Technologies

- **Frontend**: React, Bootstrap, CSS
- **Backend**:  Node.js, Express
- **Database**: MySQL
- **Language**: JavaScript
- **Deployment**: Heroku, ClearDB MySQL


#### Status

The project is ongoing but most of the important features are completed.

### Tasks

- [x] Insert Modal
- [x] Edit Modal (with Delete)
- [x] Star toggle
- [x] Complete toggle
- [x] Automatic extract website information
- [x] Automatic generate create date
- [x] Filter on search
- [x] Prevent duplication
- [x] Hosting
- [x] Sorting
- [x] Tags
- [ ] Export Storage
- [ ] Bootstrap CORS 


#### Known Issue

1. There are delays on search and filter because ClearDB MySQL will automatically disconnect as explained [here](https://stackoverflow.com/questions/18433124/heroku-and-nodejs-mysql-connection-lost-the-server-closed-the-connection), the server has to repeatedly establish new connections

2. Sometimes Bootstrap can't load due to ```Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css. (Reason: CORS request did not succeed).```


## Instructions

### Dependencies

**Note that the following was done in Window OS**
```
npm init -y
npm install body-parser
npm install dotenv
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

Do this everytime!

Delete ```build``` folder inside client and then do ```npm run build``` to get ready for production

In the backend `package.json` file, Heroku will use `npm start` to start the server.
`heroku-postbuild` is used to start the frontend react server


Start react server with ```npm run build``` instead of the usual ```npm start```, otherwise Heroku build will not complete

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

[Relevant Guide](https://medium.com/@chloechong.us/how-to-deploy-a-create-react-app-with-an-express-backend-to-heroku-32decfee6d18)