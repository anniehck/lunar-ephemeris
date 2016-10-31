# Lunar Ephemeris
[ ![Codeship Status for anniehck/moon-visualizer](https://app.codeship.com/projects/b92aa070-7566-0134-e20a-36b396ab9a96/status?branch=master)](https://app.codeship.com/projects/179371)
[![Code Climate](https://codeclimate.com/github/anniehck/moon-visualizer/badges/gpa.svg)](https://codeclimate.com/github/anniehck/moon-visualizer)

**Find out when and where the moon will come around in relation to where _you_ are.**

https://lunar-ephemeris.herokuapp.com


## Configuration

`git clone https://github.com/anniehck/moon-visualizer.git`

`bundle install`

`npm install`

`rake db:create`

`rake db:migrate`

`rails server`

`npm start`

visit `localhost:3000` on your browser

`rake` to run the test suite

**Note:** *You will need your own API key for some pages* (check .env.example)


## Technologies

* Ruby version 2.3.1
* Rails 5
* React.js
* React Router
* jQuery & Ajax
* PostgresQL
* Devise
* Carrierwave, Fog, AWS, S3
* Geocoder
* Rspec, Capybara, FactoryGirl
* React Bootstrap
* Sass


## API Sources

* [NASA](https://api.nasa.gov/api.html)
* [Aeris](http://www.aerisweather.com/support/docs/api/)
* [Astrobin](http://www.astrobin.com/help/api/)
* [Astrocast](http://astrocast.herokuapp.com/bites)


### Notes on Deployment with Heroku

======

**Set production build process with Node & Ruby**

*Node must compile first for React to run*

`heroku buildpacks:clear`

`heroku buildpacks:set heroku/nodejs`

`heroku buildpacks:add heroku/ruby --index 2`

**Database Config**

`heroku run rake db:create`

`heroku run rake db:migrate`

*And don't forget to configure environment variables for production!*
