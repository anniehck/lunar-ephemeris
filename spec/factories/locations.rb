FactoryGirl.define do
  factory :location do
    sequence(:city) { |n| "City #{n}" }
    state 'MA'
    zip '02115'
    latitude 41.347
    longitude -71.139

    user
  end
end
