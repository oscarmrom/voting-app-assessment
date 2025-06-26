class Api::CandidatesController < ApplicationController
  def index
    candidates = Candidates.recent.limit(10)

    render json: candidates.map { |c|
      {
        id: c.id,
        name: c.name,
        vote_count: c.vote_count
      }
    }
  end

  def results
    candidates = Candidates.by_votes.limit(10)
    total_votes = Vote.count

    render json: {
      candidates: candidates.map { |c|
        {
          id: c.id,
          name: c.name,
          vote_count: c.vote_count,
          percentage: percentage_of_votes
        }
      },
      total_votes: total_votes,
      total_candidates: candidates.count
    }
  end

  private

  def percentage_of_votes
    total_votes > 0 ? (c.vote_count.to_f / total_votes * 100).round(1) : 0
  end
end
