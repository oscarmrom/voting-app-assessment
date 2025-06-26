class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :zip_code
      t.boolean :voted
      t.boolean :write_in_used

      t.timestamps
    end
  end
end
