class Location < ActiveRecord::Base
  belongs_to :user

  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true
  validates :latitude, numericality: true
  validates :longitude, numericality: true
end
