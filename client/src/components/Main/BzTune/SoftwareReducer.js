import { bzDeleteFolder, PostToApi } from "../../../AppFunctions";

export function SoftwareReducer(
  {action, initialState, setInitialState, setSoftware, soft, setSoft, car, setCar, doc, setDoc}
){
  
  const { id, brand } = action

  switch (action?.type) {
    case "GET_CAR_CARDS":         GET_CAR_CARDS();          break
    case "SELECT_BRAND":          SELECT_BRAND();           break
    case "GET_CAR_CARD":          GET_CAR_CARD();           break
    // case "CANCEL_EDITING_CARD":   CANCEL_EDITING_CARD();    break
    // case "SAVE_CARD":             SAVE_CARD();              break
    // case "BUY_SOFTWARE":          BUY_SOFTWARE();           break
    default:                                                break
  }

  function GET_CAR_CARDS(){
    function sortByBrands(state) {
      const brandCounts = state.reduce((acc, car) => {
        const brandIndex = acc.findIndex(item => item.brand === car.brand)
        if(brandIndex >= 0) { acc[brandIndex].count += 1 }
        else{ acc.push({ brand: car.brand, count: 1 }) }
        return acc
      }, [])
      return brandCounts.sort((a, b) => a.brand.localeCompare(b.brand))
    }
    const query = {getCarCards:true}
    PostToApi( '/getSoftware', query, (data)=>{
      if(data?.length > 0){
        setInitialState( prev=> data )
        setSoftware( prev=> sortByBrands(data) )
      }
    })
  }

  // function GET_CAR_CARDS() {
  //   function sortByBrands(state) {
  //     const brandCounts = state.reduce((acc, car) => {
  //       const brandIndex = acc.findIndex(item => item.brand === car.brand);
        
  //       if (brandIndex >= 0) {
  //         // Jeśli marka istnieje, dodajemy samochód do tej marki
  //         acc[brandIndex].count += 1;
  //         // Posortuj modele po dodaniu samochodu
  //         acc[brandIndex].models = acc[brandIndex].models || [];
  //         acc[brandIndex].models.push(car.model);
  //         acc[brandIndex].models.sort(); // Sortowanie modeli wewnątrz marki
  //       } else {
  //         // Jeśli marka nie istnieje, tworzysz nową kategorię
  //         acc.push({ brand: car.brand, count: 1, models: [car.model] });
  //       }
  
  //       return acc;
  //     }, []);
  
  //     // Posortowanie marek
  //     return brandCounts.sort((a, b) => a.brand.localeCompare(b.brand));
  //   }
  
  //   const query = { getCarCards: true };
    
  //   PostToApi('/getSoftware', query, (data) => {
  //     if (data?.length > 0) {
  //       setInitialState(prev => data);
  //       setSoftware(prev => sortByBrands(data));
  //     }
  //   });
  // }
  

  function SELECT_BRAND(){
    const clearEl = (el)=> ( {brand:el?.brand, count:el?.count} )
    const wholeEl = (el)=> ( {...el, cars:initialState.filter(el=> el?.brand === brand)} )
    setSoftware( prev=> prev.map( el=> (el?.brand !== brand) ? el : ( el?.cars ? clearEl(el) : wholeEl(el) ) ))
  }

  function GET_CAR_CARD(){
    if(id === "new"){ setSoft( prev=>({}) ) }
    else{
      const query = {getCarCards:true, id}
      PostToApi( '/getSoftware', query, (data)=>{
        setSoft( prev=> data?.soft )
        setCar(prev=> data?.car)
        setDoc(prev=> data?.doc)
      })
    }
  }

  // function CANCEL_EDITING_CARD(){ setEdit(prev=>!prev) }

  // function SAVE_CARD(){
  //   const isNew = !car?._id
  //   const query = {saveCarCard:true, car}
  //   setCar(null)
  //   PostToApi( '/getSoftware', query, (data)=>{
  //     if(isNew){
  //       navigate(`/softpage/${data}`)
  //       setEdit(false)
  //       setSave(false)
  //       setEditErr({})
  //     }
  //     else{
  //       data && setCar( prev=> data )
  //       setEdit(false)
  //       setSave(false)
  //       setEditErr({})
  //     }
  //   })
  // }

  // function BUY_SOFTWARE() {
  //   const host = window.location.host
  //   const query = { buySoftware:true, id, lang, host, price: 100 } // Cena do testów, w groszach
  //   PostToApi('/getSoftware', query, (data)=> {
  //     if(data){ window.location.href = data } // Przekierowanie do PayU
  //   })
  // }

}

export const programmers = ["Xhorse Multi-Prog", "Alientech Kess V2", "Alientech K-Tag", "BDM 100", "X-Prog", "i-Prog", "CarProg"]
export const swTypes =  ["FULL", "EPR", "FLS", "MPC", "BOOT"]
export const readMethods = ["Bench", "OBD-II", "BDM", "CAN", "K-Line", "Bootmode", "JTAG", "Virtual Read"]
export const modTypes = [
  "Original", "Tuning Stage-1", "Tuning Stage-2", "Tuning Stage-3",
  "ECO off", "DPF off", "EGR off", "AdBlue off", "KAT off", "Vmax off", "MAF off", "Start/Stop off"
]

export function brandIco(brand){ return `https://bzdrive.com/files/CarIcons/${brand?.replace(/[^a-zA-Z]/g, '').toLowerCase()}.svg` }