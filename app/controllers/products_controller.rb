class ProductsController < ApplicationController

  def new
    @product = Product.new
  end

  def show
  end

  def create
  end

  def get_barcode
    @product = Product.new(barcode: params[:upc])
    unless @product.new_record?
      redirect_to @product
    else
      redirect_to new_product_path
    end
  end
end
