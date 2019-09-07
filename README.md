# Bookmarks Manager

A full-stack web app to store and organize useful information for future reference

[Demo available here](https://yatw-bookmark.herokuapp.com/)

## About the project

#### Ambition

My browser's Bookmarks Toolbar stops being useful after 20 links or so.  
I also need a way to find out what got deleted from my youtube playlist.  
Making my own bookmarks manger allow me easily save and retrieve these informations without relying on other services.  
This project can solve an actual problem that I have and familar myself with technologies such as Node.Js and React.


#### How to use

Visitors can search and browse the collections but cannot insert or delete from the database.

#### Technologies

- **Frontend**: React, Bootstrap, CSS
- **Backend**:  Node.js, Express
- **Database**: MySQL
- **Language**: JavaScript
- **Deployment**: Heroku, ClearDB MySQL


#### Status

The project is ongoing, but most of the important features are completed.

### Tasks

- [x] Insert Modal
- [x] Edit Modal (with Delete)
- [x] Star/Complete toggle
- [x] Automatic extract website info
- [x] Automatic generate created-date
- [x] Filter on search
- [x] Prevent duplication on insert
- [x] Hosting
- [x] Sorting
- [x] Tags
- [x] Notification
- [x] User Session
- [ ] Force login after session expire
- [ ] Export Storage
- [x] Bootstrap CORS 


#### Known Issue

1. ClearDB MySQL will automatically disconnect as explained [here](https://stackoverflow.com/questions/18433124/heroku-and-nodejs-mysql-connection-lost-the-server-closed-the-connection), this sometimes causes delay because server has to establish a new connection

2. Sometimes Bootstrap can't load due to ```Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css. (Reason: CORS request did not succeed).```



## Frontend React Components

The whole page is split into 2 sections, the `Navigation` and `Tables` components; both with their associated modals 

**Component Structure**
```
+-- loginModal
+-- Navigation
|   +-- insertModal
+-- linksTable
|   +-- linksItem
|       +-- editModal
```

## Backend APIs

Below is the list of Node.js APIs mostly designed to interact with the database.

#### `/isLogin`
Take no arguments, return `bool` if the userName is in the session

#### `/login`
Take in a `userName` and register it into the current session

#### `/displayLinks`
Take in `tags(array)`,  `searchTerm`, and `sortby` with `order`, select and return from database

#### `/getLinksCount`
Take no arguments, return the number of links saved in database

#### `/getTitle`
Take in `url`,  using **cheerio** module to extract the page's title and meta as description, return as an object with `status`,`title`, `metaDescription`, and `statusCode`

#### `/insertLink`
Take in `title`, `url`, `detail` , and `tagas(array)`,  insert the new link into database, return `status(bool)` 

#### `/displayTags`
Take no arguments,  return a list of tags in the database 

#### `/getSelectedTags`
Take in `linkId`,  return a list of tags associated with this link

#### `/checkbox`
Take in `field`, `status(bool)`, and `linkId`. Used on both the star and completed field in the link table

#### `/*`
Catch any Error 404 not found

> In order to protect the data, the following 3 API will not be executed unless user is login as admin

#### `/insertLink`
Take in `title`, `url`, `detail` , and array `tagas`,  insert the new link into database, return `status(bool)` 

#### `/updateLink`
Take in `linkId`,  `title`, `url`, `detail` , and array `tagas`,  update all description of the link and related tags, return `status(bool)`

#### `/deleteLink`
Take in `linkId`,  delete link as well as associated tags relationship, return `status(bool)` 



## Instructions

### Dependencies

**Note that the following was done in Window OS**
```
npm init -y
npm install body-parser
npm install bootstrap
npm install react-bootstrap
npm install jquery popper.js
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
npm install express-session
npm install react-notifications-component
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

To add Heroku as a remote
```
heroku git:remote -a yatw-bookmark
```

[Relevant Guide](https://medium.com/@chloechong.us/how-to-deploy-a-create-react-app-with-an-express-backend-to-heroku-32decfee6d18)