import {  useState } from "react"

const Preloader = () => {
    const [loader, setLoader] = useState<boolean | number>(11)
    const [bg, setBg] = useState('border-primary')
   
        window.onload = () => {
            setLoader(false)
            setLoader(-11)
            setBg('border-none')
        }


  return (
    <div className={`flex bg-white fixed top-0 bottom-0 left-0 right-0 items-center justify-center min-h-screen`} style={{zIndex: `${loader}`}}>
        <div className={`w-14 h-14 rounded-full border ${bg} border-l-white animate-spin`}></div>
    </div>
  )
}

export default Preloader;