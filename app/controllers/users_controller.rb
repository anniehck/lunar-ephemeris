class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    unless current_user.nil?
      # geocoder_data = Geocoder.search(current_user.current_sign_in_ip).first.data
      # @city = geocoder_data['address_components'][4]['long_name']
      ip = request.remote_ip
      geocoder_data = Geocoder.search(ip)
      @city = geocoder_data.first.data['city']
      @last_signed_in = current_user.last_sign_in_at.to_s.slice(0, 10)
    end
    # @geocoder_data = Geocoder.search(ip)
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
