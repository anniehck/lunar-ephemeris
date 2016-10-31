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
      latitude = location['latitude'].to_f
      longitude = location['longitude'].to_f
      result = current_location(latitude, longitude)
      location['city'] = result[0]
      location['state'] = result[1]
      location['zip'] = result[2]
    else
      coords = find_coords(location['zip'])
      location['latitude'] = coords.first
      location['longitude'] = coords.last
    end
    @location = Location.new(location_params)
    @location.user = current_user

    range = location['range']
    range_query = '?to=+1day' if range == 'day'
    range_query = "?to=+1week" if range == 'week'
    range_query = "?to=+4weeks" if range == 'month'

    if @location.save
      moonData = HTTParty.get("http://api.aerisapi.com/sunmoon/#{location['latitude']},#{location['longitude']}#{range_query}&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

      respond_to do |format|
        format.json { render json: { user: @location.user.username, data: moonData['response'] } }
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

  def aeris_key
    ENV["AERIS_CLIENT_ID"]
  end

  def aeris_secret
    ENV["AERIS_CLIENT_SECRET"]
  end

  def current_location(lat, lon)
    result = Geocoder.search("#{lat},#{lon}").first.data
    location = []
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
    location << city
    location << region
    location << zip
  end

  def find_coords(zip)
    coords = []
    results = Geocoder.search(zip)
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
      coords << latitude
      coords << longitude
    end
    coords
  end

end
