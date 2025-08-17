import { PostToApi } from "../../../../AppFunctions";


export function StatisticReducer({action, statistic, setStatistic, from, setFrom, to, setTo, delMsg, setDelMsg}){

    // console.log(action)

    switch (action.type) {
      case "GET_STATISTIC":     GET_STATISTIC();    break
      case "OPEN_CLOSE_LINE":   OPEN_CLOSE_LINE();  break
      case "DELETE_LINE":       DELETE_LINE();      break
      default:                                      break
    }

    function sortStatisticData(data) {
      if (!data?.statistic) return []
      const sortedLogins = data.statistic.map(entry => {
        return { ...entry, logins: (entry.logins || []).slice().sort((a, b) => b.lastUnix - a.lastUnix) }
      })
      return sortedLogins.slice().sort((a, b) => {
        return (b.logins?.[0]?.lastUnix || 0) - (a.logins?.[0]?.lastUnix || 0)
      })
    }

    function GET_STATISTIC() {
      const query = { GET_STATISTIC: true, from, to }
      PostToApi('/getStatistic', query, (data)=> {
        setStatistic( sortStatisticData(data) )
      })
    }
  
    function OPEN_CLOSE_LINE(){
      const { id, unix } = action
      setStatistic( prev=>prev.map( (el)=>
        el?._id !== id
        ? el
        : {...el, logins:el?.logins.map( (login)=>
            login?.lastUnix !== unix
            ? login
            : {...login, open:!login?.open}
          )}
      ))
    }

    function DELETE_LINE() {
      const { id, unix } = action
      const query = { DELETE_LINE:true, id, unix, from, to }
      PostToApi('/getStatistic', query, (data) => {
        data?.statistic && setStatistic( sortStatisticData(data) )
        data?.delMsg && setDelMsg(data.delMsg)
      })
    }

}