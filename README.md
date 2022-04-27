## Connect to MongoDB

Inside the /lib directory you will find dbConnect.js. Use this to establish a connection to the databse to enable queries with Schemas.

![example of connection and query](public/static/code1.jpg)

> Awaiting the connection and then doing a query to find a movie with a specific id

## Schema/Models

###### Movie

```
const MovieSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  imgUrl: String,
  screenings: [
    {
      date: String,
      time: String,
    },
  ],
  reviews: [
    {
      date: String,
      comment: String,
      rating: String,
    },
  ],
});
```

## Movie page

Dynamic routes is used for selected Movie page. SSR for on request based fetching of data from database

_/movies/:id_

## API Routes

GET /movies

Returns JSON with success message and data. Data is an array of objects (see code below)

```
{
    "success": true,
    "data": [
        {
            "username": "Thor",
            "email": "thor@mail.se",
            "bookings": [
                {
                    "movieId": "1",
                    "date": "2022-05-01",
                    "time": "19:00",
                    "screeningsId": "1_1"
                }
            ],
            "__v": 0
        }
    ]
}
```
