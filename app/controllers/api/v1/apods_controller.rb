require 'httparty'
class Api::V1::ApodsController < ApplicationController
  def index
    response = HTTParty.get("https://api.nasa.gov/planetary/apod?api_key=#{ENV['NASA_API_KEY']}")
    respond_to do |format|
      format.json do
        render json: { apod: response }
      end
    end
  end
end
