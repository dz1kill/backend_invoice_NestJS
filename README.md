## Description

Test the Invoice server application. A small service for generating invoices for payment  
and sending invoices to customers by e-mail.  
Implementation:

1. Platform for creating a service - Node.js.
2. Framework - NestJS.
3. ORM - TypeORM.
4. PostgreSQL as database server.
5. Using a microservice architecture based on queues to perform asynchronous tasks:  
   5.1 PDF document generation.  
   5.2 Sending an email.
6. Queue system built on top of Redis.
7. Swagger documentation.
8. To create images and organize work with Redis, PostgreSQL uses Docker-compose.

Workflow:

1. The client sends an HTTP request to the service, passing to the API:  
   1.1 email address, user.  
   1.2 email address to which you want to send an invoice to  
   payment (if it is not specified, an email is sent to  
   user).  
   1.3 The content of the work performed, in the form of a list of works and cost for each item.  
   1.4. .JPG file (optional).
2. The service logs the incoming request by creating a record in the database.
3. The service receives additional information to generate an invoice from the database, using email as a search key:  
   3.1 customer information (first name, last name).
   3.2 information about the company in which the recipient works accounts.
4. The service generates a PDF document based on the template. PDF includes:  
   4.1 customer information.  
   4.2 information about the customer's company.  
   4.3 the total amount to be paid.  
   4.4 list of work performed and their cost.  
   4.5 invoice number.  
   4.6 date of issue of the invoice.  
   4.7 information about the sender (name, address, etc.).
5. The service sends a PDF document and a file to email as an attached file.
6. It is possible to view information.  
   6.1 The total amount of work performed for the period.  
   6.2. The amount of work performed by days for the period.  
   6.3. The amount of work performed by one user by day.  
   6.4. The sum of completed jobs of all users by day.

## Running the app

```bash

# Add to project root .env file.

# In the shared folder, create a local.json file following the example of the local.json.dist file,
# and fill it with the necessary data.

# In the console, run the build and launch images with the command:
$ docker-compose up

# Wait until the server starts.

# Create tables in the database using the "migrations" command:
$ docker-compose exec web-api npm run migration:run

# Fill in the tables with the data "seeders" with the command:
$  ./web-api/scripts/populate-dev.sh
```

## Test

Documentation (Swagger UI) is available at: [link] http://localhost:3000/api/
