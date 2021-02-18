# Fair Change Solution Starter
This solution starter was created by technologists from IBM. The goal of this starter kit is to provide a solution for the theme of Police & Judicial Reform and Accountability. 

## Authors 
**Product Managers:** 
- John Handy Bosma (Boz)
- James Stewart

**Architects** 
- Jodith Fecadu Tefferi
- Cyril Grant

**User Researchers & SMEs:** 
- Tessa Olson
- Jan Sinclair
- Chantelle Omotosho
- Denise Knorr
- Enoch Antwi
- Jimi Agoro
- Avian Briscoe
- Cedric Cook
- Sabine Justilien
- Otis Smart

**Development** 
- Kyleni Rivers
- Niall Cargill
- Brandon Davis
- David Zuniga Rojas
- Simeon Charles

- Special thanks to Pooja Mistry, Developer Advocate

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

"Racism isn't getting worse, it's getting filmed." - Will Smith.

The sad reality is that police interactions with members of the Black community disproportionately end in unnecessary and avoidable escalation. Unless such interactions are captured, catalogued, and analyzed, informed change, re-education, and true reform will not be possible.

Whether related to routine traffic stops, stop and search, or other scenarios, we aim to use technology for good to capture real-world data, provide insights, and make recommendations that will drive racial equality. The key intentions behind this solution starter are to help enable transparency, re-education, and reform as a matter of public interest and public safety. 

The solution forms the foundation for a social and racial justice platform by empowering communities to capture incidents between police and contacted people (for all racial groups), unify incident data from various sources, and gain insights from incident data within a location and/or across locations to aid education and reform. Prospectively, ultimate outcomes of this data-driven solution include accountability and education of law enforcement officers to perform their duties without bias as well as information for individuals, communities, and cities to avoid, deescalate, and eliminate dangerous encounters.

At the heart of the solution resides an intelligent visualisation system, based around a map view that makes it easy for users to find single or grouped incidents. To facilitate the capture of incidents, a mobile application has been created with the ability to capture incidents on behalf of a "contacted person" or an “upstander.” The solution starter also contains an API that could be used to capture data from additional sources such as existing mobile applications.

We're putting the tools in your hands, and our intention is for developers and adopters to use the solution in a responsible, safe, and privacy-preserving manner.

## Video
  
  [![Introducing Fair Change](https://img.youtube.com/vi/btjmQkB3-_w/0.jpg)](https://youtu.be/btjmQkB3-_w)

## The idea

<p align="center">
<img width="700" alt="image" src="https://user-images.githubusercontent.com/22552553/94920315-fae38480-04ad-11eb-8f66-3c09d060e427.png">
</p>

We are team "Fair Change." The inspiration behind this starter kit comes from the experiences of some of our team members who have been subject to unprovoked physical mistreatment, harassment, campaigns, and racial abuse from police officers or members of the public who intend to "weaponise" the police against Black and minority individuals or communities. As we shared our experiences, it became evident to our diverse team residing in both the UK and US that the mistreatment of Black communities by the police is widespread.

At the same time, we recognized that this is a very complex issue. The job of police officers who genuinely want to serve and protect the community can inherently be made more difficult based on their peers' actions. This can diminish the overall trust between the police force and the public. 

The goal of this solution starter is to create a solution that could aid in the avoidance and de-escalation of incidents, and provide visibility and opportunities for long-term education for reform.

At a high level, the Fair Change solution starter can: 
  - Enable members of the public to record incidents through a mobile app in a quick, near real time, and safe manner
  - Capture data such as geo-location, timestamp, incident description, video and audio recordings, and potential details such as officer ID numbers
  - Save and map data on a web application for reporting and future AI analysis (AI is a roadmap item at this stage)

While we recognize that our solution cannot address all of the complex challenges in current law enforcement practices, we hope that the solution presented in this solution starter can: 
 - Encourage members of the public to capture incidents that might otherwise go unwitnessed
 - Display patterns and correlations of incidents that can be grouped by time, location, and type to better understand the scenario.
 - Inspire developers to shed light on this issue and provide them a starting point to develop future reform functionalities
 - Educate police officers, community members, and corporate partners on the issues of racial injustice, police reform, and accountability
 
## How it works

To illustrate how the solution works, we have included explanations, diagrams, and tutorials that feature IBM Cloud Object Storage and an IBM Cloudant database. References to these and other IBM offerings are provided for illustrative purposes only. Additional work needs to be done for implementing the solution on IBM Cloud.

The solution itself focuses on the core functionality of being able to take incident alerts and video recordings from the mobile app and post them into the back-end system. Once posted, the incident will appear on the map view and can be clicked to reveal more information. For privacy reasons, the intent is not to show the videos within the web application, just the location, time, and type of incident. However, the video is stored (encrypted on IBM Cloud Object Storage) to enable future AI analysis to take place. Here is a high-level flow:

- The user captures video, geo-coordinates, the timestamp, and an incident description using the mobile application.
- The video and other data is transferred securely to the back end via the API.
- Video is stored in IBM Cloud Object Storage and the other data is stored in the Cloudant database.
- The web application facilitates the viewing of incident related data held in the database via the API.

## Diagrams

 
![](/images/img31.png)

1. User launches mobile application, records a video, and submits incident data. 

2. The geocode, timestamp, description, and video are all passed to the back end with a POST `api/upload` call, which writes JSON to the Cloudant database and video directly to IBM Cloud Object Storage. Video data is stored in the IBM Cloud Object Storage. The geocode, timestamp, and description are all stored in the Cloudant database

3. The incident captured by the mobile device and the data saved to IBM Cloud Object Storage and Cloudant can be viewed on a map in the Node.js web application. 

4. User can click on the geocode data on the map in the web application to view more detail related to that incident such as timestamp, description, and location.

## Documents

### Tutorials and documentation:
- [Getting started with IBM Cloud Object Storage](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-getting-started-cloud-object-storage)
- [Getting started with IBM Cloudant](https://cloud.ibm.com/docs/Cloudant)

## Data sets
- [Police Brutality Data Set](https://github.com/2020PB/police-brutality)

## Technology

### IBM technology (for example purposes only)
- [IBM Cloud Object Storage](https://cloud.ibm.com/catalog/services/cloud-object-storage)
- [IBM Cloudant](https://cloud.ibm.com/catalog/services/cloudant)

Adopters of the code can choose the deployment option that is right for them. We anticipate additional choices being made available as described [here](https://github.com/Call-for-Code-for-Racial-Justice/fairchange/issues/28).

### Open source technology
- [Google Maps](https://developers.google.com/maps/documentation/embed/get-api-key)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io)
- [Node.js](https://nodejs.org/en/)

## Getting started

### Prerequisite
Register for an IBM Cloud account. For the purpose of this example, we are using an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-communication_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917) account with the associated IBM Cloud Services (Cloud Object Storage and Cloudant).

### Provision instance of Cloud Object Storage on IBM Cloud
Log in to IBM Cloud and provision an IBM Cloud Object Storage Service.

**Step 1.** From the [IBM Cloud catalog](https://cloud.ibm.com/catalog/), search for an instance of **Object Storage**.

  ![](/images/img4.png)

**Step 2.** Give your service a name, and create a `Lite` version of the service.

 ![](/images/img5.png)

**Step 3.** After you have the IBM Cloud Object Storage service created, go to your service in your `Dashboard`, and click on `Create a bucket` in the `Getting Started` tab.

 ![](/images/img6.png)

**Step 4.** Click on `Create a Custom Bucket`. Give your bucket a unique name, and select `Smart Tier`. Create Bucket.

 ![](/images/img7.png)

**Step 5.** Go to the `Service Credentials` tab, and click on `New Credential`. Give your Service Credentials a name. Select role as `Writer`. Select Advanced Options, and set `Include HMAC Credential` as ON. Add your service credentials. 

 ![](/images/img8.png)

 **Step 6.** Take a note of your service credentials for the [Web Appliciation back end](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/readme.md#web-appliciation-back-end).

  ![](/images/img9.png)

### Provision instance of Cloudant on IBM Cloud
**Step 1.** Go back to the [IBM Cloud catalog](https://cloud.ibm.com/catalog/), and search for an instance of **Cloudant**.
 
  ![](/images/img10.png)

**Step2.** Give the service a name, and create a `Lite` instance of Cloudant.
 
 ![](/images/img11.png)

**Step 3.** After your instance of Cloudant is created, click on `Launch Dashboard`.

 ![](/images/img12.png)

**Step 4.** After the Cloudant Dashboard is lauched, click `Create Database`.

![](/images/img13.png)

**Step 5.** Give database a name, and select `Non-partitioned`. Click `Create`. 

<p align="center">
<img width="300" height = "600" alt="image" src="https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/images/img14.png">
</p>

**Step 6.** Go back to the Cloudant service page, and create New Service Credentials. Select the role as `Manager`, and take a note of your service credentials for the [Web Appliciation back end](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/readme.md#web-appliciation-back-end).

![](/images/img15.png)

### Web Appliciation back end

The back end is built in Node.js, and handles the following:

- Writing of data from the mobile app to the Cloudant DB
- Writing of video from the mobile app to IBM Cloud Object Storage
- Reading of data by the Fair Change website to populate the map view and also to view further data related to an incident / video URL

[Follow these instructions for setting up the web application's back end](./backend/README.md).

### Web Appliciation front end

The main purpose of the Fair Change website is to host the map view and search capability. The map is built using Google Maps, and the site itself is built using React.

[Follow these instructions for setting up the web application's front end](./website/readme.md).

### Mobile app

The mobile application is built using React Native and will run on either iOS or Android. The purpose of the mobile app is to record real-time incidents and to submit this data to the Fair Change Incident directory.  

[Follow these instructions for setting up mobile app](./mobile/README.md).


## Disclosures

## License

This solution starter is made available under the Apache LICENSE.


