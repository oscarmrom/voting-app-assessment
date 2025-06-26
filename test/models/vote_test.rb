require 'test_helper'

class VoteTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(email: 'test@example.com', zip_code: '12345')
    @candidate = Candidate.create!(name: 'Performer', vote_count: 0)
    @vote = Vote.new(user: @user, candidate: @candidate)
  end

  test 'valid with valid attributes' do
    assert @vote.valid?
  end

  test 'invalid with duplicate user_id' do
    @vote.save!
    vote2 = Vote.new(user: @user, candidate: Candidate.create!(name: 'Other', vote_count: 0))
    assert_not vote2.valid?
  end

  test 'belongs to user' do
    assert_respond_to @vote, :user
  end

  test 'belongs to candidate' do
    assert_respond_to @vote, :candidate
  end

  test 'increments candidate vote_count after create' do
    assert_difference('@candidate.reload.vote_count', 1) do
      Vote.create!(user: User.create!(email: 'new@example.com', zip_code: '54321'), candidate: @candidate)
    end
  end

  test 'decrements candidate vote_count after destroy' do
    vote = Vote.create!(user: User.create!(email: 'del@example.com', zip_code: '11111'), candidate: @candidate)
    assert_difference('@candidate.reload.vote_count', -1) do
      vote.destroy
    end
  end
end