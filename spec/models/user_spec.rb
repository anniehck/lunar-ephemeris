require 'spec_helper'
require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:first_name).when('Bob', 'Amanda') }
  it { should have_valid(:last_name).when('Smith', 'Doe') }
  it { should have_valid(:username).when('userName', 'hello_world') }
end
