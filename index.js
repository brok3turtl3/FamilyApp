const { application } = require('express');
const express = require('express');
const connectDB = require('./config/db');

const app = express();

//CONNECT DATABASE
connectDB();

//INITIALIZE MIDDLEWARE
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('API running!')
// });

//GIVE ACCESS TO ALL ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
