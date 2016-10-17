require 'rails_helper'

feature 'User views profile show page' do
  let!(:user) { FactoryGirl.create(:user) }

  scenario 'authenticated user has access to personal account page' do
    user_signs_in(user)
    click_link 'My Account'

    expect(page).to have_content "Hey #{user.first_name}"
    expect(page).to have_content user.email
    expect(page).to have_link 'Update Account'
  end

  scenario 'unauthenticated user cannot view account page' do
    visit root_path
    
    expect(page).to_not have_link 'Update Account'
  end
end
