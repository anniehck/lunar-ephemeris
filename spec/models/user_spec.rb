require 'spec_helper'
require 'rails_helper'

RSpec.describe User, type: :model do
  describe "Associations" do
    it { should have_many(:locations) }
    it { should have_many(:reviews) }
  end

  describe "Validations" do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
    it { should validate_presence_of(:password_confirmation) }
    it { should validate_length_of(:username).is_at_least(4) }
    it { should validate_length_of(:username).is_at_most(16) }
    it { should validate_length_of(:password).is_at_least(6) }
    it { should validate_length_of(:password).is_at_most(16) }

    it { should have_valid(:first_name).when('Bob', 'Amanda') }
    it { should have_valid(:last_name).when('Smith', 'Doe') }
    it { should have_valid(:username).when('userName', 'hello_world') }
    it { should have_valid(:email).when('username@gmail.com', 'my_email@hotmail.com') }
    it { should_not have_valid(:email).when('username@gmail', '@aol.com') }
    it { should_not have_valid(:username).when('hi', 'make_an_applepie_from_scratch') }
    it { should_not have_valid(:password).when('pass', 'word') }
  end
end
