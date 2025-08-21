import { useState } from "react"

export function useSubmitForm({url, method = "POST", onSuccess = ()=>{}}){
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

    async function handleSubmit(e){
      e.preventDefault()
      setIsLoading(true)
      const form = e.target
      const formData = new FormData(form)

      try {
        const res = await fetch(url, {
          method: method,
          headers:{
            Authorization: localStorage.getItem("jwt")
          },
          body: formData
        })
        const data = await res.json()
 console.log(url, data)
        if (data.status){
          onSuccess(data)
          setData(data)
        } else {
          setData(null)
          setError(new Error(data.message))
        }
      } catch(err){
        setError(err)
        setData(null)
      }
      setIsLoading(false)
    }

  return {isLoading, data, error, setIsLoading, setData, setError, handleSubmit}

}