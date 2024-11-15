"use client";

import { useUserContext } from "@/context/user/userContext";
import useRedirect from "@/hooks/useRedirect";
import { useState } from "react";
import ChangePasswordForm from "./component/auth/ChangePasswordForm/ChangePasswordForm";

export default function Home() {

  useRedirect("/login");

  const { logoutUser, verifyEmail, user, handleUserInput, updateUser, userState, allUsers, deleteUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  if (!user) { return null; }
  const { name, photo, isVerified, bio } = user;


  const myToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <main className="m-6 h-full">
      <header className="flex justify-between">
        <h1 className="text-[2rem] font-bold">
          Welcome <span className="text-red-600">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src={photo || "https://user-images.githubusercontent.com/36547915/97088991-45da5d00-1652-11eb-900f-80d106540f4f.png"}
            alt={name}
            className="w-[40px] h-[40px] rounded-full"
          />
          {!isVerified && (
            <button
              onClick={verifyEmail}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Verify
            </button>)
          }
          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>
        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-[#2ECC71] text-white rounded-md"
          >
            Update Bio
          </button>
        </h1>

        {isOpen &&
          <form className="mt-4 max-w-[400px] w-full">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#999]">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                onChange={(e) => handleUserInput("bio")(e)}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit Update
            </button>
          </form>
        }
      </section>
      <div className="mt-4 flex gap-8">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          {user && user.role === "admin" && (
            <ul>
              {allUsers.map((userRecord: any) => (
                (!user || userRecord._id !== user._id) && (
                  <li
                    key={userRecord._id}
                    className="mb-2 px-2 py-3 border grid grid-cols-4 items-center gap-4"
                  >
                    <img
                      src={userRecord.photo || "https://user-images.githubusercontent.com/36547915/97088991-45da5d00-1652-11eb-900f-80d106540f4f.png"}
                      alt={userRecord.name}
                      className="w-[40px] h-[40px] rounded-full" />
                    <p>{userRecord.name}</p>
                    <p>{userRecord.bio}</p>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => deleteUser(userRecord._id)}
                    >
                      Delete
                    </button>
                  </li>
                )))}
            </ul>
          )}
        </div>
      </div>
    </main >
  )
}