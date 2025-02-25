
# Spring Boot Email Assistance

## Project Description
Spring Boot Email Assistance is a project designed to provide email sending capabilities through a RESTful API. It allows users to send emails with various configurations and attachments.

## Features
- Send plain text emails
- Send HTML emails
- Attach files to emails
- Configure email settings

## Prerequisites
- Java 8 or higher
- Maven
- Spring Boot

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/email-assistance.git
    ```
2. Navigate to the project directory:
    ```bash
    cd email-assistance
    ```
3. Build the project using Maven:
    ```bash
    mvn clean install
    ```

## Running the Application
To run the application, use the following command:
```bash
mvn spring-boot:run
```

## API Endpoints

### Send Plain Text Email
- **URL:** `/api/email/send`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "to": "recipient@example.com",
        "subject": "Test Email",
        "body": "This is a test email."
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "message": "Email sent successfully."
    }
    ```

### Send HTML Email
- **URL:** `/api/email/sendHtml`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "to": "recipient@example.com",
        "subject": "Test HTML Email",
        "body": "<h1>This is a test HTML email.</h1>"
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "message": "HTML email sent successfully."
    }
    ```

### Send Email with Attachment
- **URL:** `/api/email/sendWithAttachment`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "to": "recipient@example.com",
        "subject": "Test Email with Attachment",
        "body": "This email contains an attachment.",
        "attachment": "base64EncodedFileContent"
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "message": "Email with attachment sent successfully."
    }
    ```

## Usage
To use the API, send HTTP requests to the endpoints listed above with the appropriate request body. You can use tools like Postman or cURL to test the endpoints.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.
