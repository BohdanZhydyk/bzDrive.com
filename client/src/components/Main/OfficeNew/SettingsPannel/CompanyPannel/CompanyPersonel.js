import React from "react"


export function CompanyPersonel({ props:{company} }){

  const directors = company?.personnel?.directors
  const accountants = company?.personnel?.accountants
  const workers = company?.personnel?.workers

  return(
    <div className="CompanyPersonel flex column start">

      <div className="CompanyPersonelLine flex column start">
        <span className="Title flex start">Wlasciciele: </span>
        <div className="Value flex start wrap">
        {
          directors && directors.map( (person, p)=>{
            return <div className="Person txtYlw flex" key={`Directors${p}`}>{`${person?.login}`}</div>
          })
        }
        </div>
      </div>
      
      <div className="CompanyPersonelLine flex column start">
        <span className="Title flex start">Ksiegowe: </span>
        <div className="Value flex start wrap">
        {
          workers && accountants.map( (person, p)=>{
            return <div className="Person txtYlw flex" key={`Accountants${p}`}>{`${person?.login}`}</div>
          })
        }
        </div>
      </div>
      
      <div className="CompanyPersonelLine flex column start">
        <span className="Title flex start">Pracownicy: </span>
        <div className="Value flex start wrap">
        {
          workers && workers.map( (person, p)=>{
            return <div className="Person txtYlw flex" key={`Workers${p}`}>{`${person?.login}`}</div>
          })
        }
        </div>
      </div>

    </div>
  )
}