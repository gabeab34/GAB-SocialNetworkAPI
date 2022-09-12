import express from "express";
import db from "./config/connection"
import routes from "./routes/index"

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.urlencoded({ extended: true}))
app.use(express.json());
app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server now running on port ${PORT}!`);
    });
});