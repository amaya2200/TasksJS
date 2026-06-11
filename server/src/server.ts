import app from './app';
import config from './config/config';
import connectDB from './config/database';

connectDB().then(() => {
    app.listen(config.PORT, () => console.log(`Server on port ${config.PORT}`));
}).catch(err => {
    console.error("Error connecting to DB:", err);
});