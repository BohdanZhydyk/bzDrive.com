const { bzDB } = require('./bzDB')


exports.getState = (req, res)=>{

  bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id:"information"} }, (infoData)=>{
    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id:"navigation"} }, (navData)=>{

      let nav = navData?.result?.nav
  
      switch(navData?.user?.role){
        case "admin":   Filter( nav, 3 );     break
        case "master":  Filter( nav, 2 );     break
        case "user":    Filter( nav, 1 );     break
        default:        Filter( nav, 0 );     break
      }
      
      function Filter(nav, lvl){
        let arr = []
        arr = nav.filter( el=> (el.lvl <= lvl) )
        res.send({
          ...navData,
          result:{
            info: infoData.result.info,
            nav: arr.map( el=> el.subnav
              ? {...el, subnav:el.subnav.filter( el=> (el.lvl <= lvl) )}
              : el
            )
          }
        })
      }

    })
  })

}