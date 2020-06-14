
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

