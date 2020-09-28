import { getDatabase, dbName } from '../db/Cloudant';
const _ = require('lodash');

const CONFLICT = 409;

export const getView = async (view) =>
{
	const db = getDatabase(dbName);
	return new Promise((resolve, reject) =>
	{
		db.view(
			"views", view,
			{
				'include_docs': false
			}
		).
			then(result =>
			{
				const data = _(result.rows).map((v) => v.value).
					value();
				resolve(data);
			}).
			catch(err =>
			{
				reject(err);
			});
	});
};

export const find = async (query) =>
{
	const db = getDatabase(dbName);
	const result = await db.find(query).catch(err => ({ error: err }));

	if (result.error != null)
	{
		return result;
	}

	return result.docs;
};

export const getAll = async () =>
{
	const db = getDatabase(dbName);
	return new Promise((resolve, reject) =>
	{
		// eslint-disable-next-line camelcase
		db.list({ include_docs: true }).
			then(result =>
			{
				resolve(result.rows);
			}).
			catch(err =>
			{
				reject(err);
			});
	});
};


export const getById = async (id) =>
{
	const db = getDatabase(dbName);
	return new Promise((resolve, reject) =>
	{
		if (id == null || id.length === 0)
		{
			reject(new Error("id is not defined"));
		}
		else
		{
			db.get(id).
				then(result =>
				{
					resolve(result);
				}).
				catch(err =>
				{
					reject(err);
				});
		}
	});
};

export const deleteById = async (id) =>
{
	const db = getDatabase(dbName);
	const doc = await getById(id);
	return new Promise((resolve, reject) =>
	{
		db.destroy(id, doc._rev).
			then(result =>
			{
				resolve(result);
			}).
			catch(err =>
			{
				reject(err);
			});
	});
};

export const create = async ({ doc, type = null }) =>
{
	const db = getDatabase(dbName);
	return new Promise((resolve, reject) =>
	{
		db.insert(Object.assign({}, doc, type !== null ? { type: type } : {})).
			then(result =>
			{
				resolve(result);
			}).
			catch(err =>
			{
				reject(err);
			});
	});
};

export const createViews = async () =>
{
	const view = {
		"_id": "_design/views",
		"views": {
			"jobs": {
				"map": `function(doc)
					{
						if (doc.type === 'job')
						{
							emit(doc.jobName, { jobName: doc.jobName, cron: doc.cron, id: doc._id, cronStr: doc.cronStr } );
						}
					}`
			},
			"jobExec": {
				"map": `function(doc)
					{
						if (doc.type === 'job')
						{
							emit(doc.jobName, {
								jobName: doc.jobName,
								jobConfig: doc.jobConfig,
								cron: doc.cron,
								id: doc._id,
								disabled: doc.disabled,
								cronStr: doc.cronStr,
								launchStr: doc.launchStr
							} );
						}
					}`
			},
			"uniqueJobs": {
				"map": `function (doc) {
					if (doc.type === "history")
					{
					  emit(doc.jobName);
					}
				  }`,
				"reduce": `function (keys, values, rereduce) {

					if (rereduce) {
					  var jobs = [];

					  for (var x in values) {
					    for (var y in values[x]) {
					      jobs.push(values[x][y])
					    }
					  }

            		const uniqueJobs = [];

            		for (var z in jobs) {
						  if (uniqueJobs.indexOf(jobs[z]) === -1)
						  {
						    uniqueJobs.push(jobs[z]);
					  	}
					  }

					  return uniqueJobs;
					} else {

					   const arr = keys.map(function(key, index) {
					     return key[0];
					   });
					   return arr;
					}
				}`
			}
		},
		"language": "javascript"
	};

	await create({ doc: view }).catch(async err =>
	{
		if (err.statusCode !== CONFLICT)
		{
			throw err;
		}
		else
		{
			await deleteById("_design/views");
			await create({ doc: view }).catch(err2 =>
			{
				throw err2;
			});
		}
	});
};

export const createIndexes = async () =>
{
	const index = {
		"_id": "_design/historyIndex",
		"language": "query",
		"indexes": {
			"jobHistoryIndex": {
				"index": {
					"default_analyzer": "keyword",
					"default_field": {},
					"partial_filter_selector": {},
					"selector": {},
					"fields": [
						{
							"name": "type",
							"type": "string"
						},
						{
							"name": "jobName",
							"type": "string"
						},
						{
							"name": "timing.start",
							"type": "string"
						},
						{
							"name": "timing.end",
							"type": "string"
						},
						{
							"name": "info.status",
							"type": "string"
						}
					],
					"index_array_lengths": true
				},
				"analyzer": {
					"name": "perfield",
					"default": "keyword",
					"fields": {
						"$default": "standard"
					}
				}
			}
		}
	};

	await create({ doc: index }).catch(async err =>
	{
		if (err.statusCode !== CONFLICT)
		{
			throw err;
		}
		else
		{
			await deleteById("_design/historyIndex");
			await create({ doc: index }).catch(err2 =>
			{
				throw err2;
			});
		}
	});
};
