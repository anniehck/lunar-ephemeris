require 'httparty'
class Api::V1::LocationsController < ApplicationController
  def index
    geocoder_data = Geocoder.search(current_user.current_sign_in_ip).first.data

    latitude = geocoder_data['geometry']['location']['lat'].round(4)
    longitude = geocoder_data['geometry']['location']['lng'].round(4)

    place = geocoder_data['address_components']

    city = ''
    region = ''
    zip = ''
    place.each do |p|
      p.each do |key, val|
        city = p['long_name'] if val.include?('locality') || val.include?('administrative_area_level_2')
        region = p['long_name'] if val.include?('administrative_area_level_1')
        zip = p['short_name'] if val.include?('postal_code')
      end
    end

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
