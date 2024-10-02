import express, { application } from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import chat from "./models/chat.js";
import userChats from "./models/userChats.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongo");
  } catch (err) {
    console.log(err);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});
app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});
app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;
  try {
    const newChat = new chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();
    const UserChat = await userChats.find({ userId: userId });
    if (!UserChat.length) {
      const newUserChat = new userChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChat.save();
    } else {
      await userChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
      res.status(201).send(newChat._id);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error sending request");
  }
});
app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId
  try {
    const UserChat = await userChats.find({ userId });
    res.status(200).send(UserChat[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("error fetching userchats!!!");
  }
});

app.get("/api/chats/id:", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const chats = await chat.findOne({_id:req.params.id , userId });
    res.status(200).send(chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("error fetching chats!!!");
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  connectToMongo();
  console.log("app running at 3000;");
});
