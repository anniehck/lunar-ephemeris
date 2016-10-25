require 'httparty'
class Api::V1::LocationsController < ApplicationController
  def index
    ip = request.remote_ip
    geocoder_data = Geocoder.search(ip)

    city = geocoder_data.first.data['city']
    region = geocoder_data.first.data['region_name']
    zip = geocoder_data.first.data['zipcode']
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

    if !location['latitude'].empty? && location['city'].empty?
      lat = location['latitude']
      lon = location['longitude']
      result = Geocoder.search("#{lat},#{lon}").first.data
      city = ''
      region = ''
      zip = ''
      result['address_components'].each do |r|
        r.each do |key, val|
          city = r['long_name'] if val.include?('locality')
          if city.empty?
            city = r['long_name'] if val.include?('administrative_area_level_2')
          end
          region = r['long_name'] if val.include?('administrative_area_level_1')
          zip = r['short_name'] if val.include?('postal_code')
        end
      end
      location['city'] = city
      location['state'] = region
      location['zip'] = zip
    else
      results = Geocoder.search(location['zip'])
      if results.empty?
        error_message = 'No matches for location'
        respond_to do |format|
          format.json do
            render json: { error: error_message }
          end
        end
        return
      else
        latitude = results[0].data['geometry']['location']['lat']
        longitude = results[0].data['geometry']['location']['lng']
      end
      location['latitude'] = latitude
      location['longitude'] = longitude
    end
    @location = Location.new(location_params)
    @location.user = current_user

    if @location.save
      respond_to do |format|
        format.json { render json: { user: @location.user.username } }
      end
    else
      if @location.errors.any?
        @location_errors = @location.errors.full_messages.join(' - ')
        respond_to do |format|
          format.json do
            render json: { user: @location.user.username, errorMessages: @location_errors }
          end
        end
      end
    end
  end

  protected
  def location_params
    params.require(:location).permit(:city, :state, :zip, :latitude, :longitude)
  end
end
