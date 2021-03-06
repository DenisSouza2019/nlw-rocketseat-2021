import { api } from "../../services/api";
import io from "socket.io-client";
import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const messagesQueu: Message[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) =>{
  messagesQueu.push(newMessage);
})

export function MessageList() {
  const [message, setMessages] = useState<Message[]>([]);

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(messagesQueu.length > 0){
        setMessages(prevState => [
          messagesQueu[0],
          prevState[0],
          prevState[1],
        ].filter(Boolean))

        messagesQueu.shift()
      }
    },3000)
  },[])

  useEffect(() => {
    api.get<Message[]>("messages/last3").then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {message.map((message) => {
          return (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>
                {message.text}
              </p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={message.user.avatar_url}
                    alt={message.user.name}
                  />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
