
# Chuck (Norris)

Why use google if you can ask Chuck Norris for advice.


## Features

- Filter Jokes based on search query
- Filter Jokes based on categories
- Get Random Jokes
- Add/Remove Jokes to favourite

  
## Run Locally

Clone the project

#### Server

```bash
  git clone git@github.com:QuadDepo/chucknorris.git
```

Go to the server directory

```bash
  cd chucknorris/server
```

Install dependencies

```bash
  yarn / npm install
```

Start the server

```bash
  yarn start / npm run start 
```

Once server is running.

#### Client

Go to the client directory

```bash
  cd chucknorris/client
```

Install dependencies

```bash
  yarn / npm install
```

Start the server

```bash
  yarn serve / npm run serve 
```
  
## Tech Stack

**Client:** Vue, Vuex

**Server:** Node, Express

  
## API Reference

#### Get random Jokes

```http
  GET /jokes
```

#### Get Jokes by query search

```http
  GET /jokes?query=chucky
```

#### Get Jokes by categories search

```http
  GET /jokes?categories=travel,dev,sports
```


  
