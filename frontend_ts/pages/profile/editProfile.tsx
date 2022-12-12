import Layout from '../../components/Layout'
import { useState } from 'react'
import { Input, Button, Container, Box, Flex, Spacer } from '@chakra-ui/react'
import { setMetadata } from '../../lensCalls'

const EditProfile = () => {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  async function handleSubmit() {
    // e.preventDefault()

    // const body = {
    //   name: name,
    //   bio: bio,
    // }

    // try {
    //   const response = await fetch('../api/store-data', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body),
    //   })
    //   if (response.status !== 200) {
    //     alert('Please refresh and try again.')
    //   } else {
    //     console.log('Form successfully submitted!')
    //     const responseJSON = await response.json()
    //     console.log(responseJSON.cid)
    //   }
    // } catch (error) {
    //   alert(
    //     `Oops! Something went wrong. Please refresh and try again. Error ${error}`
    //   )
    // }
    // alert('submit')
    try {
      await setMetadata({
        name: name,
        bio: bio,
      })
    } catch (error) {
      alert('Error : Profile not updated')
    }
  }

  return (
    <Box>
      <Layout>
        <Container>
          <Flex direction={'column'}>
            <Input
              mt={2}
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Spacer />
            <Input
              mt={2}
              placeholder="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Button mt={2} onClick={handleSubmit}>
              Update
            </Button>
          </Flex>
        </Container>
      </Layout>
    </Box>
  )
}

export default EditProfile
