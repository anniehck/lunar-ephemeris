require 'rails_helper'

feature 'User edits account' do
  let!(:user) { FactoryGirl.create(:user) }

  scenario 'authenticated user can update account' do
    user_signs_in(user)
    click_link 'face'
    click_link 'Update Account'

    expect(page).to have_content 'Edit User'
  end

  scenario 'user provides current password to successfully update account' do
    user_signs_in(user)
    click_link 'face'
    click_link 'Update Account'

    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password2'
    fill_in 'Password confirmation', with: 'password2'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content 'Your account has been updated successfully'
  end
end
