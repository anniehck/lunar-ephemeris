require 'rails_helper'

feature 'User signs in to account' do
  scenario 'unauthenticated user signs in successfully' do
    user = FactoryGirl.create(:user)

    visit root_path
    click_link 'Sign In'

    expect(page).to have_content 'Sign In'

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content 'Signed in successfully'
    expect(page).to have_content "Signed in as #{user.username}"
    expect(page).to have_link 'My Account'
    expect(page).to have_link 'Sign Out'
  end

end
