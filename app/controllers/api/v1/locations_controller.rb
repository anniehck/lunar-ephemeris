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
    range = location['range']
    if !current_user
      user_error
      return
    end

    if !location['latitude'].empty? && location['city'].empty?
      latitude = location['latitude'].to_f
      longitude = location['longitude'].to_f
      result = current_location(latitude, longitude)
      location['city'] = result[0]
      location['state'] = result[1]
      location['zip'] = result[2]
      message = validate_form(location['zip'], location['city'], location['state'], range)
      if !message.empty?
        form_error(message)
        return
      end
      range_query = range_option(range)
    else
      message = validate_form(location['zip'], location['city'], location['state'], range)
      if !message.empty?
        form_error(message)
        return
      else
        coords = find_coords(location['zip'])
        location['latitude'] = coords.first
        location['longitude'] = coords.last
        range_query = range_option(range)
      end
    end

    @location = Location.new(location_params)
    @location.user = current_user
    if @location.save
      moonData = HTTParty.get("http://api.aerisapi.com/sunmoon/#{location['latitude']},#{location['longitude']}#{range_query}&client_id=#{aeris_key}&client_secret=#{aeris_secret}")

      respond_to do |format|
        format.json { render json: { user: @location.user.username, data: moonData['response'] } }
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

  def user_error
    respond_to do |format|
      format.json { render json: { errorMessages: 'You need to sign in or sign up before continuing.' } }
    end
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

  def range_option(range)
    range_query = '?to=+1day' if range == 'day'
    range_query = "?to=+1week" if range == 'week'
    range_query = "?to=+4weeks" if range == 'month'
    range_query
  end

  def validate_form(zip, city, state, range)
    message = ''
    message += 'Please select a time range - ' if range.empty?
    message += 'Zip cannot be blank - ' if zip.empty?
    message += 'Zip must be 5 digits - ' if zip.length != 5
    message += 'City cannot be blank - ' if city.empty?
    message += 'State cannot be blank - ' if state.empty?
    message
  end

  def form_error(message)
    respond_to do |format|
      format.json { render json: { errorMessages: message } }
    end
  end
end
