import { sanitizeTxt } from "../../../../AppFunctions";

export let docDateProps = ({job, setJob, setIsSaveJob})=>({
  legend:"Data", val:job?.date,
  onChange:(val)=>{
    setJob(prev=> ({...prev, date:val}))
    setIsSaveJob(prev=>true)
  }
})

export let docTimeFromProps = ({job, setJob, setIsSaveJob})=>({
  legend:"Od", val:job?.time?.from,
  onChange:(val)=>{
    setJob(prev=> ({ ...prev, time:{...prev?.time, from:val} }))
    setIsSaveJob(prev=>true)
  }
})

export let docTimeToProps = ({job, setJob, setIsSaveJob})=>({
  legend:"Do", val:job?.time?.to,
  onChange:(val)=>{
    setJob(prev=> ({ ...prev, time:{...prev?.time, to:val} }))
    setIsSaveJob(prev=>true)
  }
})

export let docTasksProps = ({job, setJob, setIsSaveJob})=>({
  legend:"Zadanaia do wykonania", val:job?.tasks,
  onChange:(val)=>{
    setJob(prev=> ({...prev, tasks:val}))
    setIsSaveJob(prev=>true)
  }
})

export let docPriceProps = ({job, setJob, setIsSaveJob})=>({
  legend:"Cena", val:job?.price,
  onChange:(val)=>{
    setJob(prev=> ({...prev, price:val}))
    setIsSaveJob(prev=>true)
  }
})


export let docLines = ({job, setJob, setIsSaveJob})=>{ return [
  [
    {
      st:"InputShortName", props:{
        legend:"Nazwa", val:sanitizeTxt(job?.client?.shortName, "CompanyNameShort")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, shortName:sanitizeTxt(val, "CompanyNameShort")?.sanText}}))
          setIsSaveJob(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputName", props:{
        legend:"Pełna Nazwa", val:sanitizeTxt(job?.client?.name, "CompanyName")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, name:sanitizeTxt(val, "CompanyName")?.sanText}}))
          setIsSaveJob(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputZIP", props:{
        legend:"Kod", val:sanitizeTxt(job?.client?.addr?.zip, "ZIP")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, addr:{...prev?.client?.addr, zip:sanitizeTxt(val, "ZIP")?.sanText}}}))
          setIsSaveJob(prev=>true)
        }
      }
    },
    {
      st:"InputTown", props:{
        legend:"Miejscowość", val:sanitizeTxt(job?.client?.addr?.town, "town")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, addr:{...prev?.client?.addr, town:sanitizeTxt(val, "town")?.sanText}}}))
          setIsSaveJob(prev=>true)
        }
      }
    },
    {
      st:"InputStreet", props:{
        legend:"Ulica", val:sanitizeTxt(job?.client?.addr?.street, "StreetName")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, addr:{...prev?.client?.addr, street:sanitizeTxt(val, "StreetName")?.sanText}}}))
          setIsSaveJob(prev=>true)
        }
      }
    },
    {
      st:"InputNr", props:{
        legend:"Nr", val:sanitizeTxt(job?.client?.addr?.nr, "default")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, addr:{...prev?.client?.addr, nr:sanitizeTxt(val, "default")?.sanText}}}))
          setIsSaveJob(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputNIP", props:{
        legend:"NIP", val:sanitizeTxt(job?.client?.nip, "NIP")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, nip:sanitizeTxt(val, "NIP")?.sanText}}))
          setIsSaveJob(prev=>true)
        }
      }
    },
    {
      st:"InputTel", props:{
        legend:"Telefon", val:sanitizeTxt(job?.client?.contacts?.tel, "tel")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, contacts:{...prev?.client?.contacts, tel:sanitizeTxt(val, "tel")?.sanText}}}))
          setIsSaveJob(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputWWW", props:{
        legend:"WWW", val:sanitizeTxt(job?.client?.contacts?.www, "www")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, contacts:{...prev?.client?.contacts, www:sanitizeTxt(val, "www")?.sanText}}}))
          setIsSaveJob(prev=>true)
        }
      }
    },
    {
      st:"InputEmail", props:{
        legend:"Email", val:sanitizeTxt(job?.client?.contacts?.email, "email")?.sanText,
        onChange:(val)=>{
          setJob(prev=> ({...prev, client:{...prev?.client, contacts:{...prev?.client?.contacts, email:sanitizeTxt(val, "email")?.sanText}}}))
          setIsSaveJob(prev=>true)
        }
      }
    }
  ]
]}