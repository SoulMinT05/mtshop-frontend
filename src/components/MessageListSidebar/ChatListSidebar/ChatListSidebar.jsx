import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, TextField } from '@mui/material';
import { IoIosSearch } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import axiosClient from '../../../apis/axiosClient';
import { fetchMessagesSidebar } from '../../../redux/messageSlice';
import { Link, useParams } from 'react-router-dom';
import { MyContext } from '../../../App';

const ChatListSidebar = () => {
    const context = useContext(MyContext);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { messagesSidebar } = useSelector((state) => state.message);
    const [isAddMessage, setIsAddMessage] = useState(false);

    useEffect(() => {
        const getMessagesForUsers = async () => {
            const { data } = await axiosClient.get('/api/message/getStaffsInSidebar');
            if (data?.success) {
                dispatch(fetchMessagesSidebar(data.staffs));
            }
        };
        getMessagesForUsers();
    }, [id]);

    return (
        <>
            <div className="chatList ">
                <div className="flex items-center gap-3 w-full">
                    <div className="relative flex-1 pl-2 text-[13px] lg:text-[14px] h-[40px]">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full h-full bg-gray-100 p-2 pr-10 rounded-[8px] focus:outline-none"
                        />
                        <Button className="!absolute top-1/2 right-2 -translate-y-1/2 !w-[35px] !min-w-[35px] h-[35px] !rounded-full bg-gray-100 hover:bg-gray-200">
                            <IoIosSearch className="text-[18px] text-gray-600" />
                        </Button>
                    </div>
                    <Button
                        onClick={() => setIsAddMessage(!isAddMessage)}
                        className="!w-[40px] !min-w-[40px] h-[40px] !rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        {isAddMessage ? (
                            <FaMinus className="text-[18px] text-gray-600" />
                        ) : (
                            <FaPlus className="text-[18px] text-gray-600" />
                        )}
                    </Button>
                </div>
            </div>

            <div className="chatList flex-1 overflow-scroll mt-4">
                {messagesSidebar?.length > 0 &&
                    messagesSidebar?.map((message, index) => {
                        return (
                            <Link
                                onClick={() => {
                                    if (window.innerWidth < 1024) context?.setIsChatOpen(true);
                                }}
                                key={message._id}
                                to={`/message/${message._id}`}
                            >
                                <div className="item flex items-center p-4 gap-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                                    <img
                                        className="w-[50px] h-[50px] object-cover rounded-full "
                                        src={message?.avatar}
                                        alt={message?.name}
                                    />
                                    <div className="texts flex flex-col">
                                        <span className="text-[13px] lg:text-[14px] font-[500] ">{message?.name}</span>
                                        <p
                                            className={`text-[12px] lg:text-[13px] font-[500] my-[2px] ${
                                                message?.role === 'admin' ? 'text-green-500' : 'text-blue-500'
                                            }`}
                                        >
                                            {message?.role === 'admin' ? 'Quản lý' : 'Nhân viên'}
                                        </p>
                                    </div>
                                </div>
                                {index !== messagesSidebar?.length - 1 && <Divider />}
                            </Link>
                        );
                    })}
            </div>
        </>
    );
};

export default ChatListSidebar;
