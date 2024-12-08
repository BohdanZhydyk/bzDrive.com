import { PostToApi } from "../../../../AppFunctions"


export const CleaningReducer = ({action, setWeek, job, setJob, setSearch, setSearchObj, setDownload}) => {

  // console.log(action)

  switch (action.type) {
    case "GET_JOBS":        GET_JOBS();       break
    case "SAVE_JOB":        SAVE_JOB();       break
    case "DELETE_JOB":      DELETE_JOB();     break
    case "SEARCH_DOCS":     SEARCH_DOCS();    break
    default:                                  break
  }

  function GET_JOBS(){
    // setDownload( prev=>true )
    // const date = dateFromYYYYMMDD( job?.date )
    // const dayOfWeek = action?.dayOfWeek ?? parseInt( `${date?.YYYY}${date?.MM}${date?.DD}` )
    const dayOfWeek = action?.dayOfWeek
    const query = { GET_JOBS:true, dayOfWeek }
    PostToApi( '/getCleaning', query, (data)=>{
      setWeek(data)
      setDownload( prev=>false )
    })
  }

  function SAVE_JOB(){
    // setDownload( prev=>true )
    // setSearch( prev=>false )
    // setSearchObj( prev=>false )
    setWeek( prev=>prev.map( el=> ({dayInfo:{...el?.dayInfo}}) ) )
    setJob( prev=>false )
    const query = {SAVE_JOB:true, job:action?.job}
    PostToApi( '/getCleaning', query, (data)=> GET_JOBS() )
  }

  function DELETE_JOB(){
    setDownload(prev=>true)
    const query = {DELETE_JOB:true, _id:action?._id}
    PostToApi( '/getCleaning', query, (data)=> GET_JOBS() )
  }

  function SEARCH_DOCS(){
    setDownload(prev=>true)
    const query = {SEARCH_DOCS:true, search:action?.search}
    PostToApi( '/getCleaning', query, (data)=>{
      setSearchObj(data)
      setDownload(prev=>false)
    })
  }

}