class VotingController < ApplicationController
  before_action :require_login, only: [:cast_vote, :add_candidate]

  def index
  end

  def cast_vote
    candidate = Candidate.find(params[:candidate_id])

    if current_user.can_vote?
      vote = current_user.votes.build(candidate:)

      if vote.save
        current_user.update!(voted: true)

        render json: { success: true, message: 'Cast success!' }
      else
        render json: { error: vote.errors.full_messages }, status: :unprocessable_entity
      end

    else
      render json: { error: 'You already voted' }, status: :forbidden
    end
  end

  def add_candidate
    unless current_user.can_add_write_in?
      return render json: { error: 'You already entered a write-in candidate' }, status: :forbidden
    end

    unless Candidate.can_add_more_candidates?
      return render json: { error: 'Max candidates reached of 10' }, status: :forbidden
    end

    unless current_user.can_vote?
      return render json: { error: 'You already voted' }, status: :forbidden
    end

    candidate = Candidate.find_or_create_by(name: params[:name])

    unless candidate.persisted?
      return render json: { error: 'Failed to create candidate' }, status: :unprocessable_entity
    end

    vote = current_user.votes.build(candidate: candidate)

    if vote.save
      current_user.update!(voted: true, write_in_used: true)
      render json: {
        success: true,
        message: 'Candidate added and vote cast!',
        candidate: { id: candidate.id, name: candidate.name, vote_count: candidate.vote_count }
      }
    else
      render json: { error: 'Failed to cast vote' }, status: :unprocessable_entity
    end
  end
end
end
