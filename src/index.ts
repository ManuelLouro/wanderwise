import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";
import multer, { StorageEngine } from "multer";
import path from "path";
import { auth } from "express-openid-connect";
import { requiresAuth } from "express-openid-connect";
import { Session } from "express-openid-connect";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = 3000;
/* 
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};
*/
interface OIDCUser {
  sub: string;
  name: string;
  email: string;
  [key: string]: any;
}

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: "http://localhost:3000",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    callback: "/callback",
  },

  afterCallback: async (req: Request, res: Response, session: any) => {
    const user = session.user;
    if (!user) return session;

    const { sub, name, email } = user;

    const existing = await prisma.profile.findUnique({
      where: { auth0Id: sub },
    });

    if (!existing) {
      await prisma.profile.create({
        data: {
          auth0Id: sub,
          name,
          email,
        },
      });
    }

    session.returnTo = "http://localhost:5173";
    return session;
  },
};

app.use(express.json());
app.use(auth(config));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.put("/profile", requiresAuth(), async (req: Request, res: Response) => {
  try {
    const user = req.oidc?.user;
    if (!user || !user.sub) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const { name, email, phone } = req.body;

    if (typeof name !== "string") {
      res.status(400).json({ error: "Invalid name" });
      return;
    }

    const existing = await prisma.profile.findUnique({
      where: { auth0Id: user.sub },
    });

    let updated;
    if (existing) {
      updated = await prisma.profile.update({
        where: { auth0Id: user.sub },
        data: { name, email, phone },
      });
    } else {
      updated = await prisma.profile.create({
        data: {
          auth0Id: user.sub,
          name,
          email,
          phone,
        },
      });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile1" });
  }
});

app.get("/profile", requiresAuth(), (async (req, res) => {
  const user = req.oidc?.user;
  if (!user || !user.sub) {
    return res.status(401).json({ error: "Not authenticated2" });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { auth0Id: user.sub },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
}) as express.RequestHandler);

app.get("/login", (req, res) => res.oidc.login({ returnTo: "/" }));

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

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
  const { tripId } = req.body;
  try {
    const events = await prisma.event.findMany({
      where: {
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
