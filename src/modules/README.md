# Controller vs Service

## Controller

The controller is the interface between HTTP requests and your service layer.

- It receives requests from clients (like Postman or your frontend).
- It calls the service layer to perform the business logic or database operations.
- It sends back the response to the client in a structured format.
- It often handles request validation, error catching, and response formatting.

## Service

The service layer contains the business logic and database interactions.

- It directly interacts with your database (using pool.query in your case).
- It performs calculations, transformations, or other business logic if needed.
- It returns data back to the controller.
