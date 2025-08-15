import app from "./app";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api/v1`);
});

server.on("error", (error) => {
  console.log("Error in server", error);
});
