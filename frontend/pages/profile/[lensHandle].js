import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/Layout";
import UserDetails from "../../components/ProfilePage/UserDetails";
import UserGallery from "../../components/ProfilePage/UserGallery";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getProfile, getPublications } from "../../api";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const [publications, setPublications] = useState([]);

  const router = useRouter();
  const { lensHandle } = router.query;

  useEffect(() => {
    if (lensHandle) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [lensHandle]);

  async function fetchProfile() {
    try {
      let response = await getProfile({ handle: lensHandle });
      console.log("PROFILE:", response);
      // setProfile(response.data.profile);

      // let pubResponse = await getPublications(response.data.profile.id);
      // console.log("PUBS:", pubResponse.data.publications.items);
      // setPublications(pubResponse.data.publications.items);
    } catch (error) {
      console.log("ERROR:", error);
    }
    setLoading(false);
  }


  return (
    <Layout>
      {loading ? <div>Loading...</div> : (
        <Box p={{ base: 6, md: 20 }}>
          {/* pass profile and publications details here as props */}
          <UserDetails />
          <UserGallery />
        </Box>
      )}
    </Layout>
  );
};

export default Profile;
