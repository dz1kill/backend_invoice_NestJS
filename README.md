## Description

Test backend application "Invoice". A service for generating and sending invoices for payment by e-mail to customers.
You can copy the code by following the link: https://gitlab.12devs.com/training/shagdai_training_backend/-/tree/develop

## Running the app

```bash
# Add to project root .env file

# Add to folder: web-api/config , worker-email/config , worker-pdf/config file: local.json

# In the console, run the build and launch images with the command:
$ docker-compose up

# Wait until the server starts.

# Create tables in the database using the "migrations" command:
$ docker-compose exec web-api npm run migrate:run

# Fill in the tables with the data "seeders" with the command:
$ docker-compose exec web-api npm run seed:run
```

## Test

Documentation (Swagger UI) is available at: [link] http://localhost:3000/api/
