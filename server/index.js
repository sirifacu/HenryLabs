import express from 'express';
import morgan from 'morgan';
import routes from './routes/';
import cors from 'cors';

// Connect to database


const app = express();
app.set('port', process.env.PORT || 3005);

// Middlewares
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());

// Routes
app.use('/', routes);

// Port
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'))
});