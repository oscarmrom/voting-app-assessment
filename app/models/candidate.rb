class Candidate < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :vote_count, presence: true, numericality: { greater_than_or_equal_to: 0 }

  has_many :votes, dependent: :destroy
  has_many :users, through: :votes

  before_validation :set_default_vote_count, on: :create
  before_validation :normalize_name

  scope :by_votes, -> { order(vote_count: :desc) }
  scope :recent, -> { order(created_at: :desc) }

  def self.can_add_more_candidates?
    count < 10
  end

  private

  def set_default_vote_count
    self.vote_count ||= 0
  end

  def normalize_name
    self.name = name.strip.titleize if name.present?
  end
end
