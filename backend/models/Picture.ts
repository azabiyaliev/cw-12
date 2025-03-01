import mongoose from "mongoose";

const Schema = mongoose.Schema;


const PictureSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Picture = mongoose.model('Picture', PictureSchema);
export default Picture;