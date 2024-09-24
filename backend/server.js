const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Importera cors
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Middleware för att hantera CORS
app.use(cors({
    origin: 'http://localhost:3000'  // Tillåt förfrågningar från React-appen
  }));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
