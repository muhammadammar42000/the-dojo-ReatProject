import { useCollection } from '../../hooks/useCollection'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import { timestamp } from '../../firebase/config'

//styles
import './Create.css'


const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

export default function Create() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore('projects')
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        if (documents) {
            const options = documents.map((user) => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        if (!category) {
            setFormError('Please select a project category')
            return
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assign the Project to atleast 1 user')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }
        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList,
            category: category.value
        }


        await addDocument(project)
        if (!response.error) {
            navigate('/')
        }
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new Project</h2>
            <form onSubmit={handleSubmit}>

                <label>
                    <span>Project Name :</span>
                    <input required type='text' onChange={(e) => setName(e.target.value)} value={name} />
                </label>

                <label>
                    <span>Project Details :</span>
                    <textarea required type='text' onChange={(e) => setDetails(e.target.value)} value={details}></textarea>
                </label>

                <label>
                    <span>Set due Date :</span>
                    <input required type='date' onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                </label>

                <label>
                    <span>Project category :</span>
                    <Select options={categories} onChange={(option) => setCategory(option)} />
                </label>

                <label>
                    <span>Assign to :</span>
                    <Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti />
                </label>

                <button className='btn'>Add Project</button>

                {/* {formError && <p className='error'>{formError}</p>} */}
            </form>
        </div>
    )
}