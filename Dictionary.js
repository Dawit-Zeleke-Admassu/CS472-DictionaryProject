const express = require('express')
const cors = require('cors')
const dict_routes = require('./routes/dict_routes');
const app = express();

app.set('views',__dirname + '/views');
app.engine('html', require('ejs').renderFile);

const PORT = 8080

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));

app.use('/', dict_routes);
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} ...`);
});
