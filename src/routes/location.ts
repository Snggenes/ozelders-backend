import { Router } from "express";

const router = Router();

router.get("/city", async (req, res, next) => {
  const locationUrl = process.env.LOCATION_URL;
  const { search } = req.query;
  if (!search) {
    const response = await fetch(`${locationUrl}?limit=10`);
    if (!response.ok) {
      throw new Error("Location service unavailable");
    }
    const data = await response.json();
    const citiesArray = data.data.map((city: any) => city.name);
    return res.json(citiesArray);
  }
  try {
    const response = await fetch(`${locationUrl}?name=${search}`);
    if (!response.ok) {
      throw new Error("Location service unavailable");
    }
    const data = await response.json();
    const citiesArray = data.data.map((city: any) => city.name);
    res.json(citiesArray);
  } catch (error) {
    next(error);
  }
});

router.get("/district", async (req, res, next) => {
  const locationUrl = process.env.LOCATION_URL;
  const { city } = req.query;
  try {
    const response = await fetch(
      `${locationUrl}${city ? `?name=${city}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Location service unavailable");
    }
    const data = await response.json();
    const districtsArray = data.data[0].districts.map(
      (district: any) => district.name
    );
    res.json(districtsArray);
  } catch (error) {
    next(error);
  }
});

export default router;
