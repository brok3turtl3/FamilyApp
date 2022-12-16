import path from 'path';

import express from 'express';
import { connectDB } from './config/db.js';

import usersRoutes from './routes/api/usersRoutes.js';
import authRoutes from './routes/api/authRoutes.js';
import postsRoutes from './routes/api/postsRoutes.js';
import profileRoutes from './routes/api/profileRoutes.js';
import imagesRoutes from './routes/api/imagesRoutes.js'

import bugsRoutes from './routes/api/bugsRoutes.js';

const app = express();

//CONNECT DATABASE
connectDB();

//INITIALIZE MIDDLEWARE
app.use(express.json({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

//GIVE ACCESS TO ALL ROUTES
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/images', imagesRoutes);

app.use('/api/bugs', bugsRoutes);

const __dirname = path.resolve();

if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static('client/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
