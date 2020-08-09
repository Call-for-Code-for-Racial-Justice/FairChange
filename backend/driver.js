import { CloudantUtil } from './db/Cloudant';
import express from 'express';
import { getLogger } from './routing/logging';

const app = express();
const port = 3000;
const logger = getLogger();

app.use(express.json());

app.use("/", require("./routing/logging").router);
app.use("/api", require("./routing/routes").router);
CloudantUtil().then(() =>
{
	app.listen(port, () =>
	{
		logger.info(`Example app listening at http://localhost:${port}`);
	});
});
