class ProductsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:new]
  def new
    @product = Product.new
    # (barcode: params[:upc])
    # byebug
    # unless @product.new_record?
    #   redirect_to @product
    # else
    #   redirect_to new_product_path
    # end
  end

  def show
  end

  def create
  end

  def get_barcode
  end
end
