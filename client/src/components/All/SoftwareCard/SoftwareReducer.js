import { bzDeleteFile, bzDeleteFolder, PostToApi } from "../../../AppFunctions"

export function SoftwareReducer(
  {
    action, initialState, setInitialState, setBrands, setModels, soft, setSoft,
    setEdit, setSave, navigate, isLine, setIsLine, setEditErr
  }
){

  const { id, lang, car, brand, model } = action

  switch (action?.type) {
    case "GET_CAR_CARDS":             GET_CAR_CARDS();            break
    case "GET_CAR_CARD":              GET_CAR_CARD();             break
    case "SELECT_BRAND":              SELECT_BRAND();             break
    case "SELECT_MODEL":              SELECT_MODEL();             break
    case "BACK_TO_BRANDS":            BACK_TO_BRANDS();           break
    case "DELETE_STICKER":            DELETE_STICKER();           break
    case "DELETE_SOFT":               DELETE_SOFT();              break
    case "DELETE_SOFTWARE_FOLDER":    DELETE_SOFTWARE_FOLDER();   break
    // case "SAVE_CARD":                 SAVE_CARD();                break
    // case "BUY_SOFTWARE":              BUY_SOFTWARE();             break
    default:                                                      break
  }

  function GET_CAR_CARDS(){
    const query = {getCarCards:true}
    PostToApi( '/getStore', query, (data)=>{
      if(data?.length > 0){
        setInitialState( prev=> data )
        setBrands( prev=> sortByBrands(data) )
      }
    })
  }

  function GET_CAR_CARD(){
    if(id === "new"){ setSoft( prev=>({}) ) }
    else{
      const query = {getCarCards:true, id, lang}
      PostToApi( '/getStore', query, (data)=>{
        setSoft( prev=> data )
      })
    }
  }

  function SELECT_BRAND(){
    setModels( sortByModels(initialState, brand) )
    setSoft( initialState.filter( item=> item.brand === brand ) )
  }

  function SELECT_MODEL(){
    setSoft( initialState.filter( item=> item.model === model ) )
  }

  function BACK_TO_BRANDS(){
    setModels(false)
    setSoft(false)
  }

  function DELETE_STICKER(){
    const swID = action?.swID
    const fileAddr = action?.fileAddr
    const fileName = action?.fileName
    bzDeleteFile(fileAddr, fileName, (data)=>{
      if(data?.status === 200){
        setSoft(prev=> prev.map( el=> (el?.id !== swID) ? el : {...el, ECUsticker:false} ))
        setSave(prev=> true)
      }
    })
  }

  function DELETE_SOFT(){
    const swID = action?.swID
    const fileID = action?.fileID
    const fileAddr = action?.fileAddr
    const fileName = action?.fileName
    bzDeleteFile(fileAddr, fileName, (data)=>{
      if(data?.status === 200){
        setSoft(prev=> prev.map( el=> (el?.id !== swID)
          ? el
          : { ...el, files: el?.files.filter( file=> (file?.fileID !== fileID) ) }
        ))
        setSave(prev=> true)
      }
    })
  }

  function DELETE_SOFTWARE_FOLDER(){
    const swID = action?.swID
    const folderAddr = action?.folderAddr
    bzDeleteFolder(folderAddr, (data)=>{
      if(data?.status === 200){
        setSoft(prev=> prev.filter( el=> el?.id !== swID ))
        setSave(prev=> true)
      }
    })
  }

  // function SAVE_CARD(){
  //   const isNew = !car?._id
  //   const query = {saveCarCard:true, car}
  //   setSoft(null)
  //   PostToApi( '/getStore', query, (data)=>{
  //     if(isNew){
  //       navigate(`/softpage/${data}`)
  //       setEdit(false)
  //       setSave(false)
  //       setEditErr({})
  //     }
  //     else{
  //       data && setSoft( prev=> data )
  //       setEdit(false)
  //       setSave(false)
  //       setEditErr({})
  //     }
  //   })
  // }

  // function BUY_SOFTWARE() {
  //   const query = { buySoftware:true, id, lang, price: 100 } // Cena do testów, w groszach
  //   PostToApi('/getStore', query, (data)=> {
  //     if(data){ window.location.href = data } // Przekierowanie do PayU
  //   })
  // }

}

export const programmers = ["Xhorse Multi-Prog", "Alientech K-Tag", "Alientech Kess V2", "i-Prog", "CarProg", "AutoTuner", "FoxFlash", "BDM 100", "X-Prog"]
export const swTypes =  ["FULL", "EPR", "FLS", "MAPS", "MPC", "EEPROM", "INT-EEPROM", "EXT-EEPROM", "FLASH", "INT-FLASH", "EXT-FLASH", "BOOT", "STATUS", "SHADOW"]
export const readMethods = ["Bench", "OBD-II", "BDM", "CAN", "K-Line", "Bootmode", "JTAG", "Virtual Read"]
export const modTypes = [
  "Original", "Virgin", "Tuning Stage", "Tuning Stage-1", "Tuning Stage-2", "Tuning Stage-3", "IMMO off",
  "ECO off", "EGR off", "DPF off", "FAP off", "SCR off", "AdBlue off", "KAT off", "DTC off", "Vmax off",
  "MAF off", "Start/Stop off", "Flap off", "Limiter ON"
]

export function brandIco(brand){ return `https://bzdrive.com/files/CarIcons/${brand?.replace(/[^a-zA-Z]/g, '').toLowerCase()}.svg` }

export function sortByBrands(state) {
  const brandCounts = state.reduce((acc, car) => {
    const brandIndex = acc.findIndex(item => item.brand === car.brand)
    if(brandIndex >= 0) { acc[brandIndex].count += 1 }
    else{ acc.push({ brand: car.brand, count: 1 }) }
    return acc
  }, [])
  return brandCounts.sort((a, b) => a.brand.localeCompare(b.brand))
}

export function sortByModels(state, checkedBrand) {
  const combinedModels = state
    .filter(model => model?.brand === checkedBrand)
    .reduce((acc, model) => {
      const existingModelIndex = acc.findIndex(item => item.model === model.model)
      if (existingModelIndex >= 0) { acc[existingModelIndex].count += 1 }
      else { acc.push({ brand: model.brand, model: model.model, count: 1 }) }
      return acc
    }, [])
  return combinedModels.sort((a, b) => a.model.localeCompare(b.model))
}

export function getFileLinkAddr(nr, id){
  const YYYY = nr?.from ? nr?.from.toString().slice(0, 4) : ""
  const MM = nr?.from ? nr?.from.toString().slice(4, 6) : ""
  const sign = nr?.from ? nr?.sign.toString().padStart(4, '0') : ""
  return {
    link: 'https://bzdrive.com',
    defaultFileAddr: `files/DOC/${nr?.mode}_${YYYY}_${MM}_${sign}/software-${id}`
  }
}