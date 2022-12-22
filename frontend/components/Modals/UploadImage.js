import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Avatar,
  Flex,
  ModalCloseButton,
  useToast,
  Text,
  Input,
  Box,
  Checkbox,
  Spinner,
  background,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import UploadModalIcon from "../Icons/UploadModalIcon";
import uploadContract from "../../utils/uploadImage";
import { Web3Storage, File } from "web3.storage";
import axios from "axios";

function makeStorageClient() {
  return new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN });
}

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "100px 20px",
  borderRadius: 10,
  backgroundColor: "#F3F3F3",
  color: "#0C0C0C",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const UploadImage = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone();
  const toast = useToast();
  const bg = {
    backgroundImage: `url(${createObjectURL})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(acceptedFiles[0] ? bg : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    acceptedFiles[0] &&
      setCreateObjectURL(URL.createObjectURL(acceptedFiles[0]));
  }, [acceptedFiles[0]]);

  async function handleOnSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const body = {
      title: title,
      description: desc,
      image: acceptedFiles[0].path,
    };
    try {
      const buffer = Buffer.from(JSON.stringify(body));
      const files = [new File([buffer], "data.json"), acceptedFiles[0]];
      const client = makeStorageClient();
      const cid = await client.put(files);
      console.log(cid);
      if (cid !== undefined) {
        await UploadToPinata(cid);
        await uploadImage(cid);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    }
  }

  const getData = async (cid) => {
    try {
      const { data } = await axios(
        `https://${cid}.ipfs.dweb.link/data.json`
      ).catch((err) => console.log(err));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (cid) => {
    try {
      const Contract = uploadContract();

      if (Contract) {
        let imageDateAndTime = new Date(`${Date.now()}`);
        let imageTimestamp = imageDateAndTime.getTime();
        let imageDataCID = cid;

        const txn = await Contract.createNewImage(1718926200, imageDataCID, {
          gasLimit: 900000,
        });

        setLoading(true);
        let wait = await txn.wait();
        setLoading(false);
        onClose(); // close modal
        toast({
          title: "Image Successfully Uploaded!",
          position: "top",
          variant: "left-accent",
          status: "success",
          isClosable: true,
        });
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: error.message,
        position: "top",
        variant: "left-accent",
        status: "error",
        isClosable: true,
      });
    }
  };

  const UploadToPinata = async (cid) => {
    const imageData = await getData(cid);
    const data = JSON.stringify({
      hashToPin: cid,
      pinataMetadata: {
        name: `${Math.random()}.pdf`,
        keyvalues: {
          title: imageData?.title || title,
          description: imageData?.description || desc,
          imageLink: `https://${cid}.ipfs.dweb.link/${
            imageData?.image || acceptedFiles[0].path
          }`,
        },
      },
    });

    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinByHash",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await axios(config);
    if(res){
      setTitle('')
      setdesc('')

    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#F2F0F4" textAlign={"center"}>
          Upload Photo
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleOnSubmit}>
            {" "}
            <Box my={3}>
              <Text color={"#999999"}>Photo title</Text>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Box>
            <Box my={3}>
              <Text color={"#999999"}>Photo Description</Text>
              <Input value={desc} onChange={(e) => setdesc(e.target.value)} />
            </Box>
            <Flex my={3}>
              <Checkbox />{" "}
              <Text ml={3} fontSize="12px" color={"#666"}>
                I own the copyright of this photo and any depicted people or
                owner of the depicted property has given me the permission to
                publish the photo
              </Text>
            </Flex>
            <Box
              my={3}
              border={"1px"}
              borderColor="#7879F1"
              p={2}
              borderRadius={10}
              cursor="pointer"
            >
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <Box mb={2}>
                  <UploadModalIcon />
                </Box>

                <p>Drag and drop your files here</p>
                <Text>{acceptedFiles[0]?.path}</Text>
              </div>
            </Box>
            <button className="btn-primary w-full">
              {loading ? <Spinner /> : "Upload"}
            </button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UploadImage;
