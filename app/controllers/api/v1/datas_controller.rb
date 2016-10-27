class Api::V1::DatasController < ApplicationController
  def index
    aeris_key = ENV["AERIS_CLIENT_ID"]
    aeris_secret = ENV["AERIS_CLIENT_SECRET"]

    location = current_user.locations.last
    lat = location['latitude'].to_s
    lon = location['longitude'].to_s

    # Moon stats for next 4 weeks
    response = HTTParty.get("http://api.aerisapi.com/sunmoon/#{lat},#{lon}?to=+4weeks&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

    respond_to do |format|
      format.json do
        render json: { data: response['response'] }
      end
    end
  end
end
