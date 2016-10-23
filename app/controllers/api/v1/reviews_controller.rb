class Api::V1::ReviewsController < ApplicationController
  before_action :authenticate_user!

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
    review = params['review']

    @review = Review.new(review_params)
    @review.user = current_user

    binding.pry

    if @review.save
      flash[:notice] = 'Success!'
    else
      @review.errors.any?
      flash[:alert] = @review.errors.full_messages.join("\n")
    end
  end

  protected
  def review_params
    params.require(:review).permit(:title, :body, :rating)
  end
end
