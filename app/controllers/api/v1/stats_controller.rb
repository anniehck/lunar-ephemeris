require 'httparty'
class Api::V1::StatsController < ApplicationController
  def index
    location = HTTParty.get('http://ip-api.com/json')
    latitude = location['lat']
    longitude = location['lon']

    aeris_key = ENV["AERIS_CLIENT_ID"]
    aeris_secret = ENV["AERIS_CLIENT_SECRET"]

    response = HTTParty.get("http://api.aerisapi.com/sunmoon/moonphases/p=#{latitude},#{longitude}?limit=50&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

    binding.pry

    respond_to do |format|
      format.json do
        render json: { data: response['response'] }
      end
    end
  end

end
