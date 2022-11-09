import { useState, useEffect } from "react";
import { createProfile, challenge, authenticate } from "../../api";
import { client } from "../../apollo-client";
import { useAccount } from "wagmi";
import { ethers } from 'ethers'

export default function CreateLensProfile() {
  const [lensHandle, setLensHandle] = useState("");
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, [])

  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address }
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(challengeInfo.data.challenge.text)
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const { data: { authenticate: { accessToken }}} = authData
      console.log({ accessToken })
      // setToken(accessToken)

    localStorage.setItem(
      "lens_auth_token",
      accessToken.data.authenticate.accessToken
    )

    } catch (err) {
      console.log('Error signing in: ', err)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("LOGGING IN");
      await login();
      console.log("LOGGED IN!");
      const request = {
        handle: lensHandle,
      };
      const response = await createProfile(request);
      console.log("CREATED PROFILE!", response);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div>
      <h2>Create a new lens profile</h2>
      {address && mounted && (
        <form onSubmit={handleSubmit}>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
            <label
              htmlFor="lens-handle"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Lens Handle
            </label>
            <div >
              <input
                id="lens-handle"
                name="lens-handle"
                type="text"
            
                required
                value={lensHandle}
                onChange={(e) => setLensHandle(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Create a handle</button>
        </form>
      )}
    </div>
  );
}
