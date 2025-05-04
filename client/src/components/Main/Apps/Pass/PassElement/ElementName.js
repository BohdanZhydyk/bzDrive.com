import React from "react"


export function ElementName({ props:{edit, element, i, OPEN_CLOSE}}){

  const newEl = (i === 0)

  const PassElCl = `PassEl ${newEl ? `NewEl` : ``} ${edit ? `EditEl` : ``} flex`

  const imgLink = !newEl && [
    `https://t0.gstatic.com/faviconV2`,
    `?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL`,
    `&url=${element?.link}`,
    `&size=32`
  ].join('')

  return(
    <div className={PassElCl} onClick={OPEN_CLOSE} title={element?.info}>
      <div className="PassName flex">
        {
          !newEl &&
          <span className="SiteAva flex">
            <img className="ImgBtn flex" src={imgLink} alt="siteIcon" />
          </span>
        }
        <span className="SiteName flex">{!newEl ? element?.siteName : "add new"}</span>
      </div>
    </div>
  )
}