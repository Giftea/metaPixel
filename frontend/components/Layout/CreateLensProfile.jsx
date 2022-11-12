// import { useState, useEffect } from "react";
// import { createProfile, challenge, authenticate,getProfiles} from "../../api";
// import { client } from "../../apollo-client";
// import { useAccount } from "wagmi";
// import { ethers } from 'ethers'

// export default function CreateLensProfile() {
//   const [lensHandle, setLensHandle] = useState("");
//   const { address } = useAccount();
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true);
//   }, [])

//   async function login() {
//     try {
//       /* first request the challenge from the API server */
//       const challengeInfo = await client.query({
//         query: challenge,
//         variables: { address }
//       })
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner()
//       /* ask the user to sign a message with the challenge info returned from the server */
//       const signature = await signer.signMessage(challengeInfo.data.challenge.text)
//       /* authenticate the user */
//       const authData = await client.mutate({
//         mutation: authenticate,
//         variables: {
//           address, signature
//         }
//       })
//       /* if user authentication is successful, you will receive an accessToken and refreshToken */
//       const { data: { authenticate: { accessToken }}} = authData
//       console.log({ accessToken })
//       // setToken(accessToken)

//     localStorage.setItem(
//       "lens_auth_token",
//       accessToken.data.authenticate.accessToken
//     )

//     } catch (err) {
//       console.log('Error signing in: ', err)
//     }
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log("LOGGING IN");
//       await login();
//       console.log("LOGGED IN!");
//       const request = {
//         handle: lensHandle,
//       };
//       const response = await createProfile(request);
//       console.log("CREATED PROFILE!", response);
//     } catch (error) {
//       console.log("ERROR", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create a new lens profile</h2>
//       {address && mounted && (
//         <form onSubmit={handleSubmit}>
//           <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
//             <label
//               htmlFor="lens-handle"
//               className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
//             >
//               Lens Handle
//             </label>
//             <div >
//               <input
//                 id="lens-handle"
//                 name="lens-handle"
//                 type="text"
            
//                 required
//                 value={lensHandle}
//                 onChange={(e) => setLensHandle(e.target.value)}
//               />
//             </div>
//           </div>

//           <button type="submit">Create a handle</button>
//         </form>
//       )}
//     </div>
//   );
// }

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { createProfile, getProfiles } from "../../api";
import { RadioGroup } from "@headlessui/react";
import Layout from "./Layout";
import { classNames } from "../../utils/helpers";
import Loading from "../Loading";
// import NeedConnectWallet from "../components/placeholders/NeedConnectWallet";
import useAuth from "../../hooks/useAuth";

export default function CreateProfile() {
  const router = useRouter();

  const { address } = useAccount();
  const { setAuth } = useAuth();

  const [loading, setLoading] = useState(true);
  const [lensHandle, setLensHandle] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (address) {
      fetchProfiles();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchProfiles() {
    try {
      let response = await getProfiles({ ownedBy: [address] });
      console.log("fetchProfiles RESPONSE", response);
      setProfiles(response.data.profiles.items);
      if (profiles.length > 0) {
        setSelected(profiles[0].handle);
      }
      setLoading(false);
    } catch (error) {
      console.log("fetchProfiles ERROR:", error);
      setLoading(false);
    }
  }

  const handleContinue = (e) => {
    e.preventDefault();
    localStorage.setItem("lens_handle", selected);
    setAuth({ lens_handle: selected });
    router.push(`/dashboard/${selected}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = {
        handle: lensHandle,
      };
      const response = await createProfile(request);
      console.log("CREATED PROFILE!", response);
      localStorage.setItem("lens_handle", `${lensHandle}.test`);
      setAuth({ lens_handle: selected });
      setTimeout(() => {
        router.push(`/dashboard/${lensHandle}.test`);
      }, 1000);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Setup | Pixeed</title>
      </Head>

      <div className="mx-auto my-2 max-w-7xl px-4 sm:my-4 sm:px-6">
        {loading ? (
          <Loading />
        ) : (
          <>
            {address ? (
              <div className="mx-auto max-w-md sm:max-w-3xl">
                {profiles.length > 0 ? (
                  <>
                    <h1 className="text-center text-3xl leading-8 text-emerald-800 sm:text-4xl font-cursive font-normal">
                      Choose your Lens profile
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-stone-600">
                      Pick any of your Lens profiles to access your homebase.
                    </p>
                    <div className="mx-auto w-full sm:max-w-md mt-5 md:mt-8">
                      <RadioGroup value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only">
                          {" "}
                          Profiles{" "}
                        </RadioGroup.Label>
                        <div className="space-y-4">
                          {profiles.map((profile) => (
                            <RadioGroup.Option
                              key={profile.id}
                              value={profile.handle}
                              className={({ checked, active }) =>
                                classNames(
                                  checked
                                    ? "border-transparent"
                                    : "border-stone-300",
                                  active
                                    ? "border-emerald-600 ring-2 ring-emerald-600"
                                    : "",
                                  "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <span className="flex items-center">
                                    <span className="flex flex-col text-sm">
                                      <RadioGroup.Label
                                        as="span"
                                        className="font-medium text-stone-900"
                                      >
                                        {profile.handle}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className="text-stone-500"
                                      >
                                        <span className="block sm:inline">
                                          {profile.stats.totalPosts} Posts
                                        </span>{" "}
                                        <span
                                          className="hidden sm:mx-1 sm:inline"
                                          aria-hidden="true"
                                        >
                                          &middot;
                                        </span>{" "}
                                        <span className="block sm:inline">
                                          {profile.stats.totalFollowers}{" "}
                                          Followers
                                        </span>
                                        <span
                                          className="hidden sm:mx-1 sm:inline"
                                          aria-hidden="true"
                                        >
                                          &middot;
                                        </span>{" "}
                                        <span className="block sm:inline">
                                          {profile.stats.totalFollowing}{" "}
                                          Following
                                        </span>
                                      </RadioGroup.Description>
                                    </span>
                                  </span>

                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-emerald-600"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-lg"
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                      <div className="text-center mt-5 md:mt-8">
                        <button
                          type="button"
                          onClick={handleContinue}
                          className="inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/pot.png"
                        alt="Plant"
                      />
                    </div>
                    <h1 className="text-center text-3xl leading-8 text-emerald-800 sm:text-4xl font-cursive font-normal">
                      Create your Lens profile
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-stone-600">
                      Create a Lens profile to build your own homebase.
                    </p>
                    <div className="mx-auto w-full sm:max-w-md my-5 md:my-8">
                      <form className="space-y-12" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-stone-700"
                          >
                            Your handle
                          </label>
                          <div className="mt-2 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-stone-300 bg-stone-50 px-3 text-stone-500 sm:text-sm">
                              @
                            </span>
                            <input
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                              value={lensHandle}
                              onChange={(e) => setLensHandle(e.target.value)}
                              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-stone-300 px-3 py-2 focus:border-emerald-600 focus:ring-emerald-600 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                          >
                            Create Lens profile
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>connect wallet</div>
            )}
          </>
        )}
      </div>
     </Layout>
  );
}

