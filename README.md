NestJS Project
<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p>
NPM Version
Package License
NPM Downloads
CircleCI
Coverage
Discord
Backers on Open Collective
Sponsors on Open Collective
Donate
Support us
Twitter Follow

Description
This is a NestJS project that demonstrates a scalable and efficient server-side application. It includes features like:

User Management: Authentication and user-related operations.

Document Management: Handling documents with CRUD operations.

Caching: Integrated Redis for caching.

Database: PostgreSQL for data persistence.

Swagger Documentation: API documentation for easy testing and integration.

Docker Support: Ready-to-use Docker and Docker Compose configurations for easy deployment.

Table of Contents
Project Setup

Running the Project

Local Development

Using Docker

Using Docker Compose

API Documentation

Testing

Deployment

Resources

Stay in Touch

License

Project Setup
Clone the repository:


git clone <repository-url>
cd <project-folder>
Install dependencies:


npm install
Set up environment variables:

Create a .env file in the root directory.

Add the required environment variables (e.g., PG_HOST, PG_PORT, PG_USERNAME, PG_PASS, PG_DB, REDIS_HOST, REDIS_PORT).

Running the Project
Local Development
Start the application in development mode:


npm run start:dev
The application will be available at:

Copy
http://localhost:3000
Using Docker
Build the Docker image:


docker build -t nestjs-app .
Run the Docker container:


docker run -p 3000:3000 -p 8080:8080 nestjs-app
Access the application:

Copy
http://localhost:3000
Access the documentation:

Copy
http://localhost:8080
Using Docker Compose
Start the application with Docker Compose:


docker-compose up
The following services will be started:

Application: http://localhost:3000

PostgreSQL Database: localhost:5432

Redis Cache: localhost:6379

Documentation: http://localhost:8080

To stop the services:


docker-compose down
API Documentation
The API documentation is automatically generated using Swagger. To access it:

Start the application.

Navigate to:

Copy
http://localhost:3000/api/docs
Testing
Run unit tests:


npm run test
Run end-to-end (e2e) tests:


npm run test:e2e
Check test coverage:


npm run test:cov
Deployment
To deploy the application to production:

Build the production version:


npm run build
Start the application in production mode:


npm run start:prod
For cloud-based deployment, consider using Mau, the official platform for deploying NestJS applications on AWS.

Resources
NestJS Documentation

TypeORM Documentation

Redis Documentation

Docker Documentation

Stay in Touch
Author: Mohd Sakib

Website: https://nestjs.com

Twitter: @nestframework

License
This project is MIT licensed.

