import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { createProfile, getProfiles } from '../../lensCalls'
import { RadioGroup } from '@chakra-ui/react'
import Layout from './Layout'
// import { classNames } from '../../utils/helpers'
import useAuth from '../../hooks/useAuth'
import { getDefaultProfile } from '../../utils/getDefaultProfile'

export default function CreateProfile() {
  const router = useRouter()

  const { address } = useAccount()
  const { setAuth } = useAuth()

  const [loading, setLoading] = useState(true)
  const [lensHandle, setLensHandle] = useState('')
  const [profiles, setProfiles] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    console.log(address)
    if (address) {
      fetchProfiles()
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchProfiles() {
    try {
      let response = await getProfiles({ ownedBy: [`${address}`], limit: 10 })
      console.log('fetchProfiles RESPONSE', response)
      setProfiles(response.data.profiles.items)
      if (profiles.length > 0) {
        setSelected(profiles[0].handle)
      }
      setLoading(false)
    } catch (error) {
      console.log('fetchProfiles ERROR:', error)
      setLoading(false)
    }
  }

  const handleContinue = (e) => {
    e.preventDefault()
    localStorage.setItem('lens_handle', selected)
    setAuth({ lens_handle: selected })
    router.push(`/dashboard/${selected}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const request = {
        handle: lensHandle,
      }
      const response = await createProfile(request)
      console.log('CREATED PROFILE!', response)
      localStorage.setItem('lens_handle', `${lensHandle}.test`)
      setAuth({ lens_handle: selected })
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  return (
    <Layout>
      <div className="mx-auto my-2 max-w-7xl px-4 sm:my-4 sm:px-6">
        {loading ? (
          <h1>loading</h1>
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
                          {' '}
                          Profiles{' '}
                        </RadioGroup.Label>
                        <div className="space-y-4">
                          {profiles.map((profile) => (
                            <RadioGroup.Option
                              key={profile.id}
                              value={profile.handle}
                              className={({ checked, active }) =>
                                classNames(
                                  checked
                                    ? 'border-transparent'
                                    : 'border-stone-300',
                                  active
                                    ? 'border-emerald-600 ring-2 ring-emerald-600'
                                    : '',
                                  'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
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
                                        </span>{' '}
                                        <span
                                          className="hidden sm:mx-1 sm:inline"
                                          aria-hidden="true"
                                        >
                                          &middot;
                                        </span>{' '}
                                        <span className="block sm:inline">
                                          {profile.stats.totalFollowers}{' '}
                                          Followers
                                        </span>
                                        <span
                                          className="hidden sm:mx-1 sm:inline"
                                          aria-hidden="true"
                                        >
                                          &middot;
                                        </span>{' '}
                                        <span className="block sm:inline">
                                          {profile.stats.totalFollowing}{' '}
                                          Following
                                        </span>
                                      </RadioGroup.Description>
                                    </span>
                                  </span>

                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked
                                        ? 'border-emerald-600'
                                        : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-lg'
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
                    <h1>Create your Lens profile</h1>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label htmlFor="username">Your handle</label>
                          <div>
                            <span>@</span>
                            <input
                              type="text"
                              name="username"
                              id="username"
                              autoComplete="username"
                              value={lensHandle}
                              onChange={(e) => setLensHandle(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <button type="submit">Create Lens profile</button>
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
  )
}
