require 'httparty'
class Api::V1::StatsController < ApplicationController
  def index
    location = HTTParty.get('http://ip-api.com/json')
    latitude = location['lat']
    longitude = location['lon']


    aeris_key = ENV["AERIS_CLIENT_ID"]
    aeris_secret = ENV["AERIS_CLIENT_SECRET"]

    response = HTTParty.get("http://api.aerisapi.com/sunmoon?p=#{latitude},#{longitude}&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

    respond_to do |format|
      format.json do
        render json: { city: response['response'][0]['place']['name'].capitalize, moon: response['response'][0]['moon'] }
      end
    end
  end

end
