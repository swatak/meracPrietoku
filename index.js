const express = require("express");
const cors = require("cors");

require("./db/pripojenie");

const app = express();

//"192.168.137.50" - LacikoNemaData Siet
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

const route_data = require("./routes/data");
app.use("/data", route_data);

const profile_route = require("./routes/profile");
app.use("/profile", profile_route);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on a port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
