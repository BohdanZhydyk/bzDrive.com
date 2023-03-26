import React from "react"
import ActionBtn from "../../../../All/ActionBtn"


export function FinMonthDocs({ props:{documents, editDocs, setEditDocs} }){

  const docTop = {
    cl:`FinDoscLineTop txtOrg bold`,
    num:`Lp.`,
    nam:`Faktura Nr`,
    inf:`Informacja`,
    net:`Kwota netto, zł`,
    bru:`Wartość brutto, zł`,
    btn:<ActionBtn props={{name:`cancel`, click:()=>setEditDocs(!editDocs)}} />
  }

  const docLine = (doc, d)=>{
    return {
      num:`${d}.`,
      nam:`doc Nr`,
      inf:`info`,
      net:`0.00`,
      bru:`0.00`,
      btn:<ActionBtn props={{name:`edit`, click:()=>{}}} />
    }
  }

  return(
    <div className="FinMonthDocs flex column">
    {
      documents && [docTop, ...documents].map( (doc, d)=>{
        return(
          <div className={`FinDoscLine ${doc?.cl} flex stretch`}>
            <div className="FinNum flex">{doc?.num ?? docLine(doc, d).num}</div>
            <div className="FinNam flex start">{doc?.nam ?? docLine(doc, d).nam}</div>
            <div className="FinInf flex start">{doc?.inf ?? docLine(doc, d).inf}</div>
            <div className="FinNet flex end">{doc?.net ?? docLine(doc, d).net}</div>
            <div className="FinBru flex end">{doc?.bru ?? docLine(doc, d).bru}</div>
            <div className="FinBtn flex end">{doc?.btn ?? docLine(doc, d).btn}</div>
          </div>
        )
      })
    }
    </div>
  )
}