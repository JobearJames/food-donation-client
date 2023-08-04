import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

const useAuth = ()=>{
    const [isChecking, setIsChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)
    const {user} =  useSelector(state=>state.auth)

    useEffect(()=>{
        if(user){
            setIsLoggedIn(true)
            if(user.isAdmin){
                setAdmin(true)
            }
        }else{
            setIsLoggedIn(false)
            setAdmin(false)
        }
        setIsChecking(false)
    }, [user, admin])

    return {isChecking, isLoggedIn, admin, user}
}
export default useAuth