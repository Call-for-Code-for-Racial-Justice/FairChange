import { CloudantUtil } from './db/Cloudant';
import express from 'express';
import { getLogger } from './routing/logging';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './swagger';

const app = express();
const port = process.env.PORT || 3000;
const logger = getLogger();

app.use(express.json());

app.use("/", require("./routing/logging").router);
app.use("/api", require("./routing/routes").router);

const options = {
	customCss: '.swagger-ui .topbar { display: none }'
};

(swaggerDoc as { [key: string]: any; }).paths = { ...require('./routing/routes').swagger };
(swaggerDoc as { [key: string]: any; }).definitions = { ...require('./routing/routes').schemas };

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));

CloudantUtil().then(() =>
{
	app.listen(port, () =>
	{
		logger.info(`Example app listening at http://localhost:${port}`);
	});
});
