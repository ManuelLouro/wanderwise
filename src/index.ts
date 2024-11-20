import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response } from "express";

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

app.get("/events", async (req, res) => {
  try {
    const trips = await prisma.event.findMany();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});
app.post("/events", async (req: Request, res: Response) => {
  const { name, description, location, date, tripId} = req.body;

  try {
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      res.status(404).json({ error: "Trip not found" });
      return
    }
    const newEvent = await prisma.event.create({
      data: {
        name,
        description,
        location,
        date,
        tripId,
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  } 
});
app.get("/trips/:tripId/events", async (req, res) => {
  const { tripId } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: { tripId },
    });

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
