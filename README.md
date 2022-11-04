# Thirsty

<br>



## Description


If you're thirsty (or not), find restaurants/bars near you to grab a Beer. Select the beer you had from the database and if not there, add that new beer.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by type of restaurant, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can find a nice spot to grab a beer.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **profile menu** - As a user I want to be able to see the beers I tried and the locations I visited.
- **search for specific beer** - As a user I want to be able to search for a specific beer.
- **search for specific bar/map** - As a user I want to be able to search for a specific restaurant/bar.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password  }                                    |
| `GET`      | `/private/profile`            | Private route. Renders `profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites`              | Private route. Adds a new favorite for the current user.     | { name, cuisine, city, }                                 |
| `DELETE`   | `/private/favoriteRestaurant/:restaurantId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `DELETE`   | `/private/favoriteBeer/:beerId` | Private route. Deletes the existing favorite from the current user. |                                                    |
| `GET`      | `/restaurants`                     | Renders `restaurant-list` view.                              |                                                          |
| `GET`      | `/restaurants/details/:id`         | Renders `restaurant-details` view for the particular restaurant. |  
| `GET`      | `/beers`                     | Renders `beer-list` view.                              |                                                          |
| `GET`      | `/beers/details/:id`         | Renders `beer-details` view for the particular restaurant. |                                                        |







## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  restaurants: [RestaurantId],
  beers: [BeersTriedId],
  favBeers: [favBeersId],
  favSpot: [favSpotsId]
}

```



Restaurant model

```javascript
{
  name: String,
  adress: String,
  beersId: [arrayIds],
  rating: number
}

```

Beer model

```javascript
{
  name: String,
  imageUrl: String,
  style: String,
  brewery: String,
  quantity: String,
  ABV: number,
  brand: String,
  reataurantId: [arrayIds]
}

```

Review model (bonus)

```javascript
{
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  } 
}

```



<br>

## API's

Google Maps/Zoomato/TripAdvisor


<br>


## Packages




<br>



## Backlog

[See the Trello board.]()



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link]()

### Contributors
Hugo Esteves - [`<HugoEsteves21>`](https://github.com/HugoEsteves21) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

Bruno Rocha - [`<brunorocha20`](https://github.com/brunorocha20) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)
