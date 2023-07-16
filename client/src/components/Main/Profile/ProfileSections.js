import React from "react"

import "./Profile.scss"
import { saveBtnProps, sections } from "./ProfileLogic"
import ActionBtn from "../../All/ActionBtn"


export function ProfileSections({ props }){

  return(
    <div className="ProfileSections flex column start">

      <div className="ProfileSectionWraper flex start stretch wrap">
      {
        sections(props).map( (sect, s)=>{

          const key = `ProfileSection${s}`
          const classes = `${sect?.act ? `ActiveName` : ``} flex start bold`
          const Fn = ()=>sect?.fn()
          
          return(
            <section className="ProfileSection flex column start" key={key}>

              <div className={`SectionName ${classes}`} onClick={Fn}>
                <span>{sect?.name}</span>
              </div>

              {
                sect?.act &&
                <div className="SectionArea flex column start">

                  <div className="SectionLine flex start">
                    { sect?.component }
                    { sect?.edit && <ActionBtn props={saveBtnProps()} /> }
                  </div>

                </div>
              }

            </section>
          )
        })
      }
      </div>

    </div>
  )
}