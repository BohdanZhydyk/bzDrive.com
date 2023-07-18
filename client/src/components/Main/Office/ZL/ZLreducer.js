import { PostToApi, TimeTo_YYYYMMDD, YYYYMMDD_ToWeekDay } from "../../../../AppFunctions"


export const ZLreducer = (action, callback)=>{

  let calendar = action?.calendar
  let query = action?.query

  const slideDay = 0 // plus/minus today
  const today = TimeTo_YYYYMMDD( Date.now() + (86400000 * slideDay) )

  function MinusPlusDay(act, date) {
    const year = date.toString().slice(0, 4)
    const month = date.toString().slice(4, 6)
    const day = date.toString().slice(6, 8)
  
    const currentDate = new Date(`${year}-${month}-${day}`)
    if(act === "plus") currentDate.setDate(currentDate.getDate() + 1)
    if(act === "minus") currentDate.setDate(currentDate.getDate() - 1)
  
    const previousYear = currentDate.getFullYear().toString().padStart(4, '0')
    const previousMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const previousDay = currentDate.getDate().toString().padStart(2, '0')
  
    return parseInt(`${previousYear}${previousMonth}${previousDay}`)
  }
  function FirstCalendarDate(calendar){
    return calendar[0].week[0]
  }
  function LastCalendarDate(calendar){
    return calendar[calendar.length - 1].week[calendar[calendar.length - 1].week.length - 1]
  }
  function PrevWeek(calendar){
    let prevWeek = [ MinusPlusDay("minus",FirstCalendarDate(calendar)) ]
    for(let i=0; i<6; i++) prevWeek.unshift( MinusPlusDay("minus",prevWeek[0]) )
    calendar.unshift( {orders:false, week:prevWeek} )
    return calendar
  }
  function NextWeek(calendar){
    let nextWeek = [ MinusPlusDay("plus",LastCalendarDate(calendar)) ]
    for(let i=0; i<6; i++) nextWeek.push( MinusPlusDay("plus",nextWeek[nextWeek.length - 1]) )
    calendar.push( {orders:false, week:nextWeek} )
    return calendar
  }

  function GenerateCalendar(calendar){
    
    const query = {
      mode: action?.mode,
      companyName: action?.company?.shortName,
      today: TimeTo_YYYYMMDD(Date.now()),
      firstDay: FirstCalendarDate(calendar),
      lastDay: LastCalendarDate(calendar)
    }

    ZLreducer( {type:"GET_ORDERS", query}, (data)=>{

      callback(
        calendar?.map( obj=>{

          const firstDay = obj?.week[0]
          const lastDay = obj?.week[obj?.week?.length - 1]

          function rules1(order){
            return (order?.nr?.to >= firstDay)
          }
          function rules2(order){
            return (
              ( order?.nr?.from <= lastDay ) &&
              ( (order?.nr.to >= firstDay) || (order?.status === "edit") || (order?.status === "repair") )
            )
          }

          return {
            orders: data.filter( order=> (firstDay > today) ? rules1(order) : rules2(order) ),
            week:obj?.week
          }
        })
      )
    })
  }

  switch (action.type) {
    case "GET_ORDERS":    GET_ORDERS();   break;
    case "MINUS_WEEK":    MINUS_WEEK();   break;
    case "PLUS_WEEK":     PLUS_WEEK();    break;
    case "GET_CALENDAR":  GET_CALENDAR(); break;
    default: break;
  }

  function GET_ORDERS(){
    const getOrdersQuery = {getOrders:true, query}
    PostToApi( '/getOffice', getOrdersQuery, (data)=> callback(data) )
  }

  function MINUS_WEEK(){ GenerateCalendar( PrevWeek(calendar.slice(0,-1)) ) }

  function PLUS_WEEK(){ GenerateCalendar( NextWeek(calendar.slice(1)) ) }

  function GET_CALENDAR(){

    if( calendar ){
      GenerateCalendar( calendar.map( obj=> ({orders:false, week:obj?.week}) ) )
      return
    }
    
    let week = [ today ]

    if( YYYYMMDD_ToWeekDay(week[0]) === 7 ){
      for(let i=1; i<7; i++) week.unshift( MinusPlusDay("minus",week[0]) )
    }
    else{
      while( YYYYMMDD_ToWeekDay(week[0]) > 1 ){ week.unshift( MinusPlusDay("minus",week[0]) ) }
      while( YYYYMMDD_ToWeekDay(week[week.length - 1]) < 7 ){ week.push( MinusPlusDay("plus",week[week.length - 1]) ) }
    }

    calendar = [ {orders:false, week} ]

    // calendar = PrevWeek(calendar)
    calendar = NextWeek(calendar)
    calendar = NextWeek(calendar)

    GenerateCalendar(calendar)

  }

}