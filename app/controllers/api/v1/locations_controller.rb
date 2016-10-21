require 'httparty'
class Api::V1::LocationsController < ApplicationController
  def index
    res = HTTParty.get('https://api.ipify.org?format=json')
    geocoder_data = Geocoder.search(res['ip'])

    city = geocoder_data.first.data['city']
    region = geocoder_data.first.data['region_name']
    zip = geocoder_data.first.data['zip_code']
    latitude = geocoder_data.first.data['latitude']
    longitude = geocoder_data.first.data['longitude']

    respond_to do |format|
      format.json do
        render json: { latitude: latitude, longitude: longitude, city: city, state: region, zip: zip }
      end
    end
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
