const PORT = 4000;
const express = require('express');
const app = express();
const { sequelize } = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');

console.log(game.stack)
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
//app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
})
