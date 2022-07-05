import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

//styles & images
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {

    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <Link to='/'>
                        <img src={Temple} alt='dojo logo' />
                        <span>The DOjo</span>
                    </Link>
                </li>


                {!user && (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                )}

                {user && (
                    <li>
                        {!isPending && <button onClick={logout} className='btn'>Logout</button>}
                        {isPending && <button className='btn' disabled>Logging Out...</button>}
                    </li>
                )}

            </ul>
        </div>
    )
}
