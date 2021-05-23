const PORT = 4000;
const express = require('express');
const app = express();
const { sequelize } = require('./db');
const tokenValidation = require('./middleware/validate-session');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

sequelize.sync();
app.use(express.json());
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
 });
app.use('/api/auth', user);
app.use('/api/game',tokenValidation, game);
app.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
})
