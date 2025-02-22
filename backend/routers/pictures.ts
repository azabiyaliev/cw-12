import express from "express";
import Picture from "../models/Picture";
import {Error} from "mongoose";
import permit from "../middleware/permit";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";

const picturesRouter = express.Router();

picturesRouter.get('/', async (
    req,
    res,
    next) => {
    const idQuery = req.query.user as string;
    try {
        if (idQuery) {
            const picturesByIdUser = await Picture.find({user: idQuery}).populate("user", "displayName");
            if (!picturesByIdUser) res.status(404).send("Not Found");
            res.send(picturesByIdUser);
        } else {
            const pictures = await Picture.find().populate("user", "displayName");
            res.status(200).json(pictures);
        }
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

picturesRouter.get('/:id', async (
    req,
    res,
    next) => {
    const id = req.params.id;

    try {
        if (!id) {
            res.status(400).send({error: "Missing ID"});
            return;
        } else {
            const picture = await Picture.findById(id);
            res.send(picture);
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

picturesRouter.post("/", imagesUpload.single('image'), auth, permit("admin", "user"), async (
    req,
    res,
    next) => {

    let reqWithUser = req as RequestWithUser;
    const userFromAuth = reqWithUser.user._id;

    const pictureData = {
        user: userFromAuth,
        title: req.body.title,
        image: req.file ? 'images' + req.file.filename : null,
    }

    try {
        if (pictureData.title.trim().length === 0 || pictureData.image && pictureData.image.trim().length === 0) {
            res.status(411).send({error: "Title and picture is must be present in the request."});
            return
        }
        const picture = new Picture(pictureData);
        await picture.save();
        res.send({picture, message: "Picture saved."});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

picturesRouter.delete('/:id', auth, permit("admin", "user"), async (
    req,
    res,
    next) => {
    const id = req.params.id;
    let reqWithUser = req as RequestWithUser;
    const userFromAuth = reqWithUser.user._id;
    if (!id) {
        res.status(400).send({error: "Missing ID"});
        return;
    }
    try {
        if (reqWithUser.user.role === "admin") {
            const deletePictureByAdmin = await Picture.findByIdAndDelete(id)
            res.send(deletePictureByAdmin);
        } else {
            const deletePicture = await Picture.findOneAndDelete({
                _id: id,
                user: userFromAuth,
            });
            if (!deletePicture) {
                res.status(403).send({message: "Picture not found or access denied"});
                return;
            }
            res.send({message: "Successfully deleted", album: deletePicture});
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

export default picturesRouter;