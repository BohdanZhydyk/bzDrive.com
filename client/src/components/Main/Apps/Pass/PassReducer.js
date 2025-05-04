import { PostToApi } from "../../../../AppFunctions"


export const newLine = {userName:"", login:"", pass:"", encrypted:true}
export const newPass = {_id:"new", siteName:"", link:"", info:"", siteData:[newLine]}

export const PassReducer = ({ action, pass, setPass, sorted, setSorted, actGroup, setActGroup })=>{

  switch (action?.type) {
    case "GET_PASS":        GET_PASS();       break;
    case "OPEN_CLOSE":      OPEN_CLOSE();     break;
    case "SAVE_PASS":       SAVE_PASS();      break;
    case "SHOW_PASS":       SHOW_PASS();      break;
    case "ACT_GROUP_CHG":   ACT_GROUP_CHG();  break;
    case "SEARCH_PASS":     SEARCH_PASS();    break;
    default: break;
  }

  function GET_PASS(){
    const query = {getPass:true, query:{}}
    PostToApi( '/getPass', query, (data)=>{
      const sortedData = [ newPass, ...data.sort( (a, b)=> a.siteName.localeCompare(b.siteName) ) ]
      setPass( prev=> sortedData )
      setSorted( prev=> sortedData )
    })
  }

  function OPEN_CLOSE() {

    const id = action?.id
    const isOpened = sorted.find(el => el?._id === id)?.edit
    const query = { getPassElement: true, query: { _id: id } }

    if (id === "new") {
      setSorted(prev => prev.map(pass => pass._id === id ? { ...pass, edit: !isOpened } : pass ) )
      return
    }

    !isOpened
    ? PostToApi('/getPass', query, (data) => {
        setSorted( prev => prev.map(pass => pass._id === id ? {...pass, ...data, edit:true} : pass ) )
      })
    : setSorted( prev => prev.map(pass => pass._id === id ? (({ info, siteData, edit, ...rest }) => rest)(pass) : pass ) )
  }

  function SHOW_PASS(){

    const { id, l, encrypted } = action
    const query = {showPass:true, query:{_id:id, l}}
    encrypted ? PostToApi('/getPass', query, (data)=>SET(data)) : SET(false)

    function SET(data){
      setSorted(
        prev=> prev.map(
          el=> el?._id !== id
          ? el
          : {...el, siteData:el?.siteData.map( (line, n)=>
              (n !== l)
              ? line
              : (
                  encrypted
                  ? {...line, pass:data, encrypted}
                  : {userName:line?.userName, login:line?.login}
                )
            )}
        )
      )
    }
  }

  function SAVE_PASS(){

    setPass( prev=> [] )
    setSorted( prev=> [] )

    const query = {savePass:true, query:action?.element}
    PostToApi( '/getPass', query, (data)=> {

      const sortedData = data.sort((a, b) => a.siteName.localeCompare(b.siteName))
      setPass( prev=> sortedData )

      if (actGroup === "Unsorted") {
        setSorted( prev=> sortedData .filter(el => !el?.group))
      } else if (actGroup === "All") {
        setSorted( prev=> sortedData )
      } else {
        setSorted( prev=> sortedData .filter(el => el?.group === actGroup))
      }
    })

  }

  function ACT_GROUP_CHG(group = action?.group){
    setActGroup( prev=> group )
    if(group === "Unsorted"){
      setSorted( prev=> pass.filter( el=> !el?.group ) )
      return
    }
    setSorted( prev=> group === "All" ? pass : pass.filter( el=> el?.group === group ) )
  }

  function SEARCH_PASS(){
    const txt = action?.txt
    ACT_GROUP_CHG("All")
    setSorted( prev=> pass.filter( el=> el?.siteName.toLowerCase().includes(txt.toLowerCase()) ) )
  }

}

export function getGroups(pass) {
  return [
    "All",
    "Unsorted",
    ...pass.reduce((acc, line) => {
      if (!acc.includes(line?.group)) acc.push(line?.group)
      return acc
    }, [])
    .filter(group => group !== undefined)
    .sort((a, b) => a.localeCompare(b))
  ]
}