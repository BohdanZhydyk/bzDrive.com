import { PostToApi } from "../../../../AppFunctions";


export function StatisticReducer({action, statistic, setStatistic, from, setFrom, to, setTo, delCount, setDelCount}){

    // console.log(action)

    switch (action.type) {
      case "GET_STATISTIC":     GET_STATISTIC();    break
      case "DELETE_USER_IP":    DELETE_USER_IP();   break
      default:                                      break
    }
  
    function GET_STATISTIC(){
      const query = { GET_STATISTIC:true, from, to }
      PostToApi('/getStatistic', query, (data)=> {
        data && setStatistic(data)
      })
    }

    function DELETE_USER_IP() {
      const query = { DELETE_USER_IP:true, user:action?.user, ip:action?.ip, from, to }
      PostToApi('/getStatistic', query, (data)=> {
        data?.statistic && setStatistic(data?.statistic)
        data?.delCount && setDelCount(data?.delCount)
      })
    }

}