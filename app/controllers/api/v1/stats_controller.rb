require 'date'
class Api::V1::StatsController < ApplicationController
  def index
    aeris_key = ENV["AERIS_CLIENT_ID"]
    aeris_secret = ENV["AERIS_CLIENT_SECRET"]

    ip = request.remote_ip
    geocoder_data = Geocoder.search(ip)
    latitude = geocoder_data.first.data['latitude']
    longitude = geocoder_data.first.data['longitude']

    if latitude == '0' || longitude == '0'
      # Set default coords to Boston
      latitude = 42.3601
      longitude = -71.0589
    end

    response = HTTParty.get("http://api.aerisapi.com/sunmoon?p=#{latitude},#{longitude}&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

    city_name = response['response'][0]['place']['name'].capitalize
    today = response['response'][0]['dateTimeISO']
    moon_data = response['response'][0]['moon']

    respond_to do |format|
      format.json do
        render json: { city: city_name, date: today, moon: moon_data }
      end
    end
  end

  def new
    @current_location = Location.new
  end

  def create
    location = params['location']
    binding.pry
    aeris_key = ENV["AERIS_CLIENT_ID"]
    aeris_secret = ENV["AERIS_CLIENT_SECRET"]
    response = HTTParty.get("http://api.aerisapi.com/sunmoon?p=#{latitude},#{longitude}&client_id=#{aeris_key}&client_secret=#{aeris_secret}")
  end
end
