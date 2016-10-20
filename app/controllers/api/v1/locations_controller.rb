require 'httparty'
class Api::V1::LocationsController < ApplicationController
  def index
    @client_ip = remote_ip()
    city = request.location.city
    region = request.location.data['region_name']
    zip = request.location.data['zipcode']
    lat = request.location.latitude
    lon = request.location.longitude

    respond_to do |format|
      format.json do
        render json: { latitude: lat, longitude: lon, city: city, state: region, zip: zip }
      end
    end

    # response = HTTParty.get('http://ip-api.com/json')
    # respond_to do |format|
    #   format.json do
    #     render json: { latitude: response['lat'], longitude: response['lon'], city: response['city'], state: response['region'], zip: response['zip'] }
    #   end
    # end
  end

  def new
    @location = Location.new
  end

  def create
    location = params['location']
    loc = "#{location['city']} #{location['state']}"

    results = Geocoder.search(loc)
    if results.empty?
      flash[:alert] = 'No matches for location'
    else
      latitude = results[0].data['geometry']['location']['lat']
      longitude = results[0].data['geometry']['location']['lng']
    end

    location['latitude'] = latitude
    location['longitude'] = longitude

    @location = Location.new(location_params)
    @location.user = current_user

    if @location.save
      flash[:notice] = 'Success!'
    else
      @location.errors.any?
      flash[:alert] = @location.errors.full_messages.join("\n")
    end
  end

  protected
  def location_params
    params.require(:location).permit(:city, :state, :zip, :latitude, :longitude)
  end
end
