import { ytid } from "ytid";
import { Url } from "../models/url.model.js";

const generateShortUrl = async(req,res) => {

    const {url} = req.body;

    if(!url)
    {
        return res.status(400).json({
            error: "Url is required"
        })
    }
    const shortId = ytid();

    const shorterenUrl = await Url.create({
      shortId: shortId,
      redirectURL: url,
      visitHistory: [],
    });

    return res.status(200).json({
        id: shortId
    })
} 

export {generateShortUrl,}