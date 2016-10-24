require 'rails_helper'

feature 'Profile Photo' do
  let!(:user) { FactoryGirl.create(:user) }
  scenario 'user successfully uploads a profile photo at registration' do
    visit root_path
    click_link 'Sign Up'

    fill_in 'Username', with: 'capybarara'
    fill_in 'First name', with: 'Capy'
    fill_in 'Last name', with: 'Bara'
    fill_in 'Email', with: 'capybara_rulez@gmail.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    attach_file('Profile photo', "#{Rails.root}/spec/support/images/capybara.jpg", visible: true)
    click_button 'Sign up'

    expect(page).to have_content 'You have signed up successfully.'
  end

  scenario 'user uploads new profile photo on edit account form' do
    user_signs_in(user)
    click_link 'face'
    click_link 'Update Account'

    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'newpassword'
    fill_in 'Password confirmation', with: 'newpassword'
    fill_in 'Current password', with: user.password
    attach_file('Profile photo', "#{Rails.root}/spec/support/images/capybara.jpg", visible: true)
    click_button 'Update'

    expect(page).to have_content 'Your account has been updated successfully.'

    click_link 'face'
    expect(page.find('.profile-pic')['src']).to have_content 'capybara.jpg'
  end
end
