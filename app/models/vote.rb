class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :candidate

  validates :user_id, uniqueness: true

  after_create :increment_candidate_votes
  after_destroy :decrement_candidate_votes

  private

  def increment_candidate_votes
    candidate.increment!(:vote_count)
  end

  def decrement_candidate_votes
    candidate.decrement!(:vote_count)
  end
end
