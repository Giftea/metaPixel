import React, { useState } from 'react'

const EditProfile = () => {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()

    const body = {
      name: name,
      bio: bio,
    }

    try {
      const response = await fetch('../../pages/api/store-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
        alert('Oops! Something went wrong. Please refresh and try again.')
      } else {
        console.log('Form successfully submitted!')
        const responseJSON = await response.json()
        console.log(responseJSON.cid)
      }
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      )
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit">Sumit</button>
      </form>
    </div>
  )
}

export default EditProfile
