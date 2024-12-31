# Chat AI (Ask Me)

## Overview
This React application provides a simple user interface for sending queries to an AWS Lambda function via **Amazon API Gateway**, which in turn calls an **Amazon Bedrock** model (Amazon Titan) for text generation. The app displays the resulting text response from the model directly in the browser.

## Prerequisites
- **Node.js** (version 14+ recommended)  
- **npm** or **yarn** for dependency management  
- A valid **API Gateway** endpoint (HTTP POST) that triggers your Lambda function  
- (Optional) **API Key** if your Gateway requires it

## Getting Started
```
npm install
```

Configure the API Endpoint
Open App.js (or wherever the fetch call is made).
Locate the fetch call URL (e.g., https://<your-api-endpoint>/dem-bedrock-trigger) and replace it with your actual API Gateway URL.
(Optional) Set Up API Key
If your API requires an API key, locate the line:

```
const API_KEY = "<YOUR_API_KEY>";
```
Replace <YOUR_API_KEY> with your actual key.

Run the Development Server

```
npm run dev
```
This will open your app at http://localhost:<your-port>

Build for Production

```
npm run build
```

### Clone the Repository
```bash
git clone https://github.com/username/your-react-app.git
cd your-react-app


Usage
Enter your query in the text box.
Click “Send” to invoke the Bedrock model through your Lambda function.
View the response in the output area below the form.
Customization
Styling: Adjust the CSS classes (.container, .form, etc.) or add your own styles.
API Key & Request Limits: Change or remove any request limit logic (e.g., 3 requests per session) in App.js.
Response Parsing: Modify how the JSON is parsed based on your Lambda’s response structure.
Troubleshooting
CORS Errors: Ensure CORS is enabled on your API Gateway so the React app can successfully call the endpoint.
Network/Deployment: If calls are failing, verify that your API Gateway endpoint is correct and properly deployed.
Console Logs: Check the browser’s DevTools console (Ctrl+Shift+I on Chrome) or the terminal where you run npm start for error messages.
License
MIT
>>>>>>> 50c797606b0a460c29256606f68e4d9a422d1fa0
