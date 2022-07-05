import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'



//styles
import './Signup.css'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }


    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)

        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }

        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image')
            return
        }
        if (selected.size > 100000) {
            setThumbnailError('Image File size must be less than 100kb')
            return
        }

        setThumbnailError(null)

        setThumbnail(selected)
        console.log('thumbnail updated')

    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign UP</h2>

            <label>
                <span>Display Name: </span>
                <input required onChange={(e) => setDisplayName(e.target.value)} value={displayName} type='text' />
            </label>

            <label>
                <span>Email: </span>
                <input required onChange={(e) => setEmail(e.target.value)} value={email} type='email' />
            </label>

            <label>
                <span>Password: </span>
                <input required onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
            </label>

            <label>
                <span>Profile Thumbnail: </span>
                <input required type='file' onChange={handleFileChange} />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>

            {!isPending && <button className='btn'>Sign UP</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    )
}