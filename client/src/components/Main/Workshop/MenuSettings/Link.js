import React from "react"
import ActionBtn from "../../../All/ActionBtn"


export function Link({ props:{style, link, lvls, m, s, CHG_LINK, DEL_LINK, ADD_SUBLINK, DEL_SUBLINK} }){

  const isLink = style === "Link"

  return(
    <div className={`${style} flex start`}>
      <span className="LinkName flex start">
        <input value={link?.name} type={"text"} placeholder={"name"} onChange={(e)=>CHG_LINK("name",e,m,s)} autoComplete="off" />
      </span>
      <span className="LinkTo flex start">
        <input value={link?.to} type={"text"} placeholder={"to"} onChange={(e)=>CHG_LINK("to",e,m,s)} autoComplete="off" />
      </span>
      <span className="LinkLvl flex start">
        <select
          value={link?.lvl}
          onChange={(e) => CHG_LINK("lvl",e,m,s)}
        >
          {lvls.map((lvl, index) => (
            <option key={index} value={index}>
              {lvl}
            </option>
          ))}
        </select>
      </span>

      <span className="LinkBtns flex end">
        { isLink && !(link?.subnav?.length > 0) && <ActionBtn props={{name:"delete", click:()=>DEL_LINK(m)} } /> }
        { isLink && <ActionBtn props={{name:"plus", click:()=>ADD_SUBLINK(m)} } /> }
        { !isLink && <ActionBtn props={{name:"delete", click:()=>DEL_SUBLINK(m,s)} } /> }
      </span>

    </div>
  )
}

