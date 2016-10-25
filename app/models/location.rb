class Location < ActiveRecord::Base
  belongs_to :user

  validates :city, presence: true
  validates :state, presence: true
  validates :zip, presence: true, length: { is: 5, message: "code must be 5 digits" }, format: { with: /\d{5}/ }
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
end
