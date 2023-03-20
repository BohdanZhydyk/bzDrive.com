import { PostToApi, TimeToWeekDay } from "../../../../AppFunctions"


export const ZLreducer = (action, callback)=>{

  switch (action.type) {
    case "MINUS_WEEK":    MINUS_WEEK();   break;
    case "PLUS_WEEK":     PLUS_WEEK();    break;
    case "GET_ORDERS":    GET_ORDERS();   break;
    case "GET_CALENDAR":  GET_CALENDAR(); break;
    case "SAVE_DOC":      SAVE_DOC();     break;
    default: break;
  }

  function MinusDay(week){ return week.unshift( week[0] - 86400000 ) }
  function PlusDay(week){ return week.push( week[week.length - 1] + 86400000 ) }
  function MinusWeek(calendar){
    let prevWeek = [ calendar[0].week[0] - 86400000 ]
    for(let i=0; i<6; i++) MinusDay(prevWeek)
    calendar.unshift( {orders:false, week:prevWeek} )
    return calendar
  }
  function PlusWeek(calendar){
    let nextWeek = [ calendar[calendar.length - 1].week[calendar[calendar.length - 1].week.length - 1] + 86400000 ]
    for(let i=0; i<6; i++) PlusDay(nextWeek)
    calendar.push( {orders:false, week:nextWeek} )
    return calendar
  }

  function MINUS_WEEK(){ callback( MinusWeek(action?.calendar.slice(0,-1)) ) }

  function PLUS_WEEK(){ callback( PlusWeek(action?.calendar.slice(1)) ) }

  function GET_ORDERS(){
    const query = {getOrders:true, query:action?.query}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

  function GET_CALENDAR(){

    const slideDay = 0 // plus/minus today
    const today = Date.now() + (86400000 * slideDay)
    
    let week = [ today ]

    if( TimeToWeekDay(week[0]) === 7 ){
      for(let i=1; i<7; i++) MinusDay(week)
    }
    else{
      while( TimeToWeekDay(week[0]) > 1 ) MinusDay(week)
      while( TimeToWeekDay(week[week.length - 1]) < 7 ) PlusDay(week)
    }

    let calendar = [ {orders:false, week} ]

    // calendar = MinusWeek(calendar)
    calendar = PlusWeek(calendar)
    calendar = PlusWeek(calendar)
    
    callback(calendar)

  }

  function SAVE_DOC(){

    const id = action?.id
    const docData = action?.docData

    const query = {saveDoc:true, id, docData}
    PostToApi( '/getOffice', query, (data)=> GET_CALENDAR() )

  }

}