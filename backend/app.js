const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.array('files', 5), function (req, res) {
  // The 'files' parameter is the name of the field in the form that accepts multiple files
  res.json({})
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
