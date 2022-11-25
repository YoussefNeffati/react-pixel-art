module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        id: int,
        name: String,
        password: String,
      },
      { timestamps: true }
    )
  );

  return user;
};
