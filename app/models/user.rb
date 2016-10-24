class User < ApplicationRecord
  has_many :locations
  has_many :reviews
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  geocoded_by :current_sign_in_ip
  after_validation :geocode

  validates :username, presence: true, uniqueness: true, length: { minimum: 4, maximum: 16 }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, format: { with: /.+@.+\..+/ }, uniqueness: true
  validates :password, length: { minimum: 6, maximum: 16 }
  validates :password_confirmation, presence: true

  def admin?
    role == 'admin'
  end
end
