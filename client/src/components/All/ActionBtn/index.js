import React from "react"


function ActionBtn({ props:{name, click} }){

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
      case "delete":      return `${link}icoDelete.png`
      default:            break
    }
  }

  return(
    <img className="ImgBtn" src={ ImgName() } onClick={click} alt={name} />
  )
}

export default ActionBtn