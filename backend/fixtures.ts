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
            title: "Земля",
            image: "fixtures/Earth.jpg",
        },
        {
            user: Lazlo._id,
            title: "Иссык Куль",
            image: "fixtures/IssykKul.jpg",
        },
        {
            user: Martin._id,
            title: "Леонардо Ди Каприо",
            image: "fixtures/LeonardoDiCaprio.jpg",
        },
        {
            user: Lazlo._id,
            title: "Манты",
            image: "fixtures/Manty.jpg",
        },
        {
            user: Martin._id,
            title: "Нью-Йорк",
            image: "fixtures/NewYork.jpg",
        },
        {
            user: Lazlo._id,
            title: "Реал Мадрид",
            image: "fixtures/RealMadrid.jpg",
        },
        {
            user: Martin._id,
            title: "Учиха Итачи",
            image: "fixtures/UchihaItachi.jpg",
        },
        {
            user: Lazlo._id,
            title: "Тигр",
            image: "fixtures/tiger.jpg",
        },
    )

    await db.close();

};

run().catch(console.error);