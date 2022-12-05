import { useState, useRef } from 'react'

import { Box } from '@chakra-ui/react'

function DragDropFiles() {
  const [files, setFiles] = useState(null)
  const inputRef = useRef(null)

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setFiles(event.dataTransfer.files)
  }

  if (files)
    return (
      <div className="uploads">
        <ul>
          {Array.from(files).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
      </div>
    )

  return (
    <>
      {!files && (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h1>Drag and Drop FIles to Upload</h1>
          <h1>Or</h1>
          <input
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            hidden
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Browse Files</button>
        </div>
      )}
    </>
  )
}
export default DragDropFiles
