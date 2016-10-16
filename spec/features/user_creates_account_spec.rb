require 'spec_helper'
require 'rails_helper'

feature 'User creates account' do
  scenario 'fills in all required fields' do
    user = User.new(username: "stardust", first_name: "Carl", last_name: "Sagan", email: "star_dust@gmail.com", password: "password", password_confirmation: "password")

    visit root_path
    click_link 'Sign Up'
    fill_in 'Username', with: user.username
    fill_in 'First name', with: user.first_name
    fill_in 'Last name', with: user.last_name
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    fill_in 'Password confirmation', with: user.password_confirmation
    click_button 'Sign up'

    expect(user).to be_a(User)
    expect(page).to have_content('You have signed up successfully.')
    expect(page).to have_content('Sign Out')
  end

  scenario ''
end
