// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Pixeed {

    event NewImageUploaded(
        uint256 profileId,
        bytes32 imageID,
        string imageCID
    );

    event NewProfileCreated (
        uint256 profileId,
        bytes32 name,
        string bio,
        bytes32 profileImageDataCID );

    struct CreateProfile {
        uint256 profileId;
        bytes32 name;
        string bio;
        bytes32 profileImageDataCID;
        bytes32[] likedImageIDs;
    }

    struct CreateImageUpload {
        uint256 profileId;
        bytes32 imageID;
        bytes32 imageTitle;
        string imageDescription;
        string imageTags;
        string imageCID;
        uint32 likes;
    }

    mapping(bytes32 => CreateImageUpload) public imageIdToCreateImageUpload;

    uint256 profileIdCounter;

    mapping(uint256 => CreateProfile) public idToProfile;
    mapping(address => CreateProfile) public addressToProfile;

    // only address which doesnt have a profile now
    function createNewProfile (
        bytes32 name,
        string calldata bio,
        bytes32 profileImageDataCID
    ) external {
        profileIdCounter ++;
        uint256 profileId = profileIdCounter;
        bytes32[] memory likedImageIDs;

        idToProfile[profileId] = CreateProfile(
            profileId,
            name,
            bio, 
            profileImageDataCID,
            likedImageIDs
        );

        emit NewProfileCreated(
            profileId,
            name,
            bio, 
            profileImageDataCID);
    }

    function uploadImage (
        bytes32 imageTitle, 
        string calldata imageDescription, 
        string calldata imageTags, 
        string calldata imageCID)
        
        external {
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
        imageIdToCreateImageUpload[imageID].likes ++;

        //addressToProfile[msg.sender] 
    }
}