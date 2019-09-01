class ProductsController < ApplicationController

  def new
    @product = Product.new
  end

  def show
  end

  def create
  end

  def get_barcode
    byebug
    params2 = ActiveSupport::JSON.decode(CGI.unescapeHTML(params[:upc]))
    @product = Product.new(barcode: params[:upc])
    byebug
    unless @product.new_record?
      redirect_to @product
    else
      # redirect_to new_product_path
      redirect_to new_product_path, controller: 'products'
    end
  end
end
