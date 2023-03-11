import { PostToApi } from "../../../../AppFunctions"


export function TimeToObject(time){
  const year = new Date(time).getFullYear().toString().padStart(4, '0')
  const month = (new Date(time).getMonth() + 1).toString().padStart(2, '0')
  const day = new Date(time).getDate().toString().padStart(2, '0')
  return {year, month, day}
}
export function TimeTo_YYYYMMDD(time){
  const year = new Date(time).getFullYear().toString().padStart(4, '0')
  const month = (new Date(time).getMonth() + 1).toString().padStart(2, '0')
  const day = new Date(time).getDate().toString().padStart(2, '0')
  return parseInt(`${year}${month}${day}`)
}
export function TimeTo_YYYYMM(time){
  const year = new Date(time).getFullYear().toString().padStart(4, '0')
  const month = (new Date(time).getMonth() + 1).toString().padStart(2, '0')
  return parseInt(`${year}${month}`)
}
export function YYYYMMDD_ToWeekDay(date){
  const str = date.toString()
  const dateStr = new Date(`${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`)
  return dateStr.getDay() !== 0 ? dateStr.getDay() : 7
}

export function TimeToDayName(time){
}

export function TimeToWeekDay(time){
  return new Date(time).getDay() !== 0 ? new Date(time).getDay() : 7
}

export function DocNameNormalize(nr){
  return `${nr?.mode}/${nr?.from.toString().slice(0, 4)}/${nr?.from.toString().slice(4, 6)}/${nr?.sign.toString().padStart(4, '0')}`
          
}

export const ZLreducer = (action, callback)=>{

  switch (action.type) {
    case "MINUS_WEEK":    MINUS_WEEK();   break;
    case "PLUS_WEEK":     PLUS_WEEK();    break;
    case "GET_ORDERS":    GET_ORDERS();   break;
    case "GET_CALENDAR":  GET_CALENDAR(); break;
    case "SAVE_ORDER":    SAVE_ORDER();   break;
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
    PostToApi( '/getOffice', query, (data)=>{
      callback(data)
    })
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

  function SAVE_ORDER(){

    const id = action?.id
    const orderData = action?.orderData

    const query = {saveOrder:true, id, orderData}
    PostToApi( '/getOffice', query, (data)=> GET_CALENDAR() )

  }

}