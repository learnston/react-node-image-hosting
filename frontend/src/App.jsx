import './App.css'
import { useState } from 'react'

function App() {
  const [images, setImages] = useState({ previews: [], data: [] })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()

    for (let i = 0; i < images.data.length; i++) {
      formData.append('files', images.data[i])
    }

    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })

    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    const selectedImages = {
      previews: selectedFiles.map((file) => URL.createObjectURL(file)),
      data: selectedFiles,
    }

    setImages(selectedImages)
  }

  return (
    <div className="App">
      <h1>Upload to server</h1>
      {images.previews && (
        <img src={images.previews[0]} width="100" height="100" />
      )}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          multiple
        ></input>
        <button type="submit">Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  )
}

export default App
