FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "user#{n}" }
    first_name "La"
    last_name "Luna"
    sequence(:email) { |n| "laluna#{n}@gmail.com" }
    password "password"
    password_confirmation "password"
  end
end
