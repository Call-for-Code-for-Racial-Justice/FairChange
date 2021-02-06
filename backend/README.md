# Building Web Application Back-End
The back end is built in Node JS and handles the following:

- Writing of data from the mobile app to the Cloudant DB.
- Writing of video from the mobile app to IBM Cloud Object Storage (COS).
- Reading of data by the Fair Change Website in order to populate the map view and also to view further data related to an incident / video URL.


## Learning objectives

In this tutorial, you will:
- Learn how to connect Cloud Object Storage and Cloudant services to the back-end application.
- Populate data into Cloudant database
- Test and run this app locally 
- Deploy application to IBM Cloud 


## Prerequisites

To complete the steps in this tutorial you need:
1. Sign up for an [IBM Cloud Account](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-communication_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917)
2. [Provision Instance of Cloud Object Storage on IBM Cloud](https://github.com/embrace-call-for-code/fairchange/tree/starter-kit#provision-instance-of-cloud-object-storage-on-ibm-cloud)
3. [Provision Instance of Cloudant on IBM Cloud](https://github.com/embrace-call-for-code/fairchange/tree/starter-kit#provision-instance-of-cloudant-on-ibm-cloud)

## Estimated Time 
This tutorial will take you about 30 minutes to complete.

## Steps
The following assumes you have gone through the prerequisites.
### Configuring the application

1. Clone the repository and cd into backend folder.

2. Make a `configuration.json` file

``` touch configuration.json ```

3. Copy the following json into your newly created `configuration.json` file and add in the following information from your [Cloudant](https://github.com/embrace-call-for-code/fairchange/tree/starter-kit#provision-instance-of-cloudant-on-ibm-cloud) (Step 6) and your [Cloud Object Storage](https://github.com/embrace-call-for-code/fairchange/tree/starter-kit#provision-instance-of-cloud-object-storage-on-ibm-cloud) (Step 6) services   

``` {
    "fairChangeDb": {
        "apikey": "<Cloudant apikey>",
        "host": "<Cloudant host> ",
        "iam_apikey_description": "<Cloudant iam_apikey_description>",
        "iam_apikey_name": "<Cloudant iam_apikey_name>",
        "iam_role_crn": "<Cloudant iam_role_crn>",
        "iam_serviceid_crn": "<Cloudant iam_serviceid_crn>",
        "url": "<Cloudant url>",
        "username": "<Cloudant username>",
        "dbName": "<Cloudant dbName>"
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
          "bucketName": "<cloudObjectStorage bucketName>",
          "apikey": "<cloudObjectStorage apikey>",
          "cos_hmac_keys": {
            "access_key_id": "<cloudObjectStorage access_key_id>",
            "secret_access_key": "<cloudObjectStorage secret_access_key>"
          },
          "endpoints": "<cloudObjectStorage endpoints>",
          "endpoint": "s3.us-east.cloud-object-storage.appdomain.cloud",
          "iam_apikey_description": "<cloudObjectStorage iam_apikey_description>",
          "iam_apikey_name": "<cloudObjectStorage iam_apikey_name>",
          "iam_role_crn": "<cloudObjectStorage iam_role_crn>",
          "iam_serviceid_crn": "<cloudObjectStorage iam_serviceid_crn>",
          "resource_instance_id": "<cloudObjectStorage resource_instance_id>"
         
      }
  } 
  
  ```

4. Populate your database with data. Map data can be found [here](https://github.com/embrace-call-for-code/fairchange/blob/starter-kit/website/components/common/map.dataBetter2.json)

```npm install couchimport
export COUCH_URL=<Cloudant url>
export IAM_API_KEY=<Cloudant apikey>
export COUCH_DATABASE=<Cloudant dbName>
cat ../website/components/common/map.dataBetter2.json | ./node_modules/.bin/couchimport --database <Cloudant dbName> --type jsonl

```

Once the data is populated you should see : 

![](/images/img16.png)

If you go back to your  cloudant database you should see that the data has been imported

![](/images/img17.png)

5. Once data has been imported, install the dependencies:
`npm install` 

6. Run the application:
`npm run dev` 

7. View the backend data in a browser at `http://localhost:3000/api/getIncidents`

![](/images/img18.png)

`http://localhost:3000/` should give you the Fairchange API docs 

![](/images/img21.png)


Congratulations, you have the backend up and running locally! [Now you can follow these instructions for setting up the web application's front end running locally](https://github.com/embrace-call-for-code/fairchange/blob/master/website/readme.md) 

## Deploy to IBM Cloud as a Cloud Foundry application

## Prerequisites
[Install IBM CLI](https://cloud.ibm.com/docs/cli?topic=cli-getting-started) 

## Steps

1. Go to `backend` folder and edit *manifest.yml* file. Change the **name** field to something uniqe. Once the name is changed run build.  

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

5. View the application online at the app URL. For example, [appName-Backend.mybluemix.net](https://appName.mybluemix.net/).

![](/images/img21.png)

6. View the application from IBM Cloud by searching for your app's name and then `Visiting App URL`

![](/images/img25.png)


Congratulations, you have the backend up and running on IBM Cloud! [Now you can follow these instructions for setting up the web application's front end running on IBM Cloud](https://github.com/embrace-call-for-code/fairchange/tree/master/website#deploy-to-ibm-cloud-as-a-cloud-foundry-application) 

