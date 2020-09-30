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


### Provision Instance of Cloud Object Storage on IBM Cloud
Log in to IBM Cloud and provision a Cloud Object Storage Service.

**Step 1.** From the [IBM Cloud catalog](https://cloud.ibm.com/catalog/), search for  an instance of **Object Storage**.
  ![](/images/img4.png)

**Step 2.** Give your service a name and create a `Lite` version of the service 
 ![](/images/img5.png)

**Step 3.** Once you have the object storage service created go to your service in your `Dashboard` and  click on `Create a bucket` in the `Getting Started` tab  
 ![](/images/img6.png)

**Step 4.** Click on `Create a Custom Bucket` . Give your bucket a unique name and select `Smart Tier` 
 ![](/images/img7.png)

**Step 5.** Go to the `Service Credentials` tab and click on `New Credential`. Give your Service Credentials a name. Select role as `Writer` . Select Advanced Options and set `Include HMAC Credential` as ON. Add your service credentials. 
 ![](/images/img8.png)

 **Step 6.** Take a note of your Service Credentials for the [Web Appliciation Back-end](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/readme.md#web-appliciation-back-end)
  ![](/images/img9.png)


### Web Appliciation Back-end

The back end is built in Node JS and handles the following:

o	Writing of data from the mobile app to the Cloudant DB.
o	Writing of video from the mobile app to IBM COS.
o	Reading of data by the web site in order to populate the map view and also to view further data related to an incident / video URL.

[Follow these instructions for setting up the web application's back end](./backend/README.md)

### Web Appliciation Front-end

The main purpose of the website is to host the map view and search capability. The map is built using Google Maps and the site itself is built using React.

[Follow these instructions for setting up the web application's front end ](./website/readme.md)

### Mobile App

The mobile application is built using React Native and will run on either iOS or Android. In the future it would be prudent to include voice activation for the mobile app (see prototype) in order to cater for scenarios where it is not safe or not legal for users to use their mobile device by hand.

[Follow these instructions for setting up mobile app](./mobile/README.md)


## Disclosures

## License

This solution starter is made available under the -----(LICENSE).


