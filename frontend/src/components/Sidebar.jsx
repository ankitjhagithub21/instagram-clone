import { GoHome, GoSearch, GoMail, GoHeart, GoUpload, GoPerson } from 'react-icons/go'
import { CiLogout} from "react-icons/ci"
const Sidebar = ({handleLogout}) => {
    const links = [
        {
            id: 1,
            name: "Home",
            icon: <GoHome />
        },
        {
            id: 2,
            name: "Search",
            icon: <GoSearch />
        },
        {
            id: 3,
            name: "Messages",
            icon: <GoMail />
        },
        {
            id: 4,
            name: "Notifications",
            icon: <GoHeart />
        },
        {
            id: 5,
            name: "Create",
            icon: <GoUpload />
        },
        {
            id: 6,
            name: "Profile",
            icon: <GoPerson />
        },

    ]
    return (
        <div className='md:w-[25%] w-fit h-full bg-gray-100 flex flex-col p-5  justify-center'>
            <h1 className="text-2xl font-bold font-serif hidden md:block mb-20">
                Instagram
            </h1>
            <div>
                {
                    links.map((link) => {
                        return <div key={link.id} className='flex items-center p-3 rounded-lg hover:bg-gray-200 cursor-pointer gap-2'>
                            <div className='text-2xl'>
                                {link.icon}
                            </div>
                            <span className='text-xl md:block hidden '>{link.name}</span>
                        </div>
                    })
                }
            </div>
            <div className='flex mt-20 p-3 rouned-lg gap-2' onClick={handleLogout}>
                <div className='text-2xl'>
                    <CiLogout />
                </div>
                <span className='text-xl md:block hidden '>Logout</span>
            </div>
        </div>

    )
}

export default Sidebar
