Rails.application.routes.draw do
  devise_for :users
  root to: "home#index"

  resources :users

  namespace :api do
    namespace :v1 do
      resources :facts, only: [:index]
    end
  end
end
