
import express from "express";
import type { Request, Response } from "express";

const app = express();

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({
        name: "Nazia",
        favoriteFood: "Biryani",
        age: 23,
        favoriteColor: "Purple",
        city: "Karachi"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
