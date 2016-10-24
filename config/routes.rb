Rails.application.routes.draw do
  devise_for :users
  root to: "home#index"

  resources :users

  resource :location, only: [:show]
  resource :about, only: [:show]
  resource :moon, only: [:show]
  resource :apod, only: [:show]
  resource :reviews, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :facts, only: [:index]
      resources :locations
      resources :stats, only: [:index]
      resources :apods, only: [:index]
      resources :reviews
    end
  end
end
