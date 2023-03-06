import React from "react"

import Input from "../../../All/Input"


export function ElInfo({ props:{mode, car, setCar, buyer, setBuyer, setSave} }) {

  const CarInfoProps = [
    {
      legend: "brand", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.brand ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, brand:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "model", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.model ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, model:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "numbers", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.numbers ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, numbers:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "vin", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.vin ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, vin:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "engine", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.engine ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, engine:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "prod", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.prod ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, prod:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "fuel", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.fuel ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, fuel:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "odo", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.odo ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, odo:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "agree", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: car?.agree ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setCar( (prev) => ({...prev, agree:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    }
  ]

  const CompanyInfoProps = [
    {
      legend: "name", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.name ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, name:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "nip", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.nip ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, nip:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "account", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.account ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, account:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "zip", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.addr?.zip ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, addr:{...prev?.addr, zip:val}}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "town", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.addr?.town ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, addr:{...prev?.addr, town:val}}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "street", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.addr?.street ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, addr:{...prev?.addr, street:val}}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "tel", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.contacts?.tel ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, contacts:{...prev?.contacts, tel:val}}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "www", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.contacts?.www ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, contacts:{...prev?.contacts, www:val}}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "email", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: buyer?.contacts?.email ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setBuyer( (prev) => ({...prev, contacts:{...prev?.contacts, email:val}}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    }
  ]

  return(
    <div className="ElInfo flex between stretch wrap">

      {
        mode === "ZL" &&
        <div className="InfoPannel flex column start">

          <div className="InfoPannelTop bold flex start">CarInfo</div>

          <div className="InputsPannel flex start wrap">
          {
            CarInfoProps.map( (input, i)=>{
              return(
                <div className={`Input_${input?.legend}`} key={`Input_${input?.legend}${i}`}>
                  <Input props={ input }/>
                </div>
              )
            })
          }
          </div>
          
        </div>
      }
      {
        mode === "ZL" &&
        <div className="InfoPannel flex column start">

          <div className="InfoPannelTop bold flex start">BuyerInfo</div>

          <div className="InputsPannel flex start wrap">
          {
            CompanyInfoProps.map( (input, i)=>{
              return(
                <div className={`Input_${input?.legend}`} key={`Input_${input?.legend}${i}`}>
                  <Input props={ input }/>
                </div>
              )
            })
          }
          </div>

        </div>
      }

    </div>
  )
}