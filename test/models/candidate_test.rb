require 'test_helper'

class CandidateTest < ActiveSupport::TestCase
  def setup
    @candidate = Candidate.new(name: 'Performer', vote_count: 0)
  end

  test 'valid with valid attributes' do
    assert @candidate.valid?
  end

  test 'invalid without name' do
    @candidate.name = nil
    assert_not @candidate.valid?
  end

  test 'invalid with duplicate name (case insensitive)' do
    @candidate.save!
    candidate2 = Candidate.new(name: 'performer', vote_count: 0)
    assert_not candidate2.valid?
  end

  test 'invalid with negative vote_count' do
    @candidate.vote_count = -1
    assert_not @candidate.valid?
  end

  test 'has many votes' do
    assert_respond_to @candidate, :votes
  end

  test 'has many users through votes' do
    assert_respond_to @candidate, :users
  end

  test 'by_votes scope orders by vote_count desc' do
    c1 = Candidate.create!(name: 'A', vote_count: 2)
    c2 = Candidate.create!(name: 'B', vote_count: 5)
    assert_equal c2, Candidate.by_votes.first
  end

  test 'recent scope orders by created_at desc' do
    c1 = Candidate.create!(name: 'C', vote_count: 0, created_at: 1.day.ago)
    c2 = Candidate.create!(name: 'D', vote_count: 0, created_at: Time.now)
    assert_equal c2, Candidate.recent.first
  end
end