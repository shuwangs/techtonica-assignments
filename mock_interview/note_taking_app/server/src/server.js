import app from "./app.js";

const PORT = 3002;

app.listen(PORT, () => {
    console.log("server is running on port", PORT);
})