import React from "react"


export function FinMonthSection({ props:{newMonth, edit, editDocs, setEditDocs} }){
  return(
    <div className="FinMonthSection flex column start">

      <div className="FinWarning flex column">

        {
          editDocs
          ?
          <span className="WarningLine txtOrg bold flex start">{`- Informacja na podstawie documentow!`}</span>
          :
          <>
          {
            newMonth
            ? <span className="WarningLine txtOrg bold flex start">{`- Informacji o tym miesiacu rozliczeniowym nie ma w bazie danych!`}</span>
            : <span className="WarningLine txtOrg bold flex start">{`- Informacja na podstawie bazy danych!`}</span>
          }
          </>
        }

        {
          edit &&
          <span className="WarningLine txtGry flex start">{`Wnies odpowiednie dane z Ksiegi Przychodow i Rozchodow i wcisnij przycisk "zapisać"...`}</span>
        }

      </div>

      <div className="ShowDocsBtn flex" onClick={()=>setEditDocs(!editDocs)}>
        {`Pokazać dokumenty za bieżący miesiąc`}
      </div>

    </div>
  )
}