class Location < ActiveRecord::Base
  belongs_to :user

  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true, format: { with: /\d{5}/, message: "US zipcode must be 5 digits" }
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
end
