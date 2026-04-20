import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV !== "production";
const COUNTRIES_API_URL =
  process.env.COUNTRIES_API_URL ||
  "https://case.bitforbit.dev/api/v1/countries";

app.use(cors());

app.get("/api/countries", async (req, res) => {
  try {
    const response = await fetch(COUNTRIES_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.COUNTRIES_API_KEY}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();

      if (isDev) {
        console.log("External API error:", response.status, text);
      }

      return res.status(response.status).json({
        error: "External API failed",
        status: response.status,
        details: text,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    if (isDev) {
      console.error("Server error:", error);
    }

    res.status(500).json({
      error: "Server failed",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
