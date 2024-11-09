import React from "react"


export function AddWeekBtn({ props:{tr, user, act, increment, setPrevWeek, visibleSide, setVisibleSide} }) {

  const ADD_WEEK = ()=> setPrevWeek(prev=> prev + increment)

  const CHG_SIDE = ()=> setVisibleSide( prev=> ({...prev, side:!prev?.side}) )

  return(
    <div className="DocumentLine flex start stretch">

      {
        (!visibleSide?.mobile || visibleSide?.side) &&
        <div className="LeftPannel flex">
          {
            (visibleSide?.side) &&
            <React.Fragment>
              <div className="AddWeekBtn flex" onClick={ADD_WEEK}>
                <span>{tr(`AddWeekBtn_${act}`,user?.lang)}</span>
              </div>

              <div className="ShowModeBtn flex" onClick={()=>CHG_SIDE()}>{`${tr(`ShowModeBtn_calendar`,user?.lang)} >>>`}</div>
            </React.Fragment>
          }
        </div>
      }

      {
        (!visibleSide?.side) &&
        <div className="RightPannel flex">

          {
            (visibleSide?.mobile && !visibleSide?.side) &&
            <div className="ShowModeBtn flex" onClick={()=>CHG_SIDE()}>{`<<< ${tr(`ShowModeBtn_docs`,user?.lang)}`}</div>
          }

          <div className="AddWeekBtn flex" onClick={ADD_WEEK}>
            <span>{tr(`AddWeekBtn_${act}`,user?.lang)}</span>
          </div>

        </div>
      }

    </div>
  )
}