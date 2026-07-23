import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    // Jo student kisi ko follow kar raha hai
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },

    // Jis student ko follow kiya ja raha hai
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Same student ko duplicate follow karne se prevent karega
followSchema.index(
  {
    follower: 1,
    following: 1,
  },
  {
    unique: true,
  },
);

// Followers list ko fast fetch karne ke liye
followSchema.index({
  following: 1,
  createdAt: -1,
});

// Following list ko fast fetch karne ke liye
followSchema.index({
  follower: 1,
  createdAt: -1,
});

const Follow = mongoose.model(
  "Follow",
  followSchema,
);

export default Follow;