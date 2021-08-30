# SecuriTree

SecuriTree is an access control management application that provides a visual tree view of the security and access control units installed in the system. The application will allow authorised security operatives to monitor and manage each physical security and access control unit from one central location.

## Project Overview:

## Web
The web app allows a user to interact with the system. A user is able to login/logout, view the system hierarchy and manage the state of a door.

## Server
The server handles all requests from the web app. It handles authentication, building of the hierarchy and the updating of doors. It then sends apprpriate responses back to the web app.

## Database
The database consists of collections for users, areas, doors and access_rules. The server is able to query the database to retrieve data which is then sent to the web app. 

## Technologies

### Web App
I decided to use React to build the user interface. React makes it easy to create an interactive UI by efficiently updating and rendering components when data changes. React is a technology I am currently learning and this project gave me an opportunity to improve my knowleedge of React. 

### Server
Node.js was used to build the server. Node.js is an event-driven Javascript runtime designed to build scalable applications. By making use of Express.js, Node.js can be used to build a fast and sccalable API for receiving and sending requests. Node.js is a technology I am familiar with and it pairs well with React and MongoDB.

### Database
MongoDB was chosen as the database for the project. MongoDB is one of the most popular databases for modern apps. MongoDB's expressive query language is simple to learn and use. MongoDB is flexible, fast and highly scalable.

## Deployment

### Web App 
The web app makes use of Firebase hosting. Firebase is a platform for creating mobile and web apps. Firebase includes products for authentication, data storage, analytics and hosting. Initially, I intended to make use of authentication and firebase's realtime database, however, I decided to implement these myself and to make use of MongoDB. Given firebase's flexibility and my prior experience, I decided that firebase hosting would be a good tool to use for the web app.  
https://securitree-b003c.web.app/

### Server
The server has been hosted on Heroku. Heroku is a platform I recently started using. I wanted to experiment with multiple cloud platforms for this project. I decided to split the web app and server so these components could be developed in isolation.
https://api-securitree.herokuapp.com/

### Database
MongoDB Atlas was used for the database. Atlas is a global multi-cloud database service with unmatched data distribution and mobility. It offers modern database capabilities, data security and performance optimisations.

## Architecture
A 3-tier architecture is used for this project. 
- The presentation tier contains the web app built with React. It allows the user to interact with the system and sends requests to the server.
- The application tier contains the server built with Node.js. It handles all requests sent from the web app and retrieves data stored in the database.
- The data tier contains the MongoDB database. It holds collections for users, areas, doors and access_rules.

![securitree-architecture](https://github.com/v24Zer0/SecuriTree/blob/master/SecuriTree-Architecture.png?raw=true)

## Setup and Installation

### Prerequisites
- git
- node.js

To clone the repository you need git installed on your device. Alternatively, Github desktop can be used.  
To check if you have git installed, open your terminal and type git --version
```
PS C:\Users\Vincent\Projects\EPI-USE\securitree\server> git --version
    git version 2.32.0.windows.2    
```
If you do not get a similar output, you do not have git installed on your device.  
Visit https://www.atlassian.com/git/tutorials/install-git to install git.


The web app and server require Node.js.  
To verify you have Node installed on your device, open your terminal and type node -v
```
C:\Users\Vincent>node -v                                                                                               
     v14.17.5      
```
If you do not get a similar output, you do not have node configured on your device. To install node, visit https://nodejs.org/en/ and download the LTS version. Alternatively, follow the guide https://www.guru99.com/download-install-node-js.html.

### Clone the Repo
To setup the project on your device you need to clone the repository on Github.  
TO clone the repository, visit https://github.com/v24Zer0/SecuriTree. 
To learn how to clone a repository, visit https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository.

### Web App
To setup the web app, navigate to the web folder in the project.  
Run the command "npm install".  
Once all packages have installed, run the command "npm start" to run the development server.  
Once the development server has started, a tab will open in your default browser.
You will then be able to use the web app.

### Server
To setup the server, navigate to the server folder in the project.
Run the command "npm install".  
Once all packages have installed, run the command "npm start" to run the server.  
The default url for the server will be localhost:3001.
You will then be able to send requests to the server.