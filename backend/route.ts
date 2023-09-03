import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Сервер работает");
});

export default router;
