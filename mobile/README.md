**Mobile app recording view:**

<img width="350" alt="image" src="https://user-images.githubusercontent.com/22552553/90105555-ffa57b00-dd3d-11ea-9dc3-0c68cb86cb4f.png">

**Map view with one record highlighted:**

<img width="600" alt="image" src="https://user-images.githubusercontent.com/22552553/90105569-03d19880-dd3e-11ea-8a46-de4318ade459.png">

**Step 6: Start the mobile app in Expo**

Dowlaod Expo (https://expo.io)

1) `npm install expo-cli --global`
2) `yarn add expo`
3) `cd mobile`
4) `expo start`

You will see the following screen open.

<img width="257" alt="image" src="https://user-images.githubusercontent.com/22552553/91534151-f2c18380-e908-11ea-98b4-e3e7ceb609cd.png">

You can now run the application using an emulator or by installing the Expo app on your mobile device and simply scanning the QR code.

**Step 7: Test your deployment**

1) Start the app on your mobile device (note the camera will not work in some emulation packages).
2) Hit the "in a situation" or "observing a situation" button.

<img width="232" alt="image" src="https://user-images.githubusercontent.com/22552553/91534655-c9552780-e909-11ea-8187-504c5fe01f80.png">

3) Hit the "start video capture" button.

<img width="250" alt="image" src="https://user-images.githubusercontent.com/22552553/91534992-60ba7a80-e90a-11ea-8a8f-40c58863622b.png">

4)Hit the "stop video capture" button and then "Submit"

<img width="250" alt="image" src="https://user-images.githubusercontent.com/22552553/91535289-d58db480-e90a-11ea-8a2f-044effc343d9.png">

5) View the map and scroll to your location. You should see a new pin on the map. Click on the pin to view the incident details.

<img width="800" alt="image" src="https://user-images.githubusercontent.com/22552553/91535569-41701d00-e90b-11ea-9738-7a23fd51e2de.png">

The map also features search capabilities. We uploaded some sample incidents in order to show how clusters of incidents could be shown on the map for each country / state.

<img width="1281" alt="image" src="https://user-images.githubusercontent.com/22552553/91536345-7f217580-e90c-11ea-9f1e-e269da3b7d91.png">

**Videos**

The videos currently get stored in the COS bucket, one enhancement being worked on is to view the video within the website (see screen shot below). It is possible however to download the object from COS (change the file to mp4) and then view the video as proof it was uploaded to the back-end.

<img width="800" alt="image" src="https://user-images.githubusercontent.com/22552553/91536053-0cb09580-e90c-11ea-89a3-a211388657d8.png">
