import React from "react"

import { GetUser } from "../../../AppFunctions"
import { tr } from "../../../AppTranslate"


function ActionBtn({ props:{name, click} }){

  const lang = GetUser().lang
  const link = `https://bzdrive.com/files/ico/`

  const ImgName = ()=>{
    switch (name) {
      case "empty":       return `${link}icoEmpty.png`
      case "check":       return `${link}icoCheck.png`
      case "save":        return `${link}icoSave.png`
      case "edit":        return `${link}icoEdit.png`
      case "print":       return `${link}icoPrint.png`
      case "settings":    return `${link}icoSettings.png`
      case "cancel":      return `${link}icoCancel.png`
      case "plus":        return `${link}icoPlus.png`
      case "delete":      return `${link}icoDelete.png`
      case "upload":      return `${link}icoUpload.png`
      case "download":    return `${link}icoDownload.png`
      case "show":        return `${link}icoShow.png`
      case "hide":        return `${link}icoHide.png`
      case "search":      return `${link}icoSearch.png`
      case "erase":      return `${link}icoErase.png`
      case "link":        return `${link}newTab.png`
      default:            break
    }
  }

  return(
    <img
      className="ImgBtn"
      src={ ImgName() }
      title={ tr(`ImgBtn_${name}`,lang) }
      onClick={click} alt={name}
    />
  )
}

export default ActionBtn