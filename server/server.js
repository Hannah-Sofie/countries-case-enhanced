import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/countries", async (req, res) => {
  try {
    console.log("API key exists:", !!process.env.COUNTRIES_API_KEY);

    const response = await fetch(
      "https://case.bitforbit.dev/api/v1/countries",
      {
        headers: {
          Authorization: `Bearer ${process.env.COUNTRIES_API_KEY}`,
        },
      }
    );

    console.log("External API status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("External API error body:", text);

      return res.status(response.status).json({
        error: "External API failed",
        status: response.status,
        details: text,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("SERVER ERROR:", error);

    res.status(500).json({
      error: "Server failed",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
