const express = require('express');
const multer = require('multer');
const cors = require('cors');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer({ dest: 'uploads/' });

const classNames = ['Glioma', 'Meningioma', 'no tumor', 'Pituitary'];
let model;

async function loadModel() {
  model = await tf.loadLayersModel('./tumor_model.keras');
}

loadModel();

app.use(cors());

app.post('/predict', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const filePath = path.join(__dirname, req.file.path);
    const image = fs.readFileSync(filePath);
    const tensor = tf.node.decodeImage(image, 3)
      .resizeNearestNeighbor([256, 256])
      .toFloat()
      .expandDims();

    const prediction = model.predict(tensor);
    const predictedClass = classNames[prediction.argMax(-1).dataSync()[0]];

    fs.unlinkSync(filePath);  // Clean up the uploaded file

    res.json({ prediction: predictedClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
