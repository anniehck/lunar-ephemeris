require 'rails_helper'

RSpec.describe Review, type: :model do
  describe "Associations" do
    it { should belong_to(:user) }
  end

  describe "Validations" do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:body) }
    it { should validate_presence_of(:rating) }

    it { should validate_length_of(:body).is_at_least(10) }
    it { should validate_numericality_of(:rating).is_greater_than(0) }
    it { should validate_numericality_of(:rating).is_less_than(6) }


    it { should have_valid(:title).when('Science is awesome!', 'Can\'t wait to live on the moon') }
    it { should have_valid(:body).when('NASA is an amazing endeavor', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.') }
    it { should have_valid(:rating).when(1, 4) }

    it { should_not have_valid(:body).when('Cool', 'Hello!') }
    it { should_not have_valid(:rating).when('number?', 'no') }
    it { should_not have_valid(:rating).when(-1, 8) }
  end
end
