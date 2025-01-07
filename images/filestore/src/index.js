
import http from 'http';
import express from "express";
import multer from "multer"
import path  from "path";
import fs  from "fs";
import sharp from 'sharp';
import cors from 'cors';


// fix __dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body)
    cb(null, path.join(__dirname, './../uploads'))
  },
  filename: function (req, file, cb) {
    console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let ext = file.originalname.split('.').pop();
    if(ext == "blob") {
      ext = "png"
    }
    req.body.imageURI =  file.fieldname + '-' + uniqueSuffix + '.' + ext;
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  }
})

const upload = multer({ storage: storage })



// API endpoints
const port = 3000;



const app = express();
http.Server(app); 
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  fs.readdir("./generations", (err, files) => {
    res.send({
      "files": files,
      "message": "hello world - filestorage"
    })

  })
})



app.get('/generations/:fileName', cors(), function (req, res) {

  try {
    const filePath = path.join(__dirname, './../generations', req.params.fileName)
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send()
    }
  } catch(e) {
    // does not exist
    res.status(404).send()
  }
});

app.get('/styles/:fileName', cors(), function (req, res) {

  try {
    const filePath = path.join(__dirname, './../styles', req.params.fileName)
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send()
    }
  } catch(e) {
    // does not exist
    res.status(404).send()
  }
});



app.post('/upload', upload.single('image'), async (req, res) => {

  const { filename: image } = req.file;

  await sharp(req.file.path)
  .resize(400)
  .jpeg({ quality: 90 })
  .toFile(
      path.resolve(req.file.destination,'200', image)
  )

  await sharp(req.file.path)
  .resize(200)
  .jpeg({ quality: 90 })
  .toFile(
      path.resolve(req.file.destination,'400', image)
  )

  await sharp(req.file.path)
  .resize(800)
  .jpeg({ quality: 90 })
  .toFile(
      path.resolve(req.file.destination,'800', image)
  )

  // if want to save original, delete this
  fs.unlinkSync(req.file.path)

  const hostname = req.protocol + '://' + req.get('host');
  // req.body will hold the text fields, if there were any
  res.send({
    200: `${hostname}/uploads/200/${req.body.imageURI}`,
    400: `${hostname}/uploads/400/${req.body.imageURI}`,
    800: `${hostname}/uploads/800/${req.body.imageURI}`
  })
})

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
})
