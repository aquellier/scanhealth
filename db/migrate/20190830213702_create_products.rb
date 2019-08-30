class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :barcode
      t.integer :suggested_price
      t.integer :protein
      t.integer :fat
      t.integer :carbohydrates
      t.integer :saturates
      t.integer :sugars
      t.integer :fibre
      t.integer :salt

      t.timestamps
    end
  end
end
