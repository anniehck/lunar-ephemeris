Rails.application.routes.draw do
  devise_for :users
  root to: "home#index"

  resources :users

  resource :location
  resource :about
  resource :moon
  resource :apod

  namespace :api do
    namespace :v1 do
      resources :facts, only: [:index, :new, :create]
      resources :locations
      resources :stats, only: [:index]
      resources :apods, only: [:index]
    end
  end
end
