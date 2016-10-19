require 'httparty'
class Api::V1::LocationsController < ApplicationController
  def index
    response = HTTParty.get('http://ip-api.com/json')
    respond_to do |format|
      format.json do
        render json: { latitude: response['lat'], longitude: response['lon'], city: response['city'], state: response['region'], zip: response['zip'] }
      end
    end
  end

  def new
    @location = Location.new
  end

  def create
    aeris_key = ENV["AERIS_CLIENT_ID"]
    aeris_secret = ENV["AERIS_CLIENT_SECRET"]

    location = params['location']

    response = HTTParty.get("http://api.aerisapi.com/sunmoon?p=#{location['city']},#{location['state']}&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

    data = response['response'][0]

    location['latitude'] = data['loc']['lat']
    location['longitude'] = data['loc']['long']

    binding.pry

    @location = Location.new(location)
    @location.user = current_user

    binding.pry
    if @location.save
      flash[:notice] = 'Success!'
    else
      @location.errors.any?
      flash[:alert] = @location.errors.full_messages.join(', ')
    end
  end

  # protected
  # def location_params
  #   params.require(:location).permit(:zip, :city, :state, :latitude, :longitude)
  # end
end
