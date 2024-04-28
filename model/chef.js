import { Schema, model } from "mongoose";

const schema = new Schema({
    id: {
        type: String,
        required: true
    },
    chef_name: {
        type: String,
        required: true
    },
    years_of_experience: {
        type: Number,
    },
    recipes: {
        type: Array,
    }
}, { timestamps: true });

export const Chef = model('chef', schema);
