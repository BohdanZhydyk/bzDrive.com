import { bzScroolToDiv, PostToApi, TimeTo_YYYYMMDD } from "../../../AppFunctions"


export function OffifceReducer({
  action, isLogined, companies, setCompanies, activeCompany, setActiveCompany, newDoc, setNewDoc,
  calendar, setCalendar, documents, setDocuments, prevWeek, setPrevWeek, docSelect, setDocSelect,
  dowloadBar, setDownloadBar
}){

  switch (action.type) {
    case "GET_NEW_COMPANY":             GET_NEW_COMPANY();            break
    case "GET_COMPANIES":               GET_COMPANIES();              break
    case "SAVE_COMPANY":                SAVE_COMPANY();               break
    case "SET_ACTIVE_COMPANY":          SET_ACTIVE_COMPANY();         break
    case "GET_CALENDAR":                GET_CALENDAR(prevWeek);       break
    case "SELECT_MODES":                SELECT_MODES();               break
    case "PREV_NEXT_WEEK_MOVE":         PREV_NEXT_WEEK_MOVE();        break
    case "OPEN_CLOSE_NEW_DOCUMENT":     OPEN_CLOSE_NEW_DOCUMENT();    break
    case "OPEN_CLOSE_DOCUMENT":         OPEN_CLOSE_DOCUMENT();        break
    case "SAVE_DOCUMENT":               SAVE_DOCUMENT(calendar);      break
    default:                                                          break
  }

  function GET_NEW_COMPANY(){
    const query = {getNewCompany:true}
    PostToApi( '/getOfficeNew', query, (data)=>{
      setCompanies( prev=> ({...prev, myCompanies:[...prev?.myCompanies, data]}) )
      setActiveCompany( prev=> companies?.myCompanies?.length )
    })
  }

  function GET_COMPANIES(){
    const query = {getCompanies:true}
    PostToApi( '/getOfficeNew', query, (data)=>{
      setCompanies( prev=> data )
      setActiveCompany( prev=> prev === false ? 0 : prev )
    })
  }

  function SAVE_COMPANY(){

    const myCompany = action?.myCompany

    if(!isLogined){
      setCompanies( prev=> ({...prev, myCompanies:prev?.myCompanies.map(
        company=> (company?._id !== myCompany?._id) ? company : myCompany )})
      )
      return
    }

    const query = {saveCompany:true, myCompany}
    PostToApi( '/getOfficeNew', query, (data)=>{
      setCompanies( prev=> false )
      GET_COMPANIES()
    })

  }

  function SET_ACTIVE_COMPANY(){
    setActiveCompany( action?.c )
    setCalendar( prev=> false )
    GET_CALENDAR(prevWeek, action?.c)
  }

  function GET_CALENDAR(prevWeek, active = activeCompany, select = docSelect){
    setDownloadBar( prev=> true )
    const companyShortName = companies?.myCompanies[active]?.shortName
    const query = {getCalendar:true, companyShortName, prevWeek, select}
    PostToApi( '/getOfficeNew', query, (data)=>{
      setCalendar( prev=> data?.calendar )
      setDocuments( prev=> !isLogined ? documents : data?.documents )
      setDownloadBar( prev=> false )
    })
  }
  
  function SELECT_MODES(){
    setDocSelect( prev=> prev.map( el=> (el.name !== action?.mode) ? el : {...el, act:!el?.act} ) )
    setCalendar( false )
  }
  
  function PREV_NEXT_WEEK_MOVE(){
    const weekNr = prevWeek + action?.dir
    setPrevWeek( prev=> weekNr )
    setCalendar( prev=> false )
    GET_CALENDAR(weekNr)
  }
  
  function OPEN_CLOSE_NEW_DOCUMENT(){
    const {mode, scroolTo:{divName, offset}} = action
    setNewDoc( prev=> ({...prev, nr:{...prev?.nr, mode}, active:!prev?.active}) )
    bzScroolToDiv(divName, offset)
  }
  
  function OPEN_CLOSE_DOCUMENT(){

    const {doc, active, scroolTo:{divName, offset}} = action
    
    const id = doc?._id
    const companyShortName = companies?.myCompanies[activeCompany]?.shortName
    const query = {getDocument:id, companyShortName}

    function NEW_CALENDAR(dbDoc){
      setDocuments( prev=> prev.map( document=> document?._id !== id ? document : {...dbDoc ? dbDoc : doc, active:!doc?.active} ))
      bzScroolToDiv(divName, offset)
    }

    !active && isLogined
    ? PostToApi( '/getOfficeNew', query, (data)=>{ NEW_CALENDAR(data) })
    : NEW_CALENDAR(false)

  }

  function SAVE_DOCUMENT(calendar){

    const {docData, scroolTo:{divName, offset}} = action
    const {id, active, ...newDocData} = docData
    const isNewDoc = id === "newDoc"

    const select = docSelect?.map( el=> (el.name !== docData?.nr?.mode) ? el : {...el, act:true} )
    setDocSelect( prev=> select )

    if(!isLogined){
    
      function getSign(){
        const mode = newDocData?.nr?.mode
        const fromThatMonth = parseInt( `${parseInt(newDocData?.nr?.from / 100)}00` )
        const toThatMonth = parseInt( `${parseInt(newDocData?.nr?.from / 100)}31` )
        const lastDocSign = documents
          ?.filter( doc=> doc?.nr?.mode === mode )
          ?.filter(doc => doc?.nr?.from > fromThatMonth && doc?.nr?.from < toThatMonth)
          ?.sort( (a, b)=> parseInt(b?.nr?.sign) - parseInt(a?.nr?.sign) )[0]?.nr?.sign
        const newDocSign = lastDocSign ? (lastDocSign + 1) : 1
        return newDocSign
      }

      isNewDoc
      ? setDocuments( prev=> [...prev, {_id:Date.now(), ...newDocData, nr:{...newDocData?.nr, sign:getSign()}}] )
      : setDocuments( prev=> prev.map( doc=> doc?._id !== docData?.id ? doc : {_id:id, ...newDocData} ) )
      return
      
    }

    const query = {saveDocument:true, docData, calendar}
    PostToApi( '/getOfficeNew', query, (data)=>{
      if(data?._id){
        console.log("docFromDB",data)
        GET_CALENDAR( prevWeek, activeCompany, select )
        bzScroolToDiv( divName, offset )
      }
    })
  }

}

export const today = TimeTo_YYYYMMDD(new Date( Date.now() ))

export const initialNewDoc = { _id:"newDoc", nr:{from:today, to:today} }

export const initialDocSelect = [ {name:"ZL", act:true},{name:"FS"},{name:"FZ"},{name:"PS"},{name:"PZ"},{name:"ZU"},{name:"VA"} ]

export const noCompanyWarningTxt = [
  `Uwaga!`,
  `Nie jesteś zalogowany, więc wszystkie wprowadzone przez Ciebie dane będą widoczne do momentu ponownego uruchomienia aplikacji.`,
  `Niektore funkcje, naprzyklad zaladowanie zdjec, czy dokumentow na server, sa niemozliwe.`,
  `Zachęcamy do wprowadzenia jedynie przykładowych danych w celu przetestowania funkcjonalności aplikacji`
]