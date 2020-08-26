**Call for Code - Police & Judicial Reform and Accountability**

**Problem Statement**

From traffic stops and arrests to sentencing and parole decisions, use technology to better analyse real-world data, provide insights and make recommendations that will drive racial equality and reform across criminal justice and public safety. 

This solution addresses 2 hills related to the problem statement above:

1: The public will have access to factual data on police behavioural infractions so that police officers can be held publicly accountable for their actions.
Law enforcement agencies have access to free technology which identifies both singular incidents and behavioural patterns so that regular data-driven evaluations of policing outcomes take place.

2: At the heart of the solution resides an intelligent visualisation system, based around a map view which makes it easy for users to find single or grouped incidents. In order to facilitate the capture of incidents, a mobile application will also be created with the ability to recognise and react to different circumstances (e.g. stop and search, car stops etc). Over time API's could be developed in order to capture data from additional sources such as existing mobile applications and social media.

In order to process the information captured, we will investigate the use of AI (video analytics, speech to text, natural language understanding, sentiment analysis, tone analysis and visual recognition).

**The Idea:**

<img width="700" alt="image" src="https://user-images.githubusercontent.com/22552553/90105423-ca009200-dd3d-11ea-80cc-637b21e6be54.png">

We are team “Fair Change” and our inspiration came from the lived experience of some of our team members who have been subject to unprovoked physical mistreatment, harassment campaigns and racial abuse from police officers. As we shared our experiences, it became evident to our diverse team residing in the UK and US that the issue of Black members of the public being mistreated by the police is wide spread. 

<img width="500" alt="image" src="https://user-images.githubusercontent.com/22552553/90105530-f61c1300-dd3d-11ea-823a-1fb49a2e877a.png">

At the same time we recognised through interviews with police officers and potential users of the solution, that this is a very complex issue. For officers who genuinely want to “serve and protect” the job can be made inherently more difficult based on the actions of their peers and the damage this can do to trust between the police force and members of the public. So we wanted to create something which could act as an aid towards the avoidance and de-escalation of incidents as well as providing visibility and long term education for the purpose of reform.

**At a high level the solution aims to do the following:**

o	Enable members of the public to record incidents (stop and search, car stop, observing an incident) in a quick, near real time and safe manner (e.g. using voice activation where necessary to avoid reaching into pockets).

o	The data captured (geo-location, timestamp, incident description / type, video / audio and potentially details like the officer ID number(s)), will be sent to a “back-end system for reporting and longer term, AI based analysis.

o	As you will see in some of the prototype videos, we are also considering how this information could be used in order to help provide advice and guidance to police officers.

Whilst we recognise our solution cannot address all of the complex challenges which exist in the current law enforcement practices, we do see that change has to start somewhere. By providing the base functionality in this Minimum Viable Product (MVP) we hope that…..

o	Members of the public are able to capture incidents which may otherwise go unwitnessed.

o	Upstanders feel empowered to capture and report incidents they observe.

o	By sending data straight to the back-end system there is less opportunity for data to be deleted, tampered with or “lost”.

o	The advice given to many Black members of the public is to keep their own record of stop and search / similar activity and so the solution can effectively serve this purpose for individuals.

o	Members of the public can receive real time guidance to help reduce the chances of escalation.

o	Members of the public can potentially avoid areas in which high levels of police harassment occur.

o	Incidents can be grouped by time / location / incident type in order for members of the public, police officials and NGO’s to better understand the spread or concentration of incidents.

o	Comparisons between incidents captured by members of the public and other sources e.g. local authority / government can be cross examined.

o	The data could be used to help with longer term education for police officers and feed into the reform process.

Ultimately, if this solution can prevent even one incident from escalating we view that as success.

**Solution:**

**Skills & Technologies Required**

1: The mobile application is built using React Native (it is possible to run in an emulator or Expo (https://expo.io).

2: The backend is built using Node.js. This can be run locally or on the IBM Cloud (we currently run in an Openshift Cluster).

3: The website is built using React and Google Maps (earlier versions used Leaflet maps). Again this can run locally or in an Openshift environment.

4: The database is Cloudant (lite Tier) running on the IBM Cloud.

5: The storage for videos is IBM Cloud Object Storage. A free tier is available.

The solution itself focuses on the core functionality of being able to take incident alerts and video recordings from the mobile app and post them into the back-end system. Once posted, the incident will appear on the map view and can be clicked in order to reveal more information. Here is a high-level flow:

1.	The user records an incident on their mobile device.

2.	The payload (geocode, timestamp, description / type of incident and video) are all passed to the backend which writes json to the Cloudant database and video directly to IBM Cloud Object Storage (COS).

3.	The incident can then be viewed on the map view which resides on a website.

4.	The user can click on the popup link within the map view in order to view more detail related to that incident (the link will auto expire after a short period of time to prevent unauthorised sharing).

<img width="500" alt="image" src="https://user-images.githubusercontent.com/22552553/90105539-fb795d80-dd3d-11ea-8575-a25f0fdc564c.png">

**Mobile App:**

The mobile application is built using React Native and will run on either iOS or Android. In the future it would be prudent to include voice activation for the mobile app (see prototype) in order to cater for scenarios where it is not safe or not legal for users to use their mobile device by hand.

**Back-end:**

The back end is built in Node JS and handles the following:

o	Writing of data from the mobile app to the Cloudant DB.
o	Writing of video from the mobile app to IBM COS.
o	Reading of data by the web site in order to populate the map view and also to view further data related to an incident / video URL.

**Website:**

The main purpose of the website is to host the map view and search capability. The map is built using Leaflet and the site itself is built using React.

**Mobile app recording view:**

<img width="350" alt="image" src="https://user-images.githubusercontent.com/22552553/90105555-ffa57b00-dd3d-11ea-9dc3-0c68cb86cb4f.png">

**Map view with one record highlighted:**

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105569-03d19880-dd3e-11ea-8a46-de4318ade459.png">

**User Research Examples:
Member of the public who is subject to police harassment**

<img width="450" alt="image" src="https://user-images.githubusercontent.com/22552553/90105648-2a8fcf00-dd3e-11ea-856e-315223084a53.png">

**Lisa’s user journey:
AS-IS Experience**

<img width="786" alt="image" src="https://user-images.githubusercontent.com/22552553/90106697-b524fe00-dd3f-11ea-81c7-0967dbce6bb2.png">

<img width="798" alt="image" src="https://user-images.githubusercontent.com/22552553/90106867-ebfb1400-dd3f-11ea-8589-65b48ea2640c.png">

**Lisa’s Use Case Diagram** - Scenario: Being followed or stopped by the police

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105666-324f7380-dd3e-11ea-8533-79edad900613.png">

**The user:
The Upstander/Observer**

<img width="450" alt="image" src="https://user-images.githubusercontent.com/22552553/90105694-3d0a0880-dd3e-11ea-972f-280921e53fac.png">

**Sheila’s Use Case Diagram** - Scenario: Observing someone being followed or stopped by the police

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105704-42ffe980-dd3e-11ea-9853-f347357bc381.png">

**The user:
The Vulnerable Citizen**

<img width="450" alt="image" src="https://user-images.githubusercontent.com/22552553/90105728-4e531500-dd3e-11ea-8172-66ad5abf8ea8.png">

**Scott’s Use Case Diagram** – Scenario: Being stopped by the police**

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105739-54e18c80-dd3e-11ea-9722-55e6f0d8f3ae.png">

**Where next? And wireframes:**

The code contained within this Git Repository is essentially a Minimum Viable Product (MVP). The team focused on getting the base functionality of being able to capture location details, timestamps, incident descriptions and video. Furthermore the incidents can be viewed in the map view and videos can also be accessed either via the COS instance or the web site.

As with any project of this nature, we also have a list of future enhancements which could form part of future sprints and / or through an open source mechanism. Some examples include:

- Voice activation for logging and recording an incident via the mobile application (hands free is deemed to be safer in various scenarios such as driving).

- Advanced search features for clustering incidents based on location and timestamp for example in order to help form "evidence packages" consisting of multiple submissions to the platform.

- Advanced analytics (Video analytics, audio & speech to text, Natural Language Understanding models and techniques such as entity extraction). This would help automatically gather more information on the incidents captured and over time could feed into machine learning models to help understand escalation patterns and education / reform models.

- Over time, if real-time video streaming was made available, along with feeds from other sources (e.g. scanners, social media feeds), it may be possible to create intervention procedures especially if the platform is linked to police systems.

**Additional use case scenarios**

The diagrams below represent some of the additional scenarios which could be built into the mobile application and back-end.

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105747-590daa00-dd3e-11ea-9af3-f7b8be165a10.png">

**Different scenarios (detailed)**

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105790-67f45c80-dd3e-11ea-9f34-7ee4a01aa2cb.png">

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105846-7a6e9600-dd3e-11ea-9af7-51e6451be6b3.png">

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105867-822e3a80-dd3e-11ea-9c32-275f346ff081.png">

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105893-8c503900-dd3e-11ea-9df6-db30b89e95c8.png">

**The team**

**Product Managers:** Boz Handy Bosma & James Stewart

**Architects:** Cyril Grant & Jodith Fecadu Tefferi

**User Research:** Tessa Olson, Jan Sinclair, Chantelle Omotosho, Jimi Agoro, Antoinette Santos & Enoch Antwi

**Development:** Brandon Davis, Nial Cargill, Simeon Charles, Kyleni Rivers & David Zuniga

**IP Development** Natalie Brooks

**Special Thanks** Cedric Cook





