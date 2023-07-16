import React, { useState } from "react"

import "./Profile.scss"
import { GetUser } from "../../../AppFunctions"
import { UserInfoPannel } from "./UserInfoPannel"
import { ProfileSections } from "./ProfileSections"


function Profile() {

  const [user, setUser] = useState( GetUser() )

  const [email, setEmail] = useState( {val:user?.email, edit:false, err:false} )
  const [pass, setPass] = useState( {val:'', edit:false, err:false} )
  const [verify, setVerify] = useState( {val:'', edit:false, err:false} )
  const [confirm, setConfirm] = useState( {val:'', edit:false, err:false} )
  const [userLang, setUserLang] = useState( {val:user?.lang, values:["en","ua","pl"], edit:false, err:false} )
  const [gender, setGender] = useState( {val:user?.sex, values:["male","female"], edit:false, err:false} )

  const login = user?.login
  const role = user?.role
  const ava = user?.ava

  console.log("user", user)

  return(
    <div className="Profile flex column">
    {
      login &&
      <>
        <UserInfoPannel props={{role, login}} />

        <div className="ProfilePannel flex stretch wrap">

          <div className="ProfileUser flex column start">
            <img className="ProfileAva flex" src={`https://bzdrive.com/files/users/${ava}`} alt="ava" />
          </div>

          <ProfileSections
            props={
              {
                user, setUser,
                userLang, setUserLang,
                email, setEmail,
                pass, setPass,
                verify, setVerify,
                confirm, setConfirm,
                gender, setGender
              }
            }
          />

        </div>
      </>
    }

    </div>
  )
}

export default Profile