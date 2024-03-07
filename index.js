import express from "express";
import { connectDB } from "./connection.js";
import urlRouter from "./routes/url.routes.js";
import { Url } from "./models/url.model.js";

const PORT = 8001;
const app = express();
const url = "mongodb://127.0.0.1:27017/short-url";

connectDB(url)
    .then(() => {
        console.log(`MongoDB connection established`);
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB`);
    });


app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now()
          }
        }
      }
    );

    res.redirect(entry.redirectURL);
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})