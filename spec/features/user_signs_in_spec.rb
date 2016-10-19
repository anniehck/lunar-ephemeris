require 'rails_helper'

feature 'User signs in to account' do
  let!(:user) { FactoryGirl.create(:user) }
  scenario 'unauthenticated user signs in successfully' do
    visit root_path
    click_link 'Sign In'

    expect(page).to have_content 'Sign In'

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content 'Signed in successfully'
    expect(page).to have_content "Signed in as #{user.username}"
    expect(page).to have_link 'face'
    expect(page).to have_link 'close'
  end

  scenario 'unauthenticated user fills in invalid information' do
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'wrongpassword'
    click_button 'Log in'

    expect(page).to have_content 'Invalid Email or password'
  end

end
