import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useFolderDataById } from '../hooks/useFolderData';


function NotesBar() {
    const navigate = useNavigate()
    const { folderId } = useParams()
    const { data } = useFolderDataById(folderId)
    const folderName = data?.notes[0]?.folder?.name ?? ""


    return (
        <>
            <div className='flex flex-1 h-full w-full'>
                <div className="w-[350px] px-5 py-2 flex flex-col gap-5 mt-8">
                    {/* Folder Name */}
                    <div className="pl-2  text-[22px] font-semibold text-white">
                        {folderName}
                    </div>

                    {/* Notes List */}
                    <div className='mt-2 max-h-[650px] flex flex-col gap-4 overflow-y-auto
                                [&::-webkit-scrollbar]:w-1.5
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-gray-600
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb:hover]:bg-gray-500
                                scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
                        { data && data?.notes?.map((value, index) => {
                            const trucateTitle = value.preview.slice(0, 23)


                            const date = new Date(value.createdAt).toLocaleDateString("en-GB");
                            return (
                                <div onClick={() => navigate(`${value.id}`)}

                                    key={index}
                                    className="bg-[#2b2b2b] p-5 rounded-md shadow-sm cursor-pointer hover:bg-[#3a3a3a] transition"
                                >
                                    <h3 className="text-white font-semibold text-[16px] truncate">
                                        {value.title}
                                    </h3>
                                    <div className='flex justify-between'>
                                        <p className="text-gray-400 text-[14px]">
                                            {date}
                                        </p>
                                        <p className="text-gray-400 text-[14px] truncate">
                                            {trucateTitle}
                                        </p>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='h-full w-full'>
                    <Outlet />
                </div>
            </div>


        </>

    )
}

export default NotesBar
