const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const lessons = await api.get(`/api/lessons/`, {
      ...req.query,
    });
    return res.json(lessons.data);
  } catch (error) {
    // Check service availability
    if (error.code === "ECONNREFUSE") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
