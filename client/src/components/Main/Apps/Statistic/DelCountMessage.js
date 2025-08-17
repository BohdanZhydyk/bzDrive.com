import React from "react"


export function DelCountMessage({ props:{delMsg} }) {
  return (
    <div className="DelCountMessage flex column">
      <div>{`Usunęto: ${delMsg?.count} rekordów`}</div>
      <div>{`User: ${delMsg?.user}`}</div>
      <div>{`IP: ${delMsg?.ip}`}</div>
    </div>
  )
}
