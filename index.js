import listen from "./src/app.js";
const PORT = process.env.PORT;
listen.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
