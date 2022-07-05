import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const login = async (email, password) => {
        setIsPending(true)
        setError(false)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            //update online status
            await projectFirestore.collection('users').doc(res.user.uid).update({ online: true })

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })


            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])


    return { login, error, isPending }
}