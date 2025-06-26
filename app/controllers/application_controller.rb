class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_login
    unless current_user
      render json: { error: 'Please log in first' }, status: :unauthorized
    end
  end
end
