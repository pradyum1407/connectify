import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { completeOnboarding } from '../lib/api'
import { CameraIcon, LoaderIcon, MapPinIcon, ShuffleIcon, UserCheck } from'lucide-react'
import { LANGUAGES } from '../constant/index'

const onboardPage = () => {

  const { authUser } = useAuthUser();
  const queryclient = useQueryClient();


  const [formData, setFormData] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    nativelanguage: authUser?.nativelanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || ""
  })

  //mutation 
  const { mutate: onboardingMutation, ispending, error } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile completed successfully")
      queryclient.invalidateQueries({ queryKey: ["authuser"] })
    },

    onError:(error)=>{
     toast.error(error.response.data.message)
  
    }
  })

  //handles the submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formData)
  }

  const handleRandomAvatar = () => {
    const idx =Math.floor(Math.random()*100)+1; // 1-100 rand number generated
    const randomAvator= `https://avatar.iran.liara.run/public/${idx}.png`;  

    setFormData({...formData,  profilePic:randomAvator});
    toast.success("Random profile was selected")
  }

  return (

    <div className=' h-screen bg-base-100 flex items-center justify-center p-4 '>
      <div className='card bg-base-200 w-full max-w-3xl shadow-3xl max-h-screen overflow-y-auto'>
        <div className=' card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm-text-3xl font-bold text-center  mb-6'>Complete your profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className="flex flex-col items-center justify-center space-y-4">

              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>


              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullname}
                onChange={(e) => setFormState({ ...formData, fullname: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your goals"
              />
            </div>



            {/* Languages */}
            <div className="grid grid-cols-1  gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativelanguage}
                  onChange={(e) => setFormData({ ...formData, nativelanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>



            </div>


            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

<button className='btn btn-primary w-full' disabled={ispending} type="submit" >
{!ispending? (
  <>
  <UserCheck className='size-5 mr-2'/>
  Complete Onboarding
  </>
):(
<>
  <LoaderIcon className='animate-spin size-5 mr-2'/>
  onboarding ... 
    </>

)}
</button>
          </form>


        </div>

      </div>
    </div>
  )
}

export default onboardPage