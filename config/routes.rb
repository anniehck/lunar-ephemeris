Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }
  root to: "home#index"

  resources :users
  resource :location, only: [:show]
  resource :moon, only: [:show]
  resource :gallery, only: [:show]
  resource :apod, only: [:show]
  resource :reviews, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :facts, only: [:index]
      resources :locations
      resources :stats, only: [:index]
      resources :galleries
      resources :apods, only: [:index]
      resources :reviews
    end
  end
end
