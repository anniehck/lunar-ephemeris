require 'httparty'
class Api::V1::StatsController < ApplicationController
  def index
    res = HTTParty.get('https://api.ipify.org?format=json')
    ip = request.remote_ip
    # geocoder_data = Geocoder.search(res['ip'])
    geocoder_data = Geocoder.search(ip)
    latitude = geocoder_data.first.data['latitude']
    longitude = geocoder_data.first.data['longitude']
    # geocoder_data = Geocoder.search(current_user.current_sign_in_ip).first.data
    # latitude = geocoder_data['geometry']['location']['lat']
    # longitude = geocoder_data['geometry']['location']['lng']

    aeris_key = ENV["AERIS_CLIENT_ID"]
    aeris_secret = ENV["AERIS_CLIENT_SECRET"]
    unless latitude == '0' || longitude == '0'
      response = HTTParty.get("http://api.aerisapi.com/sunmoon?p=#{latitude},#{longitude}&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

      cityName = response['response'][0]['place']['name'].capitalize
      moonData = response['response'][0]['moon']
    else
      cityName = 'Somewhere'
      moonData = []
    end

    respond_to do |format|
      format.json do
        render json: { city: cityName, moon: moonData }
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
