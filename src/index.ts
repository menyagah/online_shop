import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(8100, () => console.log('Server is listening on port 8100...'));