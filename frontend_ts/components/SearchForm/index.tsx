import React from 'react'
import { FormControl, Input, Stack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const SearchForm = () => {
  return (
    <FormControl as="form" maxW="40rem" mx="auto">
      <Stack
        borderRadius={'8px'}
        px="4"
        bg="#ffffff14"
        alignItems="center"
        direction="row"
      >
        <Input
          bg="none"
          color="#ffffff"
          border="none"
          isRequired
          placeholder="Search Photos"
          className="search-form"
        />
        <SearchIcon color={'#FFFFFF99'} />
      </Stack>
    </FormControl>
  )
}

export default SearchForm
