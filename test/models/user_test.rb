require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(email: 'test@example.com', zip_code: '12345')
  end

  test 'valid with valid attributes' do
    assert @user.valid?
  end

  test 'invalid without email' do
    @user.email = nil
    assert_not @user.valid?
  end

  test 'invalid without zip_code' do
    @user.zip_code = nil
    assert_not @user.valid?
  end

  test 'email uniqueness' do
    @user.save!
    user2 = User.new(email: 'test@example.com', zip_code: '54321')
    assert_not user2.valid?
  end

  test 'has many votes' do
    assert_respond_to @user, :votes
  end

  test 'has many candidates through votes' do
    assert_respond_to @user, :candidates
  end

  test 'can_vote? returns true if not voted' do
    @user.voted = false
    assert @user.can_vote?
  end

  test 'can_add_write_in? returns true if write_in_used is false' do
    @user.write_in_used = false
    assert @user.can_add_write_in?
  end
end 