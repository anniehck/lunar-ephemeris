require 'rails_helper'

feature 'User creates new account' do
  scenario 'fills in all required fields and signs up successfully' do
    user = User.new(username: 'stardust', first_name: 'Carl', last_name: 'Sagan', email: 'star_dust@gmail.com', password: 'password', password_confirmation: 'password')

    visit root_path
    click_link 'Sign Up'

    expect(page).to have_content('Create Account')

    fill_in 'Username', with: user.username
    fill_in 'First name', with: user.first_name
    fill_in 'Last name', with: user.last_name
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    fill_in 'Password confirmation', with: user.password_confirmation
    click_button 'Sign up'

    expect(user).to be_a(User)
    expect(page).to have_content('You have signed up successfully.')
    expect(page).to have_content("Signed in as #{user.username}")
    expect(page).to have_content('Sign Out')
  end

  scenario 'does not fill in all required information' do
    user_2 = User.new(first_name: 'Stephen', email: 'astrophys@gmail.com', password: 'password', password_confirmation: 'password')

    visit root_path
    click_link 'Sign Up'
    fill_in 'First name', with: user_2.first_name
    fill_in 'Email', with: user_2.email
    fill_in 'Password', with: user_2.password
    fill_in 'Password confirmation', with: user_2.password_confirmation
    click_button 'Sign up'

    expect(page).to have_content('3 errors prohibited this user from being saved')
    expect(page).to have_content('Username can\'t be blank')
    expect(page).to have_content('Username is too short')
    expect(page).to have_content('Last name can\'t be blank')
  end

  scenario 'enters invalid email address' do
    user_3 = User.new(username: 'hubblespace', first_name: 'Edwin', last_name: 'Hubble', email: 'hubblespace@gmail', password: 'password', password_confirmation: 'password')

    visit root_path
    click_link 'Sign Up'
    fill_in 'Username', with: user_3.username
    fill_in 'First name', with: user_3.first_name
    fill_in 'Last name', with: user_3.last_name
    fill_in 'Email', with: user_3.email
    fill_in 'Password', with: user_3.password
    fill_in 'Password confirmation', with: user_3.password_confirmation
    click_button 'Sign up'

    expect(page).to have_content('1 error prohibited this user from being saved')
    expect(page).to have_content('Email is invalid')
  end

  scenario 'password does not match password confirmation' do
    user_4 = User.new(username: 'kepler_rules', first_name: 'Johannes', last_name: 'Kepler', email: 'keplermagik@gmail.com', password: 'password', password_confirmation: 'passssword')

    visit root_path
    click_link 'Sign Up'
    fill_in 'Username', with: user_4.username
    fill_in 'First name', with: user_4.first_name
    fill_in 'Last name', with: user_4.last_name
    fill_in 'Email', with: user_4.email
    fill_in 'Password', with: user_4.password
    fill_in 'Password confirmation', with: user_4.password_confirmation
    click_button 'Sign up'

    expect(page).to have_content('1 error prohibited this user from being saved')
    expect(page).to have_content('Password confirmation doesn\'t match Password')
  end

  scenario 'username is too short' do
    user_5 = User.new(username: 'hey', first_name: 'Isaac', last_name: 'Newton', email: 'vote_newton@gmail.com', password: 'password', password_confirmation: 'password')

    visit root_path
    click_link 'Sign Up'
    fill_in 'Username', with: user_5.username
    fill_in 'First name', with: user_5.first_name
    fill_in 'Last name', with: user_5.last_name
    fill_in 'Email', with: user_5.email
    fill_in 'Password', with: user_5.password
    fill_in 'Password confirmation', with: user_5.password_confirmation
    click_button 'Sign up'

    expect(page).to have_content('Username is too short (minimum is 4 characters)')
  end

  scenario 'username has already been taken' do
    FactoryGirl.create(:user, username: 'username')
    user_6 = User.new(username: 'username', first_name: 'User', last_name: 'Name', email: 'username@gmail.com', password: 'password', password_confirmation: 'password')

    visit root_path
    click_link 'Sign Up'
    fill_in 'Username', with: user_6.username
    fill_in 'First name', with: user_6.first_name
    fill_in 'Last name', with: user_6.last_name
    fill_in 'Email', with: user_6.email
    fill_in 'Password', with: user_6.password
    fill_in 'Password confirmation', with: user_6.password_confirmation
    click_button 'Sign up'

    expect(page).to have_content('Username has already been taken')
  end
end
