class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @reviews = Review.all.order(created_at: :desc)

    respond_to do |format|
      format.json do
        render json: { reviews: @reviews }
      end
    end
  end

  def new
    @location = Location.new
  end

  def create
    @review = Review.new(review_params)
    @review.user = current_user

    if @review.save
      respond_to do |format|
        format.json { render json: { user: @review.user.username } }
      end
    else
      if @review.errors.any?
        @review_errors = @review.errors.full_messages.join(' - ')
        respond_to do |format|
          format.json do
            render json: { user: @review.user.username, errorMessages: @review_errors }
          end
        end
      end
    end
  end

  protected
  def review_params
    params.require(:review).permit(:title, :body, :rating)
  end
end
