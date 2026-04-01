# Reverse Interview Platform

A full-stack web application where candidates can find opportunities and companies can discover talent.

## Project Structure

```
reverseinter/
├── backend/          # Spring Boot API
├── frontend/         # React frontend
└── README.md
```

## Features

- **Candidate Registration & Login**
- **Company Registration & Login**
- **Role-based authentication**
- **Candidate dashboard with profile management**
- **Company dashboard with candidate browsing**
- **Offer management system**

## Technology Stack

### Backend
- Spring Boot 3.2.0
- MySQL Database
- JPA/Hibernate
- Maven

### Frontend
- React 18
- React Router
- Axios for API calls
- CSS3

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL Server
- Maven

### Database Setup
1. Create MySQL database named `reverse_platform`
2. Update database credentials in `backend/src/main/resources/application.properties`

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend will run on: http://localhost:8080

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/login` - Login for both candidates and companies

### Registration
- `POST /api/register/candidate` - Register new candidate
- `POST /api/register/company` - Register new company

### Data Retrieval
- `GET /api/candidates` - Get all candidates
- `GET /api/companies` - Get all companies

## Usage

1. **Home Page**: Choose to login or register
2. **Registration**: Create account as candidate or company
3. **Login**: Single login endpoint for both roles
4. **Dashboard**: Role-specific dashboard after login
   - Candidates: View profile and offers
   - Companies: Browse candidates and send offers

## Database Schema

### Candidates Table
- id (Long, Primary Key)
- name (String)
- email (String, Unique)
- password (String)
- skills (String)

### Companies Table
- id (Long, Primary Key)
- companyName (String)
- email (String, Unique)
- password (String)
- description (String)

### Offers Table
- id (Long, Primary Key)
- companyId (Long, Foreign Key)
- candidateId (Long, Foreign Key)
- message (Text)

## Notes

- Passwords are stored in plain text for demo purposes (use bcrypt in production)
- CORS is configured for localhost:3000
- The application uses basic authentication without JWT for simplicity
