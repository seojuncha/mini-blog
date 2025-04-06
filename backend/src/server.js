import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const port = process.env.LISTEN_PORT || 8989;

app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});
