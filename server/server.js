import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://countries-case-enhanced.vercel.app",
    ],
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/countries", async (req, res) => {
  try {
    console.log("COUNTRIES_API_KEY exists:", !!process.env.COUNTRIES_API_KEY);

    const response = await fetch(
      "https://case.bitforbit.dev/api/v1/countries",
      {
        headers: {
          Authorization: `Bearer ${process.env.COUNTRIES_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.log("External API error:", response.status, text);

      return res.status(response.status).json({
        error: "Could not fetch countries from external API",
        status: response.status,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Something went wrong on the server",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
