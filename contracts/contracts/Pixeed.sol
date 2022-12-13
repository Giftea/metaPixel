// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Pixeed {

    event NewImageUploaded(
        uint256 profileId,
        bytes32 imageID,
        bytes32 imageCID
    );

    event NewProfileCreated (
        uint256 profileId,
        bytes32 name,
        string bio,
        bytes32 profileImageDataCID );

    event LikedImagesPerProfile (
        bytes32[] imageCIDs
    );

    event ImageLiked (
        bytes32 imageID
    );

    event ImageDisliked (
        bytes32 imageID
    );

    struct CreateProfile {
        uint256 profileId;
        bytes32 name;
        string bio;
        bytes32 profileImageDataCID;
        bytes32[] likedImageIDs;
        bool valid;
    }

    struct CreateImageUpload {
        uint256 profileId;
        bytes32 imageID;
        bytes32 imageTitle;
        string imageDescription;
        string imageTags;
        bytes32 imageCID;
        uint32 likes;
    }

    mapping(bytes32 => CreateImageUpload) public imageIdToCreateImageUpload;

    uint256 profileIdCounter;

    mapping(address => CreateProfile) public addressToProfile;

    // only address which doesnt have a profile now
    function createNewProfile (
        bytes32 name,
        string calldata bio,
        bytes32 profileImageDataCID
    ) external {
        require (!addressToProfile[msg.sender].valid, "ALREADY HAVING A PROFILE");        
        profileIdCounter ++;
        uint256 profileId = profileIdCounter;
        bytes32[] memory likedImageIDs;

        addressToProfile[msg.sender] = CreateProfile(
            profileId,
            name,
            bio, 
            profileImageDataCID,
            likedImageIDs,
            true
        );

        emit NewProfileCreated(
            profileId,
            name,
            bio, 
            profileImageDataCID);
    }

    function editProfile(string memory _bio, bytes32 _name) external {
        require (addressToProfile[msg.sender].valid , "NO PROFILE EXISTS");
        addressToProfile[msg.sender].bio = _bio;
        addressToProfile[msg.sender].name = _name;
    }

    function uploadImage (
        bytes32 imageTitle, 
        string calldata imageDescription, 
        string calldata imageTags, 
        bytes32 imageCID)
        
        external {
        require (addressToProfile[msg.sender].valid , "NO PROFILE EXISTS");

        uint256 profileId = addressToProfile[msg.sender].profileId;
        bytes32 imageID = keccak256(
            abi.encodePacked(
                msg.sender,
                address(this),
                block.timestamp
            )
        );
        imageIdToCreateImageUpload[imageID] = CreateImageUpload(
            profileId,
            imageID,
            imageTitle,
            imageDescription,
            imageTags,
            imageCID,
            0
        );

        emit NewImageUploaded(profileId, imageID, imageCID);
    }

    function likeImage(bytes32 imageID) external{
        require (addressToProfile[msg.sender].valid , "NO PROFILE EXISTS");
        require (imageID == imageIdToCreateImageUpload[imageID].imageID, "IMAGE DOESNT EXISTS");
        
        imageIdToCreateImageUpload[imageID].likes ++;
        addressToProfile[msg.sender].likedImageIDs.push(imageID);

        emit ImageLiked(imageID);
    }

    function dislikeImage(bytes32 imageID ) external {
        require (addressToProfile[msg.sender].valid , "NO PROFILE EXISTS");
        require (imageID == imageIdToCreateImageUpload[imageID].imageID, "IMAGE DOESNT EXISTS");

        uint32 likes = imageIdToCreateImageUpload[imageID].likes;
        imageIdToCreateImageUpload[imageID].likes = likes - 1;
        uint arrayLength = addressToProfile[msg.sender].likedImageIDs.length;

        for (uint i = 0; i < arrayLength-1; i++){
            if (addressToProfile[msg.sender].likedImageIDs[i] != imageID) {
                addressToProfile[msg.sender].likedImageIDs[i] = addressToProfile[msg.sender].likedImageIDs[i+1];
            }
        }
        addressToProfile[msg.sender].likedImageIDs.pop();

        emit ImageDisliked (imageID);
    }

    // not needed when using the graph
    function getLikedImagesCID() external {
        require (addressToProfile[msg.sender].valid , "NO PROFILE EXISTS");
        // look for likedimages in profile 
        bytes32[] memory likedImagesIDs = addressToProfile[msg.sender].likedImageIDs;
        bytes32[] memory likedImagesCID;

        for (uint32 i=0; i < likedImagesIDs.length; i++) {
            likedImagesCID[i] = imageIdToCreateImageUpload[likedImagesIDs[i]].imageCID;
        }

        emit LikedImagesPerProfile(likedImagesCID);
    }

}