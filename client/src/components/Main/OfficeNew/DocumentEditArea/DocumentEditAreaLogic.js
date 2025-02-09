
export function DocumentEditAreaReducer({
  action, save, setSave, id, setId, status, setStatus, nr, setNr, docUser, setDocUser,
  docCompany, setDocCompany, dealer, setDealer, car, setCar, client, setClient,
  location, setLocation, buyer, setBuyer, seller, setSeller, tasks, setTasks,
  articles, setArticles, comments, setComments, files, setFiles, soft, setSoft,
  SAVE, CLOSE
}){

  switch (action.type) {
    case "CLOSE_DOCUMENT":              CLOSE_DOCUMENT();             break
    case "DELETE_DOCUMENT":             DELETE_DOCUMENT();            break
    case "SAVE_DOCUMENT":               SAVE_DOCUMENT();              break
    case "STATUS_CHANGE":               STATUS_CHANGE();              break
    case "COLOR_CHANGE":                COLOR_CHANGE();               break
    default:                                                          break
  }

  function CLOSE_DOCUMENT(){ CLOSE() }

  function DELETE_DOCUMENT(){
    setSave( prev=> true )
    setStatus( prev=> "delete" )
  }

  function SAVE_DOCUMENT(){
    CLOSE()
    SAVE({
      id, status, nr, docUser, docCompany, dealer, car, client,
      location, buyer, seller, tasks, articles, comments, files, soft
    })
  }

  function STATUS_CHANGE(){
    setSave( prev=> true )
    setStatus( prev=> action?.status )
  }

  function COLOR_CHANGE(){
    setSave( prev=> true )
    setNr( prev=> ({ ...prev, color:action?.color }) )
  }

}