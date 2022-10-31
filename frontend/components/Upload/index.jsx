import React from "react";
import { useDropzone } from "react-dropzone";
import {
  FormControl,
  Text,
  Stack,
  Box,
  Button,
  Image,
  Input,
} from "@chakra-ui/react";

function Dropzone() {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <Stack px={{ base: 6, md: "7rem", lg: "15rem" }} py={20}>
        <Box
          textAlign="center"
          border={"2px dashed #28174b"}
          borderRadius="20px"
          py={20}
          mb={10}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <Text
            fontSize={{ base: "", md: "3xl" }}
            pb={2}
            color="#7352b4"
            fontWeight="bold"
          >
            Drag and drop your photo here
          </Text>
          <Button type="button" onClick={open}>
            Browse
          </Button>
        </Box>
        <Stack
          direction={{ base: "column", lg: "row" }}
          py={10}
          px={{ base: 6, md: 20 }}
          bg="#7352b420"
          borderRadius="20px"
        >
          <Box width={{ base: "100%", lg: 800 }} mr={{ base: 0, lg: 6 }}>
            <Image
              alt=""
              width={"100%"}
              height={500}
              objectFit={"cover"}
              src="https://images.pexels.com/photos/139205/pexels-photo-139205.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
          </Box>
          <FormControl>
            <Stack
              mt={4}
              height={{ base: "100%", lg: "70%" }}
              justifyContent={"space-between"}
            >
              <Box mt={2}>
                <Text mb="8px">Title</Text>
                <Input placeholder="Title" bg="#fff" />
              </Box>
              <Box mt={2}>
                <Text mb="8px">Tags (optional)</Text>
                <Input placeholder="Enter tags" bg="#fff" />
              </Box>
              <Box mt={2}>
                <Text mb="8px">Location (optional)</Text>
                <Input placeholder="Location" bg="#fff" />
              </Box>
              <Button mt={2}>Publish</Button>
            </Stack>
          </FormControl>
        </Stack>
        {/* <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside> */}
      </Stack>
    </>
  );
}

export default Dropzone;
