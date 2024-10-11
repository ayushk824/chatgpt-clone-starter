import "./chatpage.css";
import NewPrompt from "../../components/NewPrompt/NewPrompt";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import { useEffect } from "react";

const Chatpage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
 
  return (
    <div className="chatpage">
      <div className="wrapper">
        <div className="chat">
          {isPending ? (
            "Loading..."
          ) : error ? (
            "Something went wrong "
          ) : (
            <ul>
              {data.history.map((message, i) => (
                <li key={i}>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  {message.parts.map((part, j) => (
                    <div
                      className={
                        message.role === "user" ? "message user" : "message"
                      }
                      key={j}
                    >
                      {part.text && <Markdown>{part.text}</Markdown>}
                      {part.img && (
                        <IKImage
                          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                          path={part.img}
                          height="300"
                          width="400"
                          transformation={[{ height: 300, width: 400 }]}
                          loading="lazy"
                          lqip={{ active: true, quality: 20 }}
                        />
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          )}
          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
