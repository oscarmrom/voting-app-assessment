class CreateCandidates < ActiveRecord::Migration[7.0]
  def change
    create_table :candidates do |t|
      t.string :name
      t.integer :vote_count

      t.timestamps
    end
  end
end
