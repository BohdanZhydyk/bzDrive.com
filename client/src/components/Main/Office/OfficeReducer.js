import { PostToApi, bzScroolToDiv } from "./../../../AppFunctions"


export const OfficeReducer = (
  action, user, prevWeek, company, setCompanies, docs, setDocs, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar
)=>{

  switch (action.type) {
    case "GET_COMPANIES":   GET_COMPANIES();    break
    case "GET_DOCS":        GET_DOCS();         break
    case "SET_SEL_BTN":     SET_SEL_BTN();      break
    case "SAVE_DOC":        SAVE_DOC();         break
    case "OPEN_DOCUMENT":   OPEN_DOCUMENT();    break
    case "CLOSE_DOCUMENT":  CLOSE_DOCUMENT();   break
    default:                                    break
  }

  const newDocs1 = (docs)=>       docs.map( el=> el._id !== action?.docID ? el : {...el, downloadStatus:true} )
  const newDocs2 = (docs)=>       docs.map( el=> el._id !== action?.docID ? el : {...el, downloadStatus:true} )
  const newDocs3 = (docs, data)=> docs.map( el=> el._id !== action?.docID ? el : {...data, editMode:true, downloadStatus:false} )
  const newDocs4 = (docs, data)=> docs.map( el=> el._id !== action?.docID ? el : {...data, editMode:el?.editMode, downloadStatus:false} )
  const newDocs5 = (docs)=>       docs.map( el=> el._id !== action?.docID ? el : {...el, editMode:false} )
  const newDocs6 = (docs)=>       docs.map( el=> el._id !== action?.docID ? el : {...el, editMode:el?.editMode} )

  function GET_COMPANIES(){
    const query = {getCompany:true}
    PostToApi( '/getOffice', query, (data)=> setCompanies(prev=> data) )
  }

  function GET_DOCS(){
    const query = {getDocs:true, modes:docSelect, company, prevWeek}
    PostToApi( '/getOffice', query, (data)=>{
      setDocs( prev=> data )
      setDocSelectDlBar(false)
    })
  }

  function SAVE_DOC(){

    const docID = action?.docID
    const docData = action?.docData

    setDocSelectDlBar(true)

    setDocs( prev=>
      prev.map( line=>( {...line, docs: (line?.docs?.length > 0) ? newDocs1(line?.docs) : line?.docs } ) )
    )
    
    const query = {saveDocument:true, docID, docData}
    const getNewElements = ()=> setDocSelect( prev=> prev?.map( el=> el?.name !== docData?.nr?.mode ? el : {...el, act:true} ) )

    PostToApi( '/getOffice', query, (data)=> data?._id && getNewElements() )
    
    // setSearch({ ...search, docs: search?.docs?.map( el=> ( el?._id !== newDoc?._id ) ? el : newDoc ) })

  }

  function OPEN_DOCUMENT(){

    setDocs( prev=>
      prev.map( line=>({ ...line, docs: (line?.docs?.length > 0) ? newDocs2(line?.docs) : line?.docs }) )
    )

    const query = {getDocument:true, mode:action?.mode, company, docID:action?.docID}
    PostToApi( '/getOffice', query, (data)=>{
      setDocs( prev=>
        prev.map( (line, l)=>(
          l === action?.lineNr
          ? { ...line, docs: (line?.docs?.length > 0) ? newDocs3(line?.docs, data) : line?.docs }
          : {...line, docs: (line?.docs?.length > 0) ? newDocs4(line?.docs, data) : line?.docs }
        ))
      )
      setDocSelectDlBar(false)
      bzScroolToDiv(action?.divName, action?.offset)
    })
  }

  function CLOSE_DOCUMENT(){
    setDocs( prev=>
      prev.map( (line, l)=>(
        l === action?.lineNr
        ? {...line, docs: (line?.docs?.length > 0) ? newDocs5(line?.docs) : line?.docs }
        : {...line, docs: (line?.docs?.length > 0) ? newDocs6(line?.docs) : line?.docs }
      )
      )
    )
    bzScroolToDiv(action?.divName, action?.offset)
  }

  function SET_SEL_BTN(){ GET_DOCS() }

}