# Building Mobile App
The mobile application is built using React Native and will run on either iOS or Android.The purpose of the mobile app is to record real time incidents to and to submit this data to the Fair Change Incident directory.

## Learning objectives

In this tutorial, you will:
- Learn how to stand up a React Native Mobile
- Connect the back-end application and the front-end application to the mobile app
- Test and run the application 

## Prerequisites

To complete the steps in this tutorial you need to complete all the steps to get the back-end application running as well as the front end application running  

- [Follow these instructions for setting up the web application's back end locally or on the cloud](https://github.com/embrace-call-for-code/fairchange/blob/master/backend/README.md)
- [Follow these instructions for setting up the web application's front end locally or on the cloud](https://github.com/embrace-call-for-code/fairchange/blob/master/website/readme.md)

You will also need to install [Expo](https://expo.io) 
```
npm install expo-cli --global
```
To run this application on an iOS simulator make sure you have [Xcode](https://www.google.com/search?client=firefox-b-1-d&q=xcode+for+mac) installed on your mac


## Estimated Time 
This tutorial will take you about 30 minutes to complete.

## Steps

1. 
- If you are running locally - go to the `backend` folder and run the backend application with ``` npm run dev ``` 
   Your app should be running at ```http://localhost:3000/```  
    - See [these steps](https://github.com/embrace-call-for-code/fairchange/blob/master/backend/README.md#configuring-the-application) to learn how to run your back-end locally    

- If you are running your backend application on the cloud make sure you take a note of the url that your app is running on. For example, [(name from manifest file).mybluemix.net](https://(name from manifest file).mybluemix.net/).
    - See [these steps](https://github.com/embrace-call-for-code/fairchange/blob/master/backend/README.md#deploy-to-ibm-cloud-as-a-cloud-foundry-application) to learn how to run your back-end on the cloud. 

2. Once you have your app running locally or on the cloud go to `/mobile/screens/incident.tsx` 
- Change line `106` to include the local url or the cloud url 

![](/images/img29.png)


- Change line `125` to also include the local url or the cloud url 

![](/images/img30.png)

3. Go to the `mobile` folder and make sure you install [Expo](https://expo.io) 
```
npm install expo-cli --global
yarn add expo
```
4. Run Expo by 
```
expo start
```
You will see the following screen open.
<p align="center">
<img width="257" alt="image" src="https://user-images.githubusercontent.com/22552553/91534151-f2c18380-e908-11ea-98b4-e3e7ceb609cd.png">
</p>

You can now run the application using an iOS emulator or by installing the Expo app on your mobile device and simply scanning the QR code.

### Test your deployment

1. Start the app on your mobile device (*Note* the camera will not work in some emulation packages).
2. Hit the "in a situation" or "observing a situation" button.
<p align="center">
<img width="232" alt="image" src="https://user-images.githubusercontent.com/22552553/91534655-c9552780-e909-11ea-8187-504c5fe01f80.png">
</p>

3. Hit the "start video capture" button.
<p align="center">
<img width="250" alt="image" src="https://user-images.githubusercontent.com/22552553/91534992-60ba7a80-e90a-11ea-8a8f-40c58863622b.png">
</p>

4. Hit the "stop video capture" button and then "Submit"

<p align="center">
<img width="250" alt="image" src="https://user-images.githubusercontent.com/22552553/91535289-d58db480-e90a-11ea-8a2f-044effc343d9.png">
</p>

5. View the map and scroll to your location. You should see a new pin on the map. Click on the pin to view the incident details.

<p align="center">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/22552553/91535569-41701d00-e90b-11ea-9738-7a23fd51e2de.png">
</p>

The map also features search capabilities. We uploaded some sample incidents in order to show how clusters of incidents could be shown on the map for each country / state.

<p align="center">
<img width="1281" alt="image" src="https://user-images.githubusercontent.com/22552553/91536345-7f217580-e90c-11ea-9f1e-e269da3b7d91.png">
</p>


### Videos

The videos currently get stored in the COS bucket, one enhancement being worked on is to view the video within the website (see screen shot below). It is possible however to download the object from COS (change the file to mp4) and then view the video as proof it was uploaded to the back-end.

<p align="center">
<img width="800" alt="image" src="https://user-images.githubusercontent.com/22552553/91536053-0cb09580-e90c-11ea-89a3-a211388657d8.png">
</p>
