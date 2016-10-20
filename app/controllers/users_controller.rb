class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @client_ip = remote_ip()
    @city = request.location.city
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    flash[:notice] = 'User has been deleted'
    redirect_to root_path
  end

  protected
  def authorize_user
    if !user_signed_in? || !current_user.admin?
      redirect_to root_path
      flash[:alert] = "You do not have access to this page."
    end
  end
end
