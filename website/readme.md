# Building Web Application Front-End

This tutorial will walk you through the creation of the Fair Change Website Front End. The goal of this website is to show the details of each incidident in a map view. The website is built with React and it uses Google Maps to populate each incident submited from the Mobile app or in  the database.  

## Learning objectives

In this tutorial, you will:
- Learn how to stand up a Node.js React App
- Connect the back-end application with the front-end 
- Test and run the application locally 
- Deploy the application on IBM Cloud as a Cloud Foundry application.

Here is a demo of the final application:
![](/images/img20.png)


## Prerequisites

To complete the steps in this tutorial you need to complete all the steps to get the back-end application running. 

[Follow these instructions for setting up the web application's back end](https://github.com/embrace-call-for-code/fairchange/blob/master/backend/README.md)


## Estimated Time 
This tutorial will take you about 30 minutes to complete.

## Steps
The following steps assume that you have the back-end application up and running. 
## Running locally
Once you have the back-end application up and running you will need to : 

1. Change dirctory and go to the `website` folder 

``` cd website``` 

2. Create a Google Maps API Key  by following these instructions : https://developers.google.com/maps/documentation/embed/get-api-key 

3. Once you have Google Maps API key add your API Key to `const googleMapsApiKey =` (line 7) in the [app.tsx](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/website/app.tsx) file  

4. Once you have set your Google Maps API Key navigate to  `/website/scripts/webpack.config.js` . Line 3 of [webpack.config.js](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/website/scripts/webpack.config.js) includes a constant called apiServer which will be the endpoint where your back-end service is running. 

If your back end service running locally set that variable to `http://[::1]:3000` . If your back end service is running  on the cloud make sure you change that endpoint accordingly to your back-end endpoint. 

5. Install the dependencies:

    ```
    npm install
    ```

6. If you plan to run locally , make sure your back-end is also running and then run the front-end application with:

    ```
    npm run dev
    ```

7. You should see your website running on `http://localhost:9000/` 

![gif1](/images/gif1.gif)



## Deploy to IBM Cloud as a Cloud Foundry application
## Prerequisites
[Install IBM CLI](https://cloud.ibm.com/docs/cli?topic=cli-getting-started) 

## Steps

1. Go to `website` folder and edit *manifest.yml* file. Change the **name** field to something uniqe. Once the name is changed run build.  

    ```
    npm run build
    ```
2. Log in to IBM Cloud with the [IBM Cloud CLI](https://cloud.ibm.com/docs/cli/index.html#overview):
    ```
    ibmcloud login --sso
    ```

3. Target a Cloud Foundry organization and space:

    ```
    ibmcloud target --cf
    ```


4. Deploy the application

    ```
    ibmcloud app push
    ```


5. View the application from IBM Cloud by searching for your app's name. 

![](/images/img26.png)

To connect the backend to the front end go to the `Runtime` tab and then go to the `Environments Variable` tab. You will need to add a environement variable called `API_Server` and set it to the URL for where your backend application is deployed. Once you have added your environment variable, you should refresh your page,restart your service and `Visit App URL` 

![](/images/img27.png)

Congratulations, you have the front-end application up and running on IBM Cloud! 

![](/images/img28.png)


[Now you can follow these instructions for setting up the Mobile App](https://github.com/embrace-call-for-code/fairchange/blob/master/mobile/README.md) 