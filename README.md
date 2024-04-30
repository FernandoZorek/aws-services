# AWS Services Backend
## _aws-services-backend_

> The AWS Services Backend is a
> REST API service built using Feathers.js that
> allows you to manipulate AWS Services actions.
> It provides endpoints for managing domains aws,
> allows listing, creating and deleting domains.

## Features

- Listing Route 53 domains: Allows listing all hosted domains in your AWS account.
- Creating Route 53 domains: Allows creating new domains in your AWS account.
- Deleting Route 53 domains: Allows deleting existing domains in your AWS

## Tech

This project uses several open source projects to function correctly::

- [Docker] - Platform for developing, shipping, and running applications using containerization;
- [Node.js] - JavaScript runtime built on Chrome’s V8 JavaScript engine;
- [Express.js] - Fast, unopinionated, minimalist web framework for Node.js;
- [Feathers.js] - The API and Real-time Application Framework;
- [SDK-AWS] - The SDK provides first class TypeScript support and makes it easy to call AWS services using idiomatic JavaScript APIs to build Node.js, web, and mobile web applications;

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v20+ to run.

Install the dependencies and devDependencies and start the server.

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
docker-compose up
```

### Usage
##### List domains
**Endpoint:** GET /domains
**Description:** Listing all hosted domains in your AWS account.
**Response:**
```sh
[
  {
    "Name": "your.domain.com.",
    "Type": "A",
    "ResourceRecords":[],
    "AliasTarget":{
      "HostedZoneId": "XXXXXXXXXXXX",
      "DNSName": "s3-website-sa-east-1.amazonaws.com.",
      "EvaluateTargetHealth": true
    }
  },
  {
    "Name": "subdomain.your.domain.com.",
    "Type": "A",
    "TTL": 300,
    "ResourceRecords":[
      {
        "Value": "00.00.00.000"
      }
    ]
  },
  // ... other queues
]
```

##### Create domains
**Endpoint:** POST /domains
**Description:** Creating new domains in your AWS account.
**Request Body:**
```sh
{
  "subdomain": "newsubdomain"
}
});
```


##### Delete domains
**Endpoint:** DELETE /domains/${newsubdomain}
**Description:** Deleting existing domains in your AWS.
*Response:**
```sh
{
  "ChangeInfo":{
    "Id": "/change/XXXXXXXXXXXX",
    "Status": "PENDING",
    "SubmittedAt": "2024-04-30T22:09:10.491Z"
  }
}
```


## License

MIT
**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
[Docker]: <https://docs.docker.com/>
[Node.js]: <https://nodejs.org/docs/latest/api/>
[Feathers.js]: <https://feathersjs.com/api/>
[Express.js]: <https://expressjs.com/en/guide/routing.html>
[SDK-AWS]: <https://aws.amazon.com/sdk-for-javascript/>

