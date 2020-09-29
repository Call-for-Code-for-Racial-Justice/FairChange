# Fair Change Starter Kit 
This solution starter was created by technologists from IBM. The goals of this starter kit is to provide a solution for the theme of Police & Judicial Reform and Accountability. 

## Authors 
**Product Managers:** 

**Architects** 

**User Researchers:** 

**Development** 


## Contents

1. [Overview](#overview)
2. [Video](#video)
3. [The idea](#the-idea)
4. [How it works](#how-it-works)
5. [Diagrams](#diagrams)
6. [Documents](#documents)
7. [Datasets](#datasets)
8. [Technology](#technology)
9. [Getting started](#getting-started)
10. [Disclosures](#disclosures)
11. [License](#license)



## Overview

### What's the problem?

From traffic stops and arrests to sentencing and parole decisions, use technology to better analyse real-world data, provide insights and make recommendations that will drive racial equality and reform across criminal justice and public safety. 

This solution addresses 2 hills related to the problem statement above:

1: The public will have access to factual data on police behavioural infractions so that police officers can be held publicly accountable for their actions.
Law enforcement agencies have access to free technology which identifies both singular incidents and behavioural patterns so that regular data-driven evaluations of policing outcomes take place.

2: At the heart of the solution resides an intelligent visualisation system, based around a map view which makes it easy for users to find single or grouped incidents. In order to facilitate the capture of incidents, a mobile application will also be created with the ability to recognise and react to different circumstances (e.g. stop and search, car stops etc). Over time API's could be developed in order to capture data from additional sources such as existing mobile applications and social media.

In order to process the information captured, we will investigate the use of AI (video analytics, speech to text, natural language understanding, sentiment analysis, tone analysis and visual recognition).

### How can technology help ?

## Video
*** <INSERT-VIDEO> ***


## The Idea

<p align="center">
<img width="700" alt="image" src="https://user-images.githubusercontent.com/22552553/90105423-ca009200-dd3d-11ea-80cc-637b21e6be54.png">
</p>

We are team "Fair Change." The inspiration behind this starter kit comes from the lived experience of some of our team members who have been subject to unprovoked physical mistreatment, harassment, campaigns, and racial abuse from police officers. As we shared our experiences, it became evident to our diverse team residing in both the UK and US that the mistreatment of Black members by the police is widespread.

At the same time, we recognized this is a very complex issue. The job of police officers who genuinely want to serve and protect the community can inherently be made more difficult based on their peers' actions.  This overall can diminishes the trust between the police force and the public. 

This starter kit aims to create a solution that could aid in the avoidance and de-escalation of incidents and provide visibility and long-term education for reform.

At a high level the Fair Change starter kit can : 
  - Enable members of the public to record incidents through a moble app in a quick, near real time and safe manner
  - Capture data such as geo-location, timestamp, incident description, video and audio recordings and potential details such as officer ID numbers
  - Save and Map data on a web application for reporting and AI analysis 

While we recognize that our solution cannot address all of the complex challenges in the current law enforcement practices, we hope that the solution presented in this starter kit can : 
 - Encourage members of the public to capture incidents which may otherwise go unwitnessed.
 - Display patterns and correlations of incidents that can be grouped by time, location, and type to better understand the scenario. 
 - Inspire developers to shed light on this issue and provide them a starting point to develop future reform funtionalities 
 - Educate police officers, community members and corporate partners on the issues of racial injustice and police reform and accountibility



## How it Works
The solution itself focuses on the core functionality of being able to take incident alerts and video recordings from the mobile app and post them into the back-end system. Once posted, the incident will appear on the map view and can be clicked in order to reveal more information. Here is a high-level flow:

## Diagrams

### Mobile Application 

****Insert  Mobile application Architecture Diagram ****  

1. User launches mobile application and records a video
2. The payload (geocode, timestamp, description / type of incident and video) are all passed to the backend which writes json to the Cloudant database and video directly to IBM Cloud Object Storage (COS).


### Web Application 
****Insert  Web application Architecture Diagram ****  
( Include back end service with web application )

1. Incident captured by mobile device and save IBM Cloud Object Storage can be viewed on a map in a web application. 
2. User can click on the popup link within the map to view more detail related to that incident (the link will auto expire after a short period of time to prevent unauthorised sharing).

<img width="1068" alt="image" src="https://user-images.githubusercontent.com/22552553/91962139-09e6e380-ed04-11ea-8f25-0bc43842a07c.png">


## Documents

### Tutorials and documentation:
- ***** Add developer.ibm.com tutuorials and docs referenced ****

## Datasets
- *****Add APIs used ****

## Technology

### IBM technology
- Video storage with IBM Cloud Object Storage (add link)
- Data storage with IBM Cloudant (add link)

### Open source technology
- Google Maps (Add link)
- React Native (Add link)
- [Expo](https://expo.io)
- [Node.js](https://nodejs.org/en/)

## Getting started

### Prerequisite

- Register for an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-communication_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917) account.


### Set up an instance of Cloud Object Storage 

**Step 1: Create a new bucket in Cloud Object Storage**

a) Search for "Cloud Object Storage" within the IBM Cloud catalogue.

<img width="537" alt="image" src="https://user-images.githubusercontent.com/22552553/91419088-e676f100-e84a-11ea-8966-915ba480f988.png">

b) Select the desired plan (the free tier "Lite" plan is fine and you can always use an existing COS instance).

<img width="1274" alt="image" src="https://user-images.githubusercontent.com/22552553/91419283-26d66f00-e84b-11ea-9e8b-d90cca9a8dc1.png">

c) Navigate to the management screen for COS and create a new bucket (a quick start bucket is fine).

<img width="180" alt="image" src="https://user-images.githubusercontent.com/22552553/91419419-4a99b500-e84b-11ea-98d4-d341bcd2430d.png">

Be sure to grab your service credentials.

<img width="1030" alt="image" src="https://user-images.githubusercontent.com/22552553/91420511-b7617f00-e84c-11ea-963b-dc12eb770437.png">



### Set up instance of Cloudant 

**Step 2: Create a Cloundant Database:**

a) Search for "Cloudant" within the IBM Cloud catalogue.

<img width="571" alt="image" src="https://user-images.githubusercontent.com/22552553/91416485-597e6880-e847-11ea-8c54-1b64b8e5785d.png">

b) Select the desired plan (the free tier "Lite" plan is fine and you can always use an existing Cloudant instance).

<img width="1060" alt="image" src="https://user-images.githubusercontent.com/22552553/91416798-cb56b200-e847-11ea-953c-632f2bcd5bea.png">

c) Click "create" and your new instance will deploy. Remember to note the service ceedentials, you'll need those in order to update the config file (see step 3 below).

<img width="336" alt="image" src="https://user-images.githubusercontent.com/22552553/91417046-1d97d300-e848-11ea-9948-adc76dd62eb2.png">

d) Launch the Cloudant management dashboard using the button on the top right hand side of the screen. Then create a new database (the create database button is also on the top right of the screen).

Name your database and choose non-partitioned.

<img width="227" alt="image" src="https://user-images.githubusercontent.com/22552553/91418351-ed513400-e849-11ea-8903-00ee0eb147fe.png">
<img width="169" alt="image" src="https://user-images.githubusercontent.com/22552553/91418536-2ee1df00-e84a-11ea-88c9-576c02170bc4.png">
<img width="345" alt="image" src="https://user-images.githubusercontent.com/22552553/91418672-5f297d80-e84a-11ea-8e0d-5371b480e3d3.png">

**Step 3: Update the config file with your Cloudant & COS credentials**

The script file can be found here: (add link) and should be added to the "backend" folder. The credentials will automatically get picked up in ther backend config when you run the start script.

`{
  "Your Cloudant DB Name": {
    "apikey": "xxx",
    "host": "xxx",
    "iam_apikey_description": "Auto-generated for key xxx",
    "iam_apikey_name": "your api key name",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
    "iam_serviceid_crn": "xxx",
    "url": "xxx",
    "username": "xxx",
    "dbName": "your DB name"
  },
  "logging": {
    "level": "debug",
    "consoleEnabled": true,
    "piiFilter": [
      "decryptedToken",
      "authorization",
      "hostname"
    ]
	},
	"cloudObjectStorage": {
		"bucketName": "your bucket name",
		"apikey": "xxx",
		"apiKeyId": "xxx",
		"cos_hmac_keys": {
			"access_key_id": "xxx",
			"secret_access_key": "xxx"
		},
		"endpoints": "xxx",
		"endpoint": "xxx",
		"iam_apikey_description": "xxx",
		"iam_apikey_name": "your api key name",
		"iam_role_crn": "xxx",
		"iam_serviceid_crn": "xxx",
		"resource_instance_id": "xxx",
		"serviceInstanceId": "xxx"
	}
}`


### Mobile App

The mobile application is built using React Native and will run on either iOS or Android. In the future it would be prudent to include voice activation for the mobile app (see prototype) in order to cater for scenarios where it is not safe or not legal for users to use their mobile device by hand.

[Follow these instructions for setting up mobile app](./mobile/README.md)

### Web Appliciation Back-end

The back end is built in Node JS and handles the following:

o	Writing of data from the mobile app to the Cloudant DB.
o	Writing of video from the mobile app to IBM COS.
o	Reading of data by the web site in order to populate the map view and also to view further data related to an incident / video URL.

[Follow these instructions for setting up the web application's back end](./backend/README.md)

### Web Appliciation Front-end

The main purpose of the website is to host the map view and search capability. The map is built using Leaflet and the site itself is built using React.

[Follow these instructions for setting up the web application's front end ](./website/readme.md)

## Disclosures

## License

This solution starter is made available under the -----(LICENSE).


