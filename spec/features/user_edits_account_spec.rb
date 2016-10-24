require 'rails_helper'

feature 'User edits account' do
  let!(:user) { FactoryGirl.create(:user) }
  before(:each) do
    user_signs_in(user)
    click_link 'face'
    click_link 'Update Account'
  end

  scenario 'authenticated user can update account' do
    expect(page).to have_content 'Edit User'
  end

  scenario 'user provides current password to successfully update account' do
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password2'
    fill_in 'Password confirmation', with: 'password2'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content 'Your account has been updated successfully'
  end

  scenario 'user does not fill out all required fields' do
    fill_in 'Email', with: nil
    fill_in 'Password', with: 'password3'
    fill_in 'Password confirmation', with: 'password3'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content '2 errors prohibited this user from being saved'
    expect(page).to have_content 'Email can\'t be blank'
    expect(page).to have_content 'Email is invalid'
  end

  scenario 'password does not match password confirmation' do
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password234'
    fill_in 'Password confirmation', with: 'password'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content 'Password confirmation doesn\'t match Password'
  end

  scenario 'does not fill out current password correctly' do
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password!'
    fill_in 'Password confirmation', with: 'password!'
    fill_in 'Current password', with: 'password123'
    click_button 'Update'

    expect(page).to have_content '1 error prohibited this user from being saved'
    expect(page).to have_content 'Current password is invalid'
  end
end
