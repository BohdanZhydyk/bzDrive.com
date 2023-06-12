import { sanitizeTxt } from "./../../../../../AppFunctions"


export const siteNameProps = (element, setElement, setSave)=>({
  legend: `siteName`,
  type: `text`,
  val: element?.siteName ? sanitizeTxt(element.siteName, `default`).sanText : '',
  cbVal: (val)=>{
    setElement( (prev)=> ({...prev, siteName:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: ()=>{}
})

export const linkProps = (element, setElement, setSave)=>({
  legend: `link`,
  type: `text`,
  val: element?.link ? sanitizeTxt(element.link, `default`).sanText : '',
  cbVal: (val)=>{
    setElement( (prev)=> ({...prev, link:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: ()=>{}
})

export const infoProps = (element, setElement, setSave)=>({
  plhol:"add information about site...",
  val: element?.info ? sanitizeTxt(element.info, `default`).sanText : '',
  cbVal: (val)=>{
    setElement( (prev)=> ({...prev, info:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: ()=>{}
})

export const userNameProps = (line, l, setElement, setSave)=>({
  legend: `userName`,
  type: `text`,
  val: line?.userName ? sanitizeTxt(line.userName, `default`).sanText : '',
  cbVal: (val)=>{
    setElement( (prev)=> ({
      ...prev,
      siteData: prev?.siteData.map( (el, n)=>{
        return n === l ? {...el, userName:sanitizeTxt(val, `default`).sanText} : el
      })
    }))
    setSave(true)
  },
  cbErr: ()=>{}
})

export const loginProps = (line, l, setElement, setSave)=>({
  legend: `login`,
  type: `text`,
  val: line?.login ? sanitizeTxt(line.login, `default`).sanText : '',
  cbVal: (val)=>{
    setElement( (prev)=> ({
      ...prev,
      siteData: prev?.siteData.map( (el, n)=>{
        return n === l ? {...el, login:sanitizeTxt(val, `default`).sanText} : el
      })
    }))
    setSave(true)
  },
  cbErr: ()=>{}
})

export const encryptedPassProps = (line, l, setElement, setSave)=>({
  legend: `cryptedData`,
  type: `text`,
  val: line?.pass ? sanitizeTxt(line.pass, `default`).sanText : '',
  cbVal: (val)=>{
    setElement( (prev)=> ({
      ...prev,
      siteData: prev?.siteData.map( (el, n)=>{
        return n === l ? {...el, pass:sanitizeTxt(val, `default`).sanText} : el
      })
    }))
    setSave(true)
  },
  cbErr: ()=>{}
})

export const cryptedPassProps = ()=>({
  legend: `cryptedData`,
  type: `password`,
  val: `**********`,
  cbVal: ()=>{},
  cbErr: ()=>{}
})

export const searchProps = (txt, setTxt, SORT_PASS)=>({
  legend: `siteName includes`,
  type: `text`,
  val: txt ? sanitizeTxt(txt, `default`).sanText : '',
  cbVal: (val)=>{
    setTxt( sanitizeTxt(val, `default`).sanText )
    SORT_PASS( sanitizeTxt(val, `default`).sanText )
  },
  cbErr: ()=>{}
})

export const groupsProps = (element, setElement, groupsForInput, setSave)=>({
  legend: `group`,
  type: `text`,
  groups: groupsForInput,
  val: element?.group ? sanitizeTxt(element.group, `default`).sanText : '',
  cbVal: (val)=>{
    setElement( (prev)=> ({...prev, group:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: ()=>{}
})