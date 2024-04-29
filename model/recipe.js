import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    chef_name: {
        type: String,
        required: true
    },
    chef_id: {
        type: Schema.Types.ObjectId,
        ref : "chef",
    },
    description: {
        type: String,
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
    },
    cooking_time: {
        type: Number,
    },
    calories: {
        type: Number,
    },

}, { timestamps: true });

export const Recipe = model('recipe', schema);
