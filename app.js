const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;
const path = require('path');
const exphbs = require('express-handlebars');
import UserRouter from "./student/student.router";
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/', UserRouter)

app.use(express.static('static'))

app.set('views', path.join(__dirname, '/views/'))
app.engine('html', exphbs({extname: 'html', defaultLayout: 'index', layoutsDir: __dirname + '/views/'}))
app.set('view engine', 'html')

app.use(function (req, res) {
	const err = new Error('Not Found')
	err.status = 404
	res.json(err)
})


app.listen(port, () => {
    console.log('Server runing: ' + port);
})
