import React from "react"

import { docDateProps, docLines, docPriceProps, docTasksProps, docTimeFromProps, docTimeToProps } from "./../cleaningPropses"
import ActionBtn from "../../../../All/ActionBtn"
import CleaningInputDate from "../CleaningInputs/CleaningInputDate"
import CleaningInputText from "../CleaningInputs/CleaningInputText"
import CleaningInputTime from "../CleaningInputs/CleaningInputTime"
import CleaningInputTextArea from "../CleaningInputs/CleaningInputTextArea"
import CleaningInputPrice from "../CleaningInputs/CleaningInputPrice"
import { ContactImgs } from "./ContactImgs"


export function DocumentArea({ props:{job, setJob, isSaveJob, setIsSaveJob, SAVE_JOB, CLOSE_JOB} }) {
  return(
    <div className="DocumentArea flex column start">

      <div className="DocTop flex">

        <span className="DocID flex start">{`ID: ${job?._id}`}</span>

        { isSaveJob && <ActionBtn props={{name:'save', click:SAVE_JOB}} /> }

        <ActionBtn props={{name:'cancel', click:CLOSE_JOB}} />
        
      </div>

      <div className="DocLine flex" key={`DocLineGroupDateTime`}>

        <div className="InputDate flex" >
          <CleaningInputDate props={docDateProps({job, setJob, setIsSaveJob})} />
        </div>

        <div className="InputTimeFrom flex" >
          <CleaningInputTime props={docTimeFromProps({job, setJob, setIsSaveJob})} />
        </div>

        <div className="InputTimeTo flex" >
          <CleaningInputTime props={docTimeToProps({job, setJob, setIsSaveJob})} />
        </div>

      </div>

      {
        docLines({job, setJob, setIsSaveJob}).map( (group, g)=>{
          return(
            <div className="DocLine flex" key={`DocLineGroupTxt${g}`}>
            {
              group.map( (line, l)=>{
                return(
                  <div className={`${line?.st} flex`} key={`DocLineGroupLineTxt${g}${l}`}>
                    <CleaningInputText props={line?.props} />
                  </div>
                )
              })
            }
            </div>
          )
        })
      }

      <div className="DocLine flex" key={`DocLineGroupTasks`}>

        <div className="InputTasks flex" >
          <CleaningInputTextArea props={docTasksProps({job, setJob, setIsSaveJob})} />
        </div>

      </div>

      <div className="DocLine flex start" key={`DocLineGroupPrice`}>

        <div className="InputPrice flex start" >
          <CleaningInputPrice props={docPriceProps({job, setJob, setIsSaveJob})} />
        </div>

      </div>

      <ContactImgs props={{job}} />

    </div>
  )
}