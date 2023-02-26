import React from "react"


export function Left({ props:{GoogleMap} }){
  return(        
    <div className="el-L flex">
    {
      GoogleMap.map( (el, i)=>{
        return(
          <iframe
            className="boxShadow"
            key={`ContactsMap${i}`}
            src={el.content}
            title={el.title}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        )
      })
    }
    </div>
  )
}