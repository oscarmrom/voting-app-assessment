Rails.application.routes.draw do
  # Defines the root path route ("/")
  root "voting#index"

  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'current_user', to: 'sessions#current_user'

  get 'vote', to: 'voting#vote'
  post 'cast_vote', to: 'voting#cast_vote'
  post 'add_candidate', to: 'voting#add_candidate'

  get 'results', to: 'voting#results'

  namespace :api do
    get 'candidates', to: 'candidates#index'
    get 'results', to: 'candidates#results'
  end

  get "up" => "rails/health#show", as: :rails_health_check

  get '*path', to: 'voting#index', constraints: -> (request) do
    !request.xhr? && request.format.html? && !request.path.start_with?('/api')
  end
end
