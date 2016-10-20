require 'httparty'
class Api::V1::LocationsController < ApplicationController
  def index
    geocoder_data = Geocoder.search(current_user.current_sign_in_ip).first.data

    latitude = geocoder_data['geometry']['location']['lat']
    longitude = geocoder_data['geometry']['location']['lng']
    city = geocoder_data['address_components'][4]['long_name']
    region = geocoder_data['address_components'][6]['short_name']
    zip = geocoder_data['address_components'][-2]['short_name']

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
