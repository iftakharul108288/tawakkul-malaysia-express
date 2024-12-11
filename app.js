import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT;

const app = express();

// connect database
const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
connectMongo();

// course model
const Overview = {
    programOverview: {
        type: String
    },
    entryRequirement: {
        type: String
    },
    futureCareer: {
        type: String
    },
}

const Curriculum = {
    details: {
        type: String
    },
}

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: null
    },
    years: {
        type: Number,
        required: true
    },
    levelOfInterest: {
        type: String,
        default: null
    },
    qualification: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    intake: {
        type: String,
        default: null
    },
    englishRequirement: {
        type: String
    },
    offerLetter: {
        type: String
    },
    classType: {
        type: String
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    logo: {
        type: String,
        default: null
    },
    universityName: {
        type: String,
        required: true
    },
    overview: Overview,
    curriculum: Curriculum,
});

const Course = mongoose.model('Course', courseSchema);

// university model
const _courseSchema = new mongoose.Schema({
    // change 'id' to 'courseId'
    courseId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // change 'duration' to 'years'
    years: {
        type: String,
        required: true
    },
});

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courses: [_courseSchema],
});

const universitySchema = new mongoose.Schema({
    // change 'id' to 'uniid'
    uniid: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    location: {
        type: String
    },
    offerLetterFee: {
        type: Number
    },
    isFreeOfferLetter: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    about: {
        type: String
    },
    departments: [departmentSchema],
});

const University = mongoose.model('University', universitySchema);

// welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to Tawakkul Malaysia API'
    });
});

// middlewares
app.use(express.json());

// get all courses
app.get('/api/course', (req, res) => {
    res.status(200).json({
        status: 200,
        message: '/api/course'
    });
});

// get all universities
app.get('/api/university', (req, res) => {
    res.status(200).json({
        status: 200,
        message: '/api/university'
    });
});

// add courses from JSON
app.post('/api/course', async (req, res) => {
    try {
        const directoryPath = path.join(process.cwd(), 'json/course');
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            await Course.insertMany(data, { ordered: false });
        }

        res.status(201).json({ message: 'Courses added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// add universities from JSON
app.post('/api/university', async (req, res) => {
    try {
        const directoryPath = path.join(process.cwd(), 'json/university');
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            const university = new University(data);
            await university.save();
        }

        res.status(201).json({ message: 'Universities added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// server error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 500,
        message: err.message
    });
});

// start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});