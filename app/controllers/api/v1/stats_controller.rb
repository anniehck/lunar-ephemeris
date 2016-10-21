require 'httparty'
class Api::V1::StatsController < ApplicationController
  def index
    res = HTTParty.get('https://api.ipify.org?format=json')
    geocoder_data = Geocoder.search(res['ip'])
    latitude = geocoder_data.first.data['latitude']
    longitude = geocoder_data.first.data['longitude']

    # geocoder_data = Geocoder.search(current_user.current_sign_in_ip).first.data
    # latitude = geocoder_data['geometry']['location']['lat']
    # longitude = geocoder_data['geometry']['location']['lng']

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
