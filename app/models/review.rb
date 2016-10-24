class Review < ActiveRecord::Base
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }
  validates :rating, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 6 }
  # validates :user_id, presence: true
end
