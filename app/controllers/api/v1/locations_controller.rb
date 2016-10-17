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
end
