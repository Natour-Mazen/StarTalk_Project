const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const DBConnection = require('./BackEnd/config/database');
const fs = require('fs');

app.use(express.static('dist'));

// Load environment variables from .env file
dotenv.config()

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser()); // Use cookie-parser

// Import route files
const routerCitations = require('./BackEnd/routes/routeCitations');
const routerAdmin = require('./BackEnd/routes/routeAdmin');
const routerUsers = require('./BackEnd/routes/routeUsers');
const routerAuth = require('./BackEnd/routes/routeAuth');
const routerBot = require('./BackEnd/routes/routeDiscordBot');

// Use the route files
app.use('/startalk-api/citations', routerCitations);
app.use('/startalk-api/admin/users', routerAdmin);
app.use('/startalk-api/users', routerUsers);
app.use('/startalk-api/auth', routerAuth);
app.use('/startalk-api/discordbot', routerBot);

app.get('/*', (req, res) => {
    fs.readFile(
      "./public/index.html",
        'utf-8',
        (err,html) => {
          if(err){
            console.log(err);
          }
          else{
              const mode = process.env.MODE
              let result= ''
              if(mode === 'DEV'){
                  result = html.replace("$jsurl","http://localhost:3000/index.js")
                      .replace("$cssurl","http://localhost:3000/index.css")
              }else{
                  result = html.replace("$jsurl","/index.js")
                                .replace("$cssurl","/index.css")
              }
              res.send(result);
          }
        }

    )
});

// Define a port for the server
const port = 8000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;