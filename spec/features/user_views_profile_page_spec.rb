require 'rails_helper'

feature 'User views profile show page' do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:locations) { FactoryGirl.create_list(:location, 3, user: user) }
  scenario 'authenticated user has access to personal account page' do
    user_signs_in(user)
    click_link 'face'

    expect(page).to have_content "Hey #{user.first_name}!"
    expect(page).to have_content "You were last signed in at #{user.last_sign_in_at}"
    expect(page).to have_content user.email
    expect(page).to have_link 'Update Account'
  end

  scenario 'authenticated user sees list of past locations' do
    user_signs_in(user)
    click_link 'face'

    expect(page).to have_content "Your Past Locations"
    locations.each do |location|
      expect(page).to have_content location.city
      expect(page).to have_content location.state
      expect(page).to have_content location.zip
    end
  end

  scenario 'unauthenticated user cannot view account page' do
    visit root_path

    expect(page).to_not have_link 'face'
  end
end
