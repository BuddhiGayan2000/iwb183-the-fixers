# Dizpose Backend

This is a Ballerina-based backend application that follows a microservice architecture. The backend is divided into four services: **Customer Service**, **Pickup Request Service**, **Provider Service**, and **Service-Provide Service**. Each service is secured using JWT authentication.

## Table of Contents
1. [Architecture](#architecture)
2. [Services](#services)
   - [Customer Service](#customer-service)
   - [Pickup Request Service](#pickup-request-service)
   - [Provider Service](#provider-service)
   - [Service-Provide Service](#service-provide-service)
3. [Getting Started](#getting-started)
4. [Running the Backend](#running-the-backend)

## Architecture

The backend uses a **microservices** architecture where each service is deployed independently. Ballerina is used to build and manage the services. Below is an overview of the services provided:

1. **Customer Service**: Manages customer-related operations like registration and login.
2. **Pickup Request Service**: Handles pickup requests from customers.
3. **Provider Service**: Manages provider-related operations like registration and login.
4. **Service-Provide Service**: Manages pickup requests from the provider side.

## Services

### Customer Service

This service handles customer registration and login operations, along with management of customer profiles. It uses **JWT** authentication for security.

**Resources:**
- `POST /register`: Register a new customer.
- `POST /login`: Login for existing customers.
- `GET /{customerId}`: Get customer details by ID.
- `PUT /{customerId}`: Update customer details by ID.
- `DELETE /{customerId}`: Delete a customer account.

### Pickup Request Service

This service is responsible for managing pickup requests from customers. It allows creating, viewing, and managing requests.

**Resources:**
- `POST /newRequest`: Create a new pickup request.
- `GET /request/{requestId}`: Get a pickup request by ID.
- `GET /pendingRequests`: Get all pending requests for the user.
- `GET /scheduledRequests`: Get all scheduled requests for the user.
- `GET /completedRequests`: Get all completed requests for the user.
- `DELETE /request/{requestId}`: Delete a pickup request by ID.

### Provider Service

This service handles provider registration, login, and management of provider profiles. It also uses **JWT** authentication for security.

**Resources:**
- `POST /register`: Register a new provider.
- `POST /login`: Provider login.
- `GET /{providerId}`: Get provider details by ID.
- `PUT /{providerId}`: Update provider details by ID.
- `DELETE /{providerId}`: Delete a provider account.

### Service-Provide Service

This service allows providers to accept and manage pickup requests. Providers can accept, filter, and complete requests.

**Resources:**
- `POST /acceptRequest`: Accept a pickup request.
- `POST /completeRequest`: Complete a pickup request.
- `GET /filterRequests`: Filter pickup requests based on location and service type.
- `GET /acceptedRequests`: Get accepted requests.
- `GET /completedRequests`: Get completed requests.

## Getting Started

### Prerequisites

- **Ballerina**: Ensure you have Ballerina installed on your machine. You can download it from the [Ballerina website](https://ballerina.io/downloads/).
- **MongoDB**: You need to have MongoDB installed on your machine. Alternatively, you can use [MongoDB Compass](https://www.mongodb.com/try/download/compass) to manage your database.
- **Database Import**: To import the MongoDB database files, Download the exported database files from the repository (DizposeDB folder).
- **Google API Key**: This application requires a Google API key for functionality related to maps. You can use your own Google API key by following these steps:
  1. Create a Google Cloud project and enable the necessary APIs.
  2. Generate a new API key from the Google Cloud Console.
  3. Update your `.env` file with your API key: (create a .env file if don't have one)
     ```
     GOOGLE_API_KEY=your_google_api_key_here
     ```

### Folder Structure

Each service is located in its own folder. You can find them in the following directories:
- customer
- pickup-request
- provider
- service-provide

## Running the backend

To run the Dizpose backend application, follow these steps:

### Step 1: Clone the Repository
Clone the repository to your local machine using the following command:

git clone https://github.com/BuddhiGayan2000/iwb183-the-fixers.git

from the main folder, cd backend

### Step 2: Import the database
1. Download the exported database files from the repository.
2. Open MongoDB Compass.
3. Connect to your local MongoDB instance.
4. Click on "Import Data" and select the downloaded files to import the database.

### Step 3: Create .env file and add GOOGLE_API_KEY
 1. Create a Google Cloud project and enable the necessary APIs (Places API/Geolocation API/Maps SDK for Android).
 2. Generate a new API key from the Google Cloud Console.
 3. Update your `.env` file with your API key:
        GOOGLE_API_KEY=your_google_api_key_here

### Step 4: Start each microservice
use bal run command
- bal run ./customer/service.bal
- bal run ./pickup-request/service.bal
- bal run ./provider/service.bal
- bal run ./service-provide/service.bal