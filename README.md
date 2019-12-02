
## About this project

It was carried out by Jorge Guerra in order to apply to an intership in Innoscripta. It's a small app built with Laravel and react. To run this project it's necessary to have PHP 7.2 or a higher version and npm installed

## Instructions

1. Clone the project and run composer install
2. If .env file isn't created, create a copy of .env.example and store as .env and set the require configuration parameters according your needs.
3. php artisan key:generate
4. php artisan migrate
5. php artisan db:seed --class=PizzaSeed (Only if you want to load the initial 7 pizzas by default)
6. npm install && npm run dev
7. php artisan serve and you'll be able to browser on your localhost through the port 9000

