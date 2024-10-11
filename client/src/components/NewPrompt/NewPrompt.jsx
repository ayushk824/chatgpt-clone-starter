import { useEffect, useRef } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { useState } from "react";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const NewPrompt = ({ data }) => {
  const [Question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [Img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      // data?.history.map(({ role, parts }) => {
      //   return ({
      //     role,
      //     parts: [{ text: parts[0].text }],
      //   });
      // }),
    ],
    generationConfig: {},
  });
  const endRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, Question, answer, Img.dbData]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn:() => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Question: Question.length ? Question : undefined,
          answer,
          Img: Img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) {
      setQuestion(text);
    }
     setAnswer("")
    try {
      const result = await chat.sendMessageStream(
        Object.entries(Img.aiData).length ? [Img.aiData, text] : [text]
      );
      let accumalatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumalatedText += chunkText;
        setAnswer(accumalatedText);
      }

      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text, false);
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);
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
      {answer && (
        <div className="message ">
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div className="endPage" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask your Queries" />
        <button>
          <img src="/arrow.png" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
