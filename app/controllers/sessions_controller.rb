class SessionsController < ApplicationController
  def create
    email = params[:email]&.downcase
    zip_code = params[:zip_code]

    user = User.find_or_create_by(email: email) do |u|
      u.zip_code = zip_code
      u.voted = false
      u.write_in_used = false
    end

    session[:user_id] = user.id

    render json: {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        voted: user.voted,
        write_in_used: user.write_in_used
      }
    }
  end

  def destroy
    session[:user_id] = nil
    render json: { success: true }
  end

  def current_user
    user = User.find(session[:user_id]) if session[:user_id]

    if user
      render json: {
        user: {
          id: user.id,
          email: user.email,
          voted: user.voted,
          write_in_used: user.write_in_used
        }
      }
    else
      render json: { user: nil }
    end
  end
end