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
    @location = Location.new(location_params)
    @location.user = current_user
    # @location = @location['latitude'].truncate(5).to_s
    if @location.save
      flash[:notice] = 'Success!'
    else
      @location.errors.any?
      flash[:alert] = @location.errors.full_messages.join(', ')
    end
  end

  protected
  def location_params
    params.require(:location).permit(:zip, :city, :state, :latitude, :longitude)
  end
end
