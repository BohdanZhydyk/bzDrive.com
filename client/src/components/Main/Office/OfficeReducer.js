import { PostToApi, bzDeleteFolder, bzScroolToDiv } from "./../../../AppFunctions"


export const OfficeReducer = (
  action, user, prevWeek, company, setCompanies, search, setSearch, searchQuery, setSearchQuery,
  docs, setDocs, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar
)=>{

  switch (action.type) {
    case "GET_COMPANIES":               GET_COMPANIES();              break
    case "GET_DOCS":                    GET_DOCS();                   break
    case "SET_SEL_BTN":                 SET_SEL_BTN();                break
    case "SAVE_DOC":                    SAVE_DOC();                   break
    case "OPEN_DOCUMENT":               OPEN_DOCUMENT();              break
    case "CLOSE_DOCUMENT":              CLOSE_DOCUMENT();             break
    case "SEARCH_DOCUMENTS":            SEARCH_DOCUMENTS();           break
    case "GET_EARNED":                  GET_EARNED();                 break
    case "DELETE_SOFTWARE_FOLDER":      DELETE_SOFTWARE_FOLDER();     break
    default:                                                          break
  }

  const newDocs1 = (docs)=>       docs.map( el=> el._id !== action?.docID ? el : {...el, downloadStatus:true} )
  const newDocs2 = (docs, data)=> docs.map( el=> el._id !== action?.docID ? el : {...data, editMode:true, downloadStatus:false} )
  const newDocs3 = (docs, data)=> docs.map( el=> el._id !== action?.docID ? el : {...data, editMode:el?.editMode, downloadStatus:false} )
  const newDocs4 = (docs)=>       docs.map( el=> el._id !== action?.docID ? el : {...el, editMode:false} )
  const newDocs5 = (docs)=>       docs.map( el=> el._id !== action?.docID ? el : {...el, editMode:el?.editMode} )

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

  function SET_SEL_BTN(){ GET_DOCS() }

  function SAVE_DOC(){

    const docID = action?.docID
    const docData = action?.docData

    setDocSelectDlBar(true)

    setSearch( prev=> newDocs1(prev) )
    setDocs( prev=>
      prev.map( line=>( {...line, docs: (line?.docs?.length > 0) ? newDocs1(line?.docs) : line?.docs } ) )
    )
    
    const query = {saveDocument:true, docID, docData}
    PostToApi( '/getOffice', query, (data)=>{
      data?._id && setDocSelect( prev=> prev?.map( el=> el?.name !== docData?.nr?.mode ? el : {...el, act:true} ) )
      SEARCH_DOCUMENTS()
    })
  }

  function OPEN_DOCUMENT(){

    setSearch( prev=> newDocs1(prev) )
    setDocs( prev=>
      prev.map( line=>({ ...line, docs: (line?.docs?.length > 0) ? newDocs1(line?.docs) : line?.docs }) )
    )

    const query = {getDocument:true, mode:action?.mode, company, docID:action?.docID}
    PostToApi( '/getOffice', query, (data)=>{

      if(action?.isSearch){
        setSearch( prev=> newDocs2(prev, data) )
        setDocs( prev=>
          prev.map( (line, l)=>({ ...line, docs: (line?.docs?.length > 0) ? newDocs3(line?.docs, data) : line?.docs }) )
        )
      }
      else{
        setSearch( prev=> newDocs3(prev, data) )
        setDocs( prev=>
          prev.map( (line, l)=>(
            l === action?.lineNr
            ? { ...line, docs: (line?.docs?.length > 0) ? newDocs2(line?.docs, data) : line?.docs }
            : {...line, docs: (line?.docs?.length > 0) ? newDocs3(line?.docs, data) : line?.docs }
          ))
        )
      }
      
      setDocSelectDlBar(false)
      bzScroolToDiv(action?.divName, action?.offset)
    })
  }

  function CLOSE_DOCUMENT(){
    
    if(action?.isSearch){ setSearch( prev=> newDocs4(prev) ) }
    else{
      setDocs( prev=>
        prev.map( (line, l)=>(
          l === action?.lineNr
          ? {...line, docs: (line?.docs?.length > 0) ? newDocs4(line?.docs) : line?.docs }
          : {...line, docs: (line?.docs?.length > 0) ? newDocs5(line?.docs) : line?.docs }
        ))
      )
    }

    bzScroolToDiv(action?.divName, action?.offset)
  }

  function SEARCH_DOCUMENTS(){

    setDocSelectDlBar(true)

    const query = {searchDocs:true, company, search:searchQuery?.val}

    searchQuery?.val?.length > 1 &&
    PostToApi( '/getOffice', query, (data)=>{
      setSearch( prev=> data)
      setDocSelectDlBar(false)
    })
  }

  function GET_EARNED(){
    const query = {getEarned:true, company, from:action?.from, to:action?.to}
    PostToApi( '/getOffice', query, (data)=>{ action?.cb(data) })
  }

  function DELETE_SOFTWARE_FOLDER() {
    bzDeleteFolder(action?.folderAddr, (data)=>{ action?.cb(data) })
  }

}