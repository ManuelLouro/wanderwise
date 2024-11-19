import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/trips", async (req, res) => {
  try {
    const trips = await prisma.trip.findMany();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

app.post("/trips", async (req, res) => {
  const { name } = req.body;

  try {
    const newTrip = await prisma.trip.create({
      data: { name },
    });
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ error: "Failed to create trip" });
  }
});

 app.post("/events", async (req, res) => {
  const { name, time, location,category } = req.body;
  const newEvent = await prisma.event.create({
    data: {
      name,
      time,
      location,
    },
  });
  res.status(201).json(newEvent);
}); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
