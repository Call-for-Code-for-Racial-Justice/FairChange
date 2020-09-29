# Backend Node Server

### Getting Started

1) `cd backend`
2) `npm ci`
3) `npm run dev`

### Endpoints

#### /api/getIncident/\<incident id\>

*method:* GET

This endpoint allows you to retrieve the incident information from the Cloudant database. 

**incident id** = the unique id of the incident.

**returned value** - incident information in JSON format

#### /api/storeIncident

*method:* POST

This endpoint allows you to create a new incident.  The body of the post should be a JSON object with the following structure:

```js
{
    timestamp: string,
    incidentCategory: string,
    incidentId: string,
    description: string,
    location: string,
    lat: number,
    lon: number,
    country: string,
    state: string,
    city: string,
    topic: string
}
```

**returned value** - confirmation of incident record having been created.

#### /api/upload

*method:* POST

*Content-Type:* multipart/form-data;

*query param:* incident - The ID of the incident record to attach the video to.

*form-data:*

> **key**: incidentVideo, **value**: the video

**returned value**

```js
{
    "Location": url,
    "Bucket": "emb-race-fair-change",
    "Key": Object Name in Cloud Object Storage,
    "ETag": unique tag of uploaded object,
    "ok": boolean - true indicates incident document successfully updated,
    "id": id of the incident document in Cloudant,
    "rev": revision of the incident documnt in Cloudant
}
```


#### /api/getObject/\<key\>

*method:* GET

*key* - Object name of the video in Cloud Object Storage

**returned value** - Direct Url to the video.  Url expires in 60 seconds.


------>

**Step 4: Start the backend**

# Backend Node Server

### Getting Started

1) `cd backend`
2) `npm ci`
3) `npm run dev`

### Endpoints

#### /api/getIncident/\<incident id\>

*method:* GET

This endpoint allows you to retrieve the incident information from the Cloudant database. 

**incident id** = the unique id of the incident.

**returned value** - incident information in JSON format

#### /api/storeIncident

*method:* POST

This endpoint allows you to create a new incident.  The body of the post should be a JSON object with the following structure:

```js
{
    timestamp: string,
    incidentCategory: string,
    incidentId: string,
    description: string,
    location: string,
    lat: number,
    lon: number,
    country: string,
    state: string,
    city: string,
    topic: string
}
```

**returned value** - confirmation of incident record having been created.

#### /api/upload

*method:* POST

*Content-Type:* multipart/form-data;

*query param:* incident - The ID of the incident record to attach the video to.

*form-data:*

> **key**: incidentVideo, **value**: the video

**returned value**

```js
{
    "Location": url,
    "Bucket": "emb-race-fair-change",
    "Key": Object Name in Cloud Object Storage,
    "ETag": unique tag of uploaded object,
    "ok": boolean - true indicates incident document successfully updated,
    "id": id of the incident document in Cloudant,
    "rev": revision of the incident documnt in Cloudant
}
```


#### /api/getObject/\<key\>

*method:* GET

*key* - Object name of the video in Cloud Object Storage

**returned value** - Direct Url to the video.  Url expires in 60 seconds.




<------