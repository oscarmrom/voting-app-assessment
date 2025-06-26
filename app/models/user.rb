class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :zip_code, presence: true

  has_many :votes, dependent: :destroy
  has_many :candidates, through: :votes

  def can_vote?
    !voted?
  end

  def can_add_write_in?
    !write_in_used
  end
end
