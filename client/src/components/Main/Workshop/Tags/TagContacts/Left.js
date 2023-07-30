import React from "react"
import Input from "../../../../All/Input"


export function Left({ props:{editMode, GoogleMap, i, setWorkshop} }){

  const inputPropses = (link)=>{
    return {
      legend: link?.element,
      type: `text`,
      val: link?.content,
      cbVal: (val)=>{
        setWorkshop( (prev)=> prev?.map( (el, e)=> e !== i
          ? el
          : {...el, body:el?.body?.map( obj=> obj?.element !== "map" ? obj : {...obj, content:val}) }
        ))
      },
      cbErr: ()=>{}
    }
  }

  return(        
    <div className="el-L flex column">
    {
      editMode &&
      <div className="GoogleMapsInput flex">
      {
        GoogleMap.map( (link, l)=>{
          return <Input props={inputPropses(link)} key={`GoogleMaps${i}${l}`} />
        })
      }
      </div>
    }
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