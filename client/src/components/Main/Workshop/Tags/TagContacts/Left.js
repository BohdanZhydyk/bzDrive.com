import React from "react"
import Input from "../../../../All/Input"


export function Left({ props:{edit, GoogleMap, el, nr, setWorkshop, setEditingTag} }){

  const inputPropses = (link)=>{
    return {
      legend: link?.element,
      type: `text`,
      val: link?.content,
      cbVal: (val)=>{
        const newEl = {
          ...el,
          body:el?.body?.map( obj=>
            obj?.element !== "map"
            ? obj
            : {...obj, content:val}
          )
        }
        setWorkshop( (prev)=> prev?.map( (el, e)=> (e !== nr) ? el : newEl ))
        setEditingTag( prev=> newEl )
      },
      cbErr: ()=>{}
    }
  }

  return(        
    <div className="el-L flex column">
    {
      edit &&
      <div className="GoogleMapsInput flex">
      {
        GoogleMap.map( (link, l)=>{
          return <Input props={inputPropses(link)} key={`GoogleMaps${nr}${l}`} />
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