require 'httparty'
class Api::V1::FactsController < ApplicationController
  def index
    response = HTTParty.get('http://astrocast.herokuapp.com/bites')
    respond_to do |format|
      format.json do
        render json: { fact: response.sample }
      end
    end
  end
end
