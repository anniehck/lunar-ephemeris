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

  xscenario 'user fills out email form to reset forgotten password' do
    visit root_path
    click_link 'Sign In'
    click_link 'Forgot your password?'

    expect(page).to have_content 'Forgot your password?'
    fill_in 'Email', with: user.email
    click_button 'Send me reset password instructions'

    expect(page).to have_content 'You will receive an email with instructions on how to reset your password in a few minutes'
  end

  scenario 'user leaves reset password form blank' do
    visit root_path
    click_link 'Sign In'
    click_link 'Forgot your password?'

    fill_in 'Email', with: ''
    click_button 'Send me reset password instructions'

    expect(page).to have_content '1 error prohibited this user from being saved'
    expect(page).to have_content 'Email can\'t be blank'
  end

  scenario 'user does not fill out reset password form with invalid email' do
    visit root_path
    click_link 'Sign In'
    click_link 'Forgot your password?'

    fill_in 'Email', with: 'nonexistent_email@yahoo.com'
    click_button 'Send me reset password instructions'

    expect(page).to have_content '1 error prohibited this user from being saved'
    expect(page).to have_content 'Email not found'
  end
end
