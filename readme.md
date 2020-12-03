# Fair Change Solution Starter
This solution starter was created by technologists from IBM. The goals of this starter kit is to provide a solution for the theme of Police & Judicial Reform and Accountability. 

## Authors 
**Product Managers:** 
- John Handy Bosma (Boz)
- James Stewart

**Architects** 
- Jodith Fecadu Tefferi
- Cyril Grant

**User Researchers & SME's:** 
- Tessa Olson
- Jan Sinclair
- Chantelle Omotosho
- Denise Knorr
- Enoch Antwi
- Jimi Agoro
- Avian Briscoe
- Cedric Cook
- Sabine Justilien

**Development** 
- Kyleni Rivers
- Niall Cargill
- Brandon Davis
- David Zuniga Rojas
- Simeon Charles

- Special thanks to Pooja Mistry Developer Advocate

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

"Racism isn't getting worse, it's getting filmed" - Will Smith.

The sad reality is that police interactions with members of the Black community disproportionately end in unnecessary and avoidable escalation. Unless such interactions are captured, catalogued and analyzed, informed change, re-education and true reform will not be possible.

Whether related to routine traffic stops, stop and search or other scenarios, we aim to use technology for good to capture real-world data, provide insights and make recommendations that will drive racial equality. The key intentions behind this solution starter kit are to help enable transparency, re-education and reform as a matter of public interest and public safety. Over time, equipping good officers with information to perform their duties without bias.

At the heart of the solution resides an intelligent visualisation system, based around a map view which makes it easy for users to find single or grouped incidents. In order to facilitate the capture of incidents, a mobile application has also been created with the ability to capture incidents on behalf of a "contacted person" or an “upstander”. The solution also contains an API which could be used in order to capture data from additional sources such as existing mobile applications.


## Video
*** <INSERT-VIDEO> ***


## The Idea

<p align="center">
<img width="700" alt="image" src="https://user-images.githubusercontent.com/22552553/94920315-fae38480-04ad-11eb-8f66-3c09d060e427.png">
</p>

We are team "Fair Change". The inspiration behind this starter kit comes from the lived experience of some of our team members who have been subject to unprovoked physical mistreatment, harassment, campaigns, and racial abuse from police officers or members of the public who intend to "weaponise" the police against Black and minority individuals or communities. As we shared our experiences, it became evident to our diverse team residing in both the UK and US that the mistreatment of Black communities by the police is widespread.

At the same time, we recognized this is a very complex issue. The job of police officers who genuinely want to serve and protect the community can inherently be made more difficult based on their peers' actions.  This can diminish the overall trust between the police force and the public. 

This starter kit aims to create a solution that could aid in the avoidance and de-escalation of incidents and provide visibility and opportunities for long-term education for reform.

At a high level the Fair Change starter kit can : 
  - Enable members of the public to record incidents through a mobile app in a quick, near real time and safe manner
  - Capture data such as geo-location, timestamp, incident description, video and audio recordings and potential details such as officer ID numbers
  - Save and Map data on a web application for reporting and future AI analysis (AI is a roadmap item at this stage)

While we recognize that our solution cannot address all of the complex challenges in current law enforcement practices, we hope that the solution presented in this starter kit can : 
 - Encourage members of the public to capture incidents which may otherwise go unwitnessed.
 - Display patterns and correlations of incidents that can be grouped by time, location, and type to better understand the scenario. 
 - Inspire developers to shed light on this issue and provide them a starting point to develop future reform functionalities.
 - Educate police officers, community members and corporate partners on the issues of racial injustice, police reform and accountibility.



## How it Works
The solution itself focuses on the core functionality of being able to take incident alerts and video recordings from the mobile app and post them into the back-end system. Once posted, the incident will appear on the map view and can be clicked in order to reveal more information. For privacy reasons, the intent is not to show the videos within the web application, just the location, time and type of incident. The video is however stored (encrypted on Cloud Object Storage) in order to enable future AI analysis to take place. Here is a high-level flow:

- The user captures video, geo-coordinates, timestamp and an incident description using the mobile application.
- The video and other data is tranferred securely to the backend via the API.
- Video is stored in Cloud Object Storage and the other data is stored in the Cloudant DB.
- The web application facilitates the viewing of incident related data held in the DB via the API.

## Diagrams

 
![](/images/img31.png)

1. User launches mobile application , records a video and submits incident data. 

2. The geocode, timestamp, description and video are all passed to the backend with a POST `api/upload` call which writes json to the Cloudant database and video directly to IBM Cloud Object Storage. Video data is stored in the IBM Cloud Object Storage. Geocode,timestamp and description are all stored in the Cloudant database

3. Incident captured by mobile device and the data saved IBM Cloud Object Storage and Cloudant can be viewed on a map in the Node.js web application. 

4. User can click on the geocode data on the map in web application to view more detail related to that incident such as timestamp, description and location.

## Documents

### Tutorials and documentation:
- [Getting started with IBM Cloud Object Storage](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-getting-started-cloud-object-storage)
- [Getting started with IBM Cloudant](https://cloud.ibm.com/docs/Cloudant)

## Datasets
- [Police Brutality Data Set](https://github.com/2020PB/police-brutality)

## Technology

### IBM technology
- [IBM Cloud Object Storage](https://cloud.ibm.com/catalog/services/cloud-object-storage)
- [IBM Cloudant](https://cloud.ibm.com/catalog/services/cloudant)

### Open source technology
- [Google Maps](https://developers.google.com/maps/documentation/embed/get-api-key)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io)
- [Node.js](https://nodejs.org/en/)

## Getting started

### Prerequisite
Register for an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-communication_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917) account.

### Provision Instance of Cloud Object Storage on IBM Cloud
Log in to IBM Cloud and provision a Cloud Object Storage Service.

**Step 1.** From the [IBM Cloud catalog](https://cloud.ibm.com/catalog/), search for  an instance of **Object Storage**.

  ![](/images/img4.png)

**Step 2.** Give your service a name and create a `Lite` version of the service 

 ![](/images/img5.png)

**Step 3.** Once you have the object storage service created go to your service in your `Dashboard` and  click on `Create a bucket` in the `Getting Started` tab

 ![](/images/img6.png)

**Step 4.** Click on `Create a Custom Bucket` . Give your bucket a unique name and select `Smart Tier`. Create Bucket.

 ![](/images/img7.png)

**Step 5.** Go to the `Service Credentials` tab and click on `New Credential`. Give your Service Credentials a name. Select role as `Writer` . Select Advanced Options and set `Include HMAC Credential` as ON. Add your service credentials. 

 ![](/images/img8.png)

 **Step 6.** Take a note of your Service Credentials for the [Web Appliciation Back-end](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/readme.md#web-appliciation-back-end)

  ![](/images/img9.png)

### Provision Instance of Cloudant on IBM Cloud
**Step 1.** Go back to [IBM Cloud catalog](https://cloud.ibm.com/catalog/) and search for an instance of **Cloudant** 
 
  ![](/images/img10.png)

**Step2.** Give Service a name and create a `Lite` instance of Cloudant
 
 ![](/images/img11.png)

**Step 3.** Once your instance of Cloudant is created click on `Launch Dashboard`

 ![](/images/img12.png)

**Step 4.** Once Cloudant Dashboard is lauched click `Create Database` 

![](/images/img13.png)

**Step 5.** Give database a name and select `Non-partitioned` . Click `Create`. 

<p align="center">
<img width="300" height = "600" alt="image" src="https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/images/img14.png">
</p>

**Step 6.** Go back to the cloudant service page and create New Service Credentials. Select role as `Manager` and take a note of your service credentials for the [Web Appliciation Back-end](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/readme.md#web-appliciation-back-end) 

![](/images/img15.png)


### Web Appliciation Back-end

The back end is built in Node JS and handles the following:

- Writing of data from the mobile app to the Cloudant DB.
- Writing of video from the mobile app to IBM Cloud Object Storage (COS).
- Reading of data by the Fair Change Website in order to populate the map view and also to view further data related to an incident / video URL.

[Follow these instructions for setting up the web application's back end](./backend/README.md)

### Web Appliciation Front-end

The main purpose of the Fair Change website is to host the map view and search capability. The map is built using Google Maps and the site itself is built using React.

[Follow these instructions for setting up the web application's front end ](./website/readme.md)

### Mobile App

The mobile application is built using React Native and will run on either iOS or Android.The purpose of the mobile app is to record real time incidents to and to submit this data to the Fair Change Incident directory.  

[Follow these instructions for setting up mobile app](./mobile/README.md)


## Disclosures

## License

This solution starter is made available under the Apache LICENSE.


