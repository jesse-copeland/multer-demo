# Multer Image Upload Demo

### Required
- postgreSQL

#### Inital DB setup
- user: multer
- password: password
- database: multer_development


`config/config.json`
```json
{
  "development": {
    "username": "multer",
    "password": "password",
    "database": "multer_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": "multer_test",
    "password": null,
    "database": "multer_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "multer_production",
    "password": null,
    "database": "multer_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```