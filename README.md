# Pit / Dark Pit Matchup API

This project is a REST API for storing and retrieving matchup information for Super Smash Bros. Ultimate characters, mainly focusing on Pit and Dark Pit. The idea is that a user can look up a character by their ID and instantly see everything related to their matchup: stages to ban, good counterpicks, and general tips. This project was built for a backend development class and shows how to use Express, Sequelize, routing, seeding, and basic testing.



## Project Overview

The API uses four main types of data:

- Characters  
- Ban Stages  
- Counterpick Stages  
- Tips  

All of these connect back to the character they belong to. When you request a character using their ID, the API returns all of their related matchup data in the same response.


## Project Structure

```
project/
├── config/
│   └── database.js
├── middleware/
│   ├── logger.js
│   └── errorHandler.js
├── models/
│   ├── Character.js
│   ├── BanStage.js
│   ├── CounterpickStage.js
│   ├── Tip.js
│   └── index.js
├── routes/
│   ├── characters.js
│   ├── banStages.js
│   ├── counterpickStages.js
│   └── tips.js
├── seeders/
│   └── seed.js
├── tests/
│   ├── characters.test.js
│   ├── banStages.test.js
│   ├── counterpickStages.test.js
│   └── tips.test.js
├── app.js
├── server.js
└── README.md
```


## How to Set Everything Up

### Install all packages:

```
npm install
```

### Create the database tables:

```
npm run db:sync
```

### Load sample data:

```
npm run db:seed
```

### Start the server:

```
npm run dev
```

(`npm start` works fine too)

The server uses port **3000**.



## Running Tests

There are basic Jest + Supertest tests included for each resource type.

Run them with:

```
npm test
```



## API Endpoints

Below is a simple overview of the available routes.



### Characters

- **GET /characters** – get all characters  
- **GET /characters/:id** – get one character and all their matchup info  
- **POST /characters** – add a new character  
- **PUT /characters/:id** – update an existing character  
- **DELETE /characters/:id** – delete a character  



### Ban Stages

- **GET /ban-stages** – get all ban stages  
- **GET /ban-stages/:id** – get one ban stage  
- **POST /ban-stages** – add a ban stage  
- **PUT /ban-stages/:id** – update a ban stage  
- **DELETE /ban-stages/:id** – delete a ban stage  



### Counterpick Stages

- **GET /counterpick-stages** – get all counterpick stages  
- **GET /counterpick-stages/:id** – get one counterpick stage  
- **POST /counterpick-stages** – add a counterpick stage  
- **PUT /counterpick-stages/:id** – update one  
- **DELETE /counterpick-stages/:id** – delete one  



### Tips

- **GET /tips** – get all tips  
- **GET /tips/:id** – get one tip  
- **POST /tips** – add a new tip  
- **PUT /tips/:id** – update a tip  
- **DELETE /tips/:id** – delete a tip  



## Character Lookup (Main Feature)

The main feature of the API is that when you request:

```
GET /characters/:id
```

it returns:

- the character’s basic info  
- all stages they should ban  
- all stages they should counterpick  
- all matchup tips  

This makes it easy to look up matchup information quickly.


## Technologies Used

- Node.js  
- Express  
- SQLite  
- Sequelize  
- Jest  
- Supertest  
- Nodemon  


## Future Additions

Planned future updates include:

- User authentication  
- Admin/user roles  
- More detailed matchup notes  
- Support for the entire Smash Ultimate roster  
- Possibly more filters or searching options  


## Note

Since the project focuses on Pit and Dark Pit, the tips section leans more toward **Dark Pit strategies** as I mainly play Dark Pit.

