import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";

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
  const { tripId } = req.body
  try {
    const events = await prisma.event.findMany({
      where : {
        tripId: tripId,
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post(
  "/events",
  upload.single("pdf"),
  async (req: Request, res: Response) => {
    const { name, description, location, date, tripId } = req.body;

    try {
      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      });

      if (!trip) {
        res.status(404).json({ error: "Trip not found" });
        return;
      }

      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          location,
          date,
          tripId,
          pdfUrl: req.file ? `/uploads/${req.file.filename}` : null,
        },
      });

      res.status(201).json(newEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Failed to create event" });
    }
  }
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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

app.delete("/events/:eventId", async (req, res) => {
  const { eventId } = req.params; // Extract eventId from the URL params
  console.log(`Deleting event with ID: ${eventId}`); // Debugging log

  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: eventId }, // Ensure this is the correct identifier field
    });
    res.json(deletedEvent);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
