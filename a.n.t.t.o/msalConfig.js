import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
    clientId: 'b68765ab-97ec-4992-bf14-08171a5c0847',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: "http://localhost:3000/authentication/recvResponse",
    },
};

const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize();

export default msalInstance;