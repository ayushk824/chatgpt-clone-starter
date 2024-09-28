import { useEffect, useRef } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { useState } from "react";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown"



const NewPrompt = () => {
  const [Question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [Img, setImg] = useState({
    isLoading: false,
   error:"",
    dbData: {},
    aiData:{}
  });

  const chat = model.startChat({
    history: [
     
    ],
  });
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [Question,answer,Img.dbData]);


  const add = async (text) => {
    setQuestion(text);
    const result = await chat.sendMessageStream(
      Object.entries(Img.aiData).length ? [Img.aiData,text]:[text]);
      let accumalatedText ="";                    
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText)
        accumalatedText += chunkText;
        setAnswer(accumalatedText);
      }
    setImg({
      isLoading: false,
      error:"",
       dbData: {},
       aiData:{}
    })
  };
  const handleSubmit = async(e) =>{
   e.preventDefault();
   const text = e.target.text.value;
   if(!text) return ;
   add(text);
  // await fetch("http://localhost:3000/api/chats",{
  //   method:"POST",
  //   headers:{
  //   "Content-Type":"application/json"},
  //   body:JSON.stringify({text})
  // },

  }
  return (
    <>
      {Img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={Img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {Question && <div className="message user"> {Question}</div>}
      {answer && <div className="message "> <Markdown>{answer}</Markdown></div>}

      <div className="endPage" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text"placeholder="Ask your Queries" />
        <button>
          <img src="/arrow.png"  />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
