import React from "react"


export function AddWeekBtn({ props:{tr, user, act, increment, setPrevWeek} }) {

  const ADD_WEEK = ()=> setPrevWeek(prev=> prev + increment)

  return(
    <div className="WeekArea flex">

      <div className="WeekDocs flex stretch">

        <div className="LeftPannel flex"></div>

        <div className="RightPannel flex">

          <div className="AddWeekBtn flex" onClick={ADD_WEEK}>
            <span>{tr(`AddWeekBtn_${act}`,user?.lang)}</span>
          </div>

        </div>

      </div>

    </div>
  )
}