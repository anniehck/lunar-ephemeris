# require 'httparty'
class Api::V1::ApodsController < ApplicationController
  def index
    nasa_key = ENV["NASA_API_KEY"]
    response = HTTParty.get("https://api.nasa.gov/planetary/apod?api_key=#{nasa_key}")
    respond_to do |format|
      format.json do
        render json: { apod: response }
      end
    end
  end
end
