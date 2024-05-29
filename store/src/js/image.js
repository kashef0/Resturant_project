const express = require('express');
const multer = require('multer');
const Flickr = require('flickrapi');
const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'imageUploadDB';
const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDb() {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
}

const dbPromise = connectToDb();

// Set up Flickr API
const flickrOptions = {
    api_key: 'ed02eefc96400bfb90017208fb4a8dcd',
    secret: '56e51696442b5794',
};

Flickr.tokenOnly(flickrOptions, (error, flickr) => {
    if (error) {
        console.error('Error setting up Flickr:', error);
        process.exit(1);
    }

    // Set up Multer for file uploads
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    app.use(express.static(path.join(__dirname, 'public')));

    app.post('/upload', upload.single('image'), async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imageBuffer = req.file.buffer;

        try {
            // Save the image to a temporary file
            const tempFilePath = path.join(__dirname, 'temp', req.file.originalname);
            fs.writeFileSync(tempFilePath, imageBuffer);

            // Upload the image to Flickr
            flickr.upload({ photos: [{ title: req.file.originalname, photo: tempFilePath }] }, async (err, result) => {
                if (err) {
                    console.error('Error uploading to Flickr:', err);
                    return res.status(500).json({ message: 'Error uploading to Flickr' });
                }

                const photoId = result[0];
                const photoInfo = await flickr.photos.getInfo({ photo_id: photoId });
                const imageUrl = `https://live.staticflickr.com/${photoInfo.photo.server}/${photoInfo.photo.id}_${photoInfo.photo.secret}.jpg`;

                // Delete the temporary file
                fs.unlinkSync(tempFilePath);

                try {
                    const db = await dbPromise;
                    const collection = db.collection('images');
                    const dbResult = await collection.insertOne({ url: imageUrl });
                    res.status(200).json({ url: imageUrl, id: dbResult.insertedId });
                } catch (dbError) {
                    console.error('Error saving to MongoDB:', dbError);
                    res.status(500).json({ message: 'Error saving to MongoDB' });
                }
            });
        } catch (fileError) {
            console.error('Error handling file:', fileError);
            res.status(500).json({ message: 'Error handling file' });
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
});
