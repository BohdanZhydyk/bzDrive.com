import { PostToApi } from "../../../AppFunctions"


export function StoreReducer(store, setStore, cart, setCart, user, action){

  const isAdmin = user?.role === "admin"

  const {type, query, setMyCart, ID, open} = action

  const newArt = {"ID": "new"}

  switch (type) {
    case "GET_STORE":     SET_STORE_AND_CART();   break;
    case "ADD_TO_CART":   SET_STORE_AND_CART();   break;
    case "SAVE_ART":      SET_STORE_AND_CART();   break;
    case "SHOW_ART":      SHOW_ART();             break;
    case "GET_CART":      GET_CART();             break;
    default: break;
  }

  function SET_STORE_AND_CART(){
    PostToApi( '/getStore', query, (data)=>{
      setStore( prev=> isAdmin ? [newArt, ...data?.articles] : data?.articles )
      setCart( prev=> data?.cart )
    })
  }

  function SHOW_ART(){console.log(open)
    setStore(prev=> prev?.map( (art, id)=>({...art, show:(art?.ID === ID) ? open : false}) ))
  }

  function GET_CART(){
    PostToApi( '/getStore', query, (data)=>{
      setMyCart(prev=>data)
    })
  }

}