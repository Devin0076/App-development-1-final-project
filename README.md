
# Pit / Dark Pit Matchup API

This REST API provides matchup information for the characters Pit and Dark Pit in Super Smash Bros. Ultimate. Players can look up any character and instantly see all relevant matchup data in one place, including:

- Stages to ban
- Stages to counterpick
- General matchup tips

The API was built as a backend development final project using Node.js, Express.js, Sequelize ORM, SQLite, and JWT-based authentication with role-based authorization.



## Features

- Characters, Ban Stages, Counterpick Stages, Tips  
- Full CRUD operations for all resources  
- Relational database with Sequelize associations  
- JWT authentication (login + registration)  
- Role-based permissions (`user`, `admin`)  
- Password hashing (bcrypt)  
- Automated tests with Jest + Supertest  



## Technology Stack

- Node.js  
- Express.js  
- Sequelize  
- SQLite  
- JWT  
- bcrypt  
- Jest + Supertest  



## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables  
Create a `.env` file:
```
JWT_SECRET=supersecretkey123
TOKEN_EXPIRATION=2h
PORT=3000
```

### 3. Sync the database
```bash
npm run db:sync
```

### 4. Start the server
```bash
npm run dev
```

Server will run at:
```
http://localhost:3000
```



## API Endpoints

### Authentication
- POST /auth/register — Register a new user  
- POST /auth/login — Log in and receive a JWT  

Send JWT tokens as:
```
Authorization: Bearer <token>
```



## User Roles

### user
- Can read all content  
- Can create tips  

### admin
- Full access to create, update, and delete characters, stages, and tips  



## Characters Endpoints

- GET /characters — Get all characters  
- GET /characters/:id — Get a character with all matchup info  
- POST /characters — Create a character *(admin only)*  
- PUT /characters/:id — Update a character *(admin only)*  
- DELETE /characters/:id — Delete a character *(admin only)*  



## Ban Stage Endpoints

- GET /ban-stages — Get all ban stages  
- POST /ban-stages — Create a ban stage *(admin only)*  
- PUT /ban-stages/:id — Update a ban stage *(admin only)*  
- DELETE /ban-stages/:id — Delete a ban stage *(admin only)*  



## Counterpick Stage Endpoints

- GET /counterpick-stages — Get all counterpick stages  
- POST /counterpick-stages — Create a counterpick stage *(admin only)*  
- PUT /counterpick-stages/:id — Update a counterpick stage *(admin only)*  
- DELETE /counterpick-stages/:id — Delete a counterpick stage *(admin only)*  



## Tips Endpoints

- GET /tips — Get all tips  
- POST /tips — Create a new tip *(user or admin)*  
- PUT /tips/:id — Update a tip  
- DELETE /tips/:id — Delete a tip *(admin only)*  



## Database Models

### Character  
- id  
- name  
- archetype  
- weightClass  

### BanStage  
- id  
- stageName  
- reason  
- dangerRating  
- characterId  

### CounterpickStage  
- id  
- stageName  
- benefit  
- rating  
- characterId  

### Tip  
- id  
- tipTitle  
- description  
- difficultyLevel  
- characterId  

### User  
- id  
- email  
- password (hashed)  
- role  



## Testing

Run all tests:
```bash
npm test
```

Covers:
- Characters  
- Ban Stages  
- Counterpick Stages  
- Tips  
- Authentication  
- Authorization  



## Future Enhancements

- Expanded roster  
- Search + filtering  
- Pagination  
- Advanced matchup scoring  
- Frontend UI (optional future)  



## Summary

This API is a complete backend system designed to support competitive Smash Ultimate matchup analysis for Pit and Dark Pit. It includes a relational database, authentication, authorization, and full CRUD functionality.

```
