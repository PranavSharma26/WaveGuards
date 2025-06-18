import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { backendURL } from '../../utils/getBackendURL.js'
import toast from 'react-hot-toast'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [userLoading, setUserLoading] = useState(true)

	const loginUser = (userData) => {
		setUser(userData)
	}

	const logoutUser = async ()=>{
		try {
			const res = await axios.post(`${backendURL}/api/logout`,{}, {withCredentials: true}) 
			setUser(null)
			toast.success("Logged Out")
		} catch (error) {
			toast.error("Error in Log out")
		}
	}

	useEffect(()=>{
		const fetchUser=async()=>{
			try {
				const res = await axios.get(`${backendURL}/api/me`, {withCredentials: true})
				const userData = {...res.data.data, role: res.data.role}
				setUser(userData)
			} catch (error) {
				console.log("Please Log In")
				setUser(null)
			}
			finally{
				setUserLoading(false)
			}
		}
		fetchUser()
	},[])

  return <UserContext.Provider 
			value={{ user, userLoading, loginUser, logoutUser }}>
			{children}
		</UserContext.Provider>;
};

export const userAuth = () => useContext(UserContext)