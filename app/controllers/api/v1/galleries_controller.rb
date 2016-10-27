class Api::V1::GalleriesController < ApplicationController
  def index
    key = ENV["ASTROBIN_KEY"]
    secret = ENV["ASTROBIN_SECRET"]
    response = HTTParty.get("http://astrobin.com/api/v1/image/?title__icontains=moon&api_key=#{key}&api_secret=#{secret}&format=json")

    respond_to do |format|
      format.json do
        render json: { gallery: response }
      end
    end
  end
end
