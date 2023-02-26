import React, { useState } from "react"

import SiteIcon from "./../All/SiteIcon";
import { ColorSiteName } from "../All/ColorName/ColorSiteName"

export function SiteName({ props: {info, blur, BLUR} }) {

  const [isAnimating, setIsAnimating] = useState(true)

  let cl = `Name flex bold ${isAnimating ? "animate" : ""}`

  const link = info?.link

  return (
    <div className={`SiteName flex start ${blur ? `blur` : ``}`}>

      <div className="ImgBtn flex">
        <SiteIcon props={{speed:4}} />
      </div>

      <div className={cl} onAnimationEnd={() => setIsAnimating(false)} >
        <ColorSiteName props={{link}} />
      </div>

    </div>
  );
}