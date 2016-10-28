class Api::V1::GalleriesController < ApplicationController
  def index
    key = ENV["ASTROBIN_KEY"]
    secret = ENV["ASTROBIN_SECRET"]
    moon = HTTParty.get("http://astrobin.com/api/v1/image/?title__icontains=moon&api_key=#{key}&api_secret=#{secret}&format=json")
    eclipse = HTTParty.get("http://astrobin.com/api/v1/image/?title__icontains=eclipse&api_key=#{key}&api_secret=#{secret}&format=json")

    response = moon['objects'] + eclipse['objects']

    respond_to do |format|
      format.json do
        render json: { gallery: response.shuffle }
      end
    end
  end

  def create
    key = ENV["ASTROBIN_KEY"]
    secret = ENV["ASTROBIN_SECRET"]
    search = params['search']

    response = HTTParty.get("http://astrobin.com/api/v1/image/?title__icontains=#{search}&api_key=#{key}&api_secret=#{secret}&format=json")

    respond_to do |format|
      format.json do
        render json: { gallery: response['objects'].shuffle }
      end
    end
  end
end
