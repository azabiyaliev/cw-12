import mongoose from "mongoose";
import config from "./config";

import User from "./models/User";
import Picture from "./models/Picture";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("pictures");
    } catch (e) {
        console.log("Collections were not presents")
    }

    const [Martin, Lazlo] = await User.create(
        {
            email: "martin@gmail.com",
            password: "123",
            role: "admin",
            token: crypto.randomUUID(),
            displayName: "Martin",
            avatar: "fixtures/Lermontov.jpg",
        },
        {
            email: "lazlo@gmail.com",
            password: "123",
            role: "user",
            token: crypto.randomUUID(),
            displayName: "Lazlo",
            avatar: "fixtures/Bean.jpg",
        }
    );


    await Picture.create(
        {
            user: Martin._id,
            title: "Earth",
            image: "fixtures/Earth.jpg",
        },
        {
            user: Lazlo._id,
            title: "Lake «Issyk-Kul»",
            image: "fixtures/IssykKul.jpg",
        },
        {
            user: Martin._id,
            title: "Leonardo Di Caprio",
            image: "fixtures/LeonardoDiCaprio.jpg",
        },
        {
            user: Lazlo._id,
            title: "Food «Manty»",
            image: "fixtures/Manty.jpg",
        },
        {
            user: Martin._id,
            title: "New-York",
            image: "fixtures/NewYork.jpg",
        },
        {
            user: Lazlo._id,
            title: "Real Madrid",
            image: "fixtures/RealMadrid.jpg",
        },
        {
            user: Martin._id,
            title: "Uchiha Itachi",
            image: "fixtures/UchihaItachi.jpg",
        },
        {
            user: Lazlo._id,
            title: "Tiger",
            image: "fixtures/tiger.jpg",
        },
    )

    await db.close();

};

run().catch(console.error);