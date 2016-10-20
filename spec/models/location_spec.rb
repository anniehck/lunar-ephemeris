require 'rails_helper'

RSpec.describe Location, type: :model do
  describe "Associations" do
    it { should belong_to(:user) }
  end

  describe "Validations" do
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:zip) }
    it { should validate_presence_of(:latitude) }
    it { should validate_presence_of(:longitude) }

    it { should have_valid(:city).when('Boston', 'New York') }
    it { should have_valid(:state).when('MA', 'NY') }
    it { should have_valid(:zip).when('02134', '07624') }
    it { should have_valid(:latitude).when(42.5014, 32.1085) }
    it { should have_valid(:longitude).when(-71.0655, 53.0512) }
  end
end
