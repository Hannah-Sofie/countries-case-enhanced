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

app.get("/api/countries", async (req, res) => {
  try {
    const response = await fetch(
      "https://case.bitforbit.dev/api/v1/countries",
      {
        headers: {
          Authorization: `Bearer ${process.env.COUNTRIES_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Could not fetch countries from external API",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong on the server",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
