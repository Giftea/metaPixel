import React, { useState } from "react";
import Layout from "../../components/Layout";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      name: name,
      bio: bio,
    };

    try {
      const response = await fetch("../api/store-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        alert("Please refresh and try again.");
      } else {
        console.log("Form successfully submitted!");
        let responseJSON = await response.json();
        console.log(responseJSON.cid);
      }
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export default EditProfile;
