import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { backend_url, server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSend,
} from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../styles/styles";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-user/${user._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, []);

  const checkOnline = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online =
      onlineUsers && onlineUsers.find((user) => user.userId === chatMembers);
    //setActiveStatus(online ? true : false);
    return online ? true : false;
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`,
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );

    const message = {
      sender: user._id,
      text: newMessage,
      receiver: receiverId,
      conversationId: currentChat._id,
    };

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImages(file);

    imageSendingHandler(file);
  };

  const imageSendingHandler = async (file) => {
    const formData = new FormData();

    formData.append("sender", user._id);
    formData.append("images", file);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

    const receiverId = currentChat.members.find((member) => member != user._id);

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      images: file,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    try {
      await axios
        .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
          lastMessage: "Photo",
          lastMessageId: user._id,
        })
        .then((res) => {
          setNewMessage("");
        });
    } catch (error) {}
  };
  // console.log(userData);
  return (
    <div className="w-full">
      <Header />
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/**all messages list */}

          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                key={index}
                data={item}
                index={index}
                active={active}
                setActive={setActive}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user._id}
                userData={userData}
                setUserData={setUserData}
                online={checkOnline(item)}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          userId={user._id}
          userData={userData}
          currentChat={currentChat}
          checkOnline={checkOnline}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  active,
  setActive,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
}) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
  };

  useEffect(() => {
    // this user is seller
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/user-info/${userId}`);
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active == index ? "bg-[#00000010]" : "bg-transparent"
      } cursor-pointer`}
      onClick={() => {
        setOpen(true);
        setActive(index);
        handleClick(data._id);
        setCurrentChat(data);
      }}
    >
      <div className="relative">
        <img
          // src={`${userData?.avatar?.url}`}
          src={`${backend_url}/${userData?.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-3 h-3 rounded-full bg-green-400 absolute top-0.5 right-0.5" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-neutral-200 absolute top-0.5 right-0.5" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{userData && userData.shopName}</h1>
        <p className="text-[16px] text-[#000c]">
          {data.lastMessageId !== userData?._id
            ? "You: "
            : userData?.shopName.split(" ")[0] + ": "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  userData,
  currentChat,
  checkOnline,
  handleImageUpload,
}) => {
  return (
    <div className="w-full h-[75vh] flex flex-col justify-between">
      {/**message header */}
      <div className="flex w-full p-3 items-center bg-slate-200">
        <AiOutlineArrowLeft
          size={20}
          className="cursor-pointer mr-5"
          onClick={() => setOpen(false)}
        />
        <div className="flex">
          <img
            // src={`${userData?.avatar?.url}`}
            src={`${backend_url}/${userData?.avatar}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-semibold">{userData?.shopName}</h1>
            {checkOnline(currentChat) && <h1>Active now</h1>}
          </div>
        </div>
      </div>

      {/**messages */}
      <ShowMessagesArea
        userId={userId}
        messages={messages}
        userData={userData}
      />

      {/**send message input */}
      <form
        onSubmit={sendMessageHandler}
        aria-required={true}
        className="relative p-3 w-full flex items-center justify-between"
      >
        <div className="w-[3%]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery size={20} className="cursor-pointer" />
          </label>
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" id="send" className="hidden" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute top-5 right-4 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

const ShowMessagesArea = ({ messages, userId, userData }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
      {messages &&
        messages.map((item, index) => (
          <div
            className={`w-full flex my-2 ${
              userId == item.sender ? "justify-end" : "justify-start"
            }`}
          >
            {userId !== item.sender && (
              <img
                // src={`${backend_url}/${userData?.avatar}`}
                src={`${backend_url}/${userData?.avatar}`}
                className="rounded-full w-10 h-10 mr-3"
              />
            )}

            <div>
              <div>
                {/* <div>
                  {" "}
                  {item.images && (
                    <img
                      src={`${item.images?.url}`}
                      className="w-[150px] h-[150px] object-cover rounded-[10px]"
                    />
                  )}
                </div> */}
                {item.text && (
                  <div className="max-w-[50vh] p-2 h-min rounded bg-[#38c776] text-white wrap-break-word">
                    <p>{item.text}</p>
                  </div>
                )}
              </div>
              <p className="text-end text-[12px] text-[#000000d3]">
                {format(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default UserInbox;
