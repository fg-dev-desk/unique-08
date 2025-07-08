import React from 'react';
import { useCarComments } from './useCarComments';
import carCommentsData from './carCommentsData.json';

const CarComments = () => {
  const {
    comments,
    newComment,
    hoverRating,
    handleRatingClick,
    handleRatingHover,
    handleSubmitComment,
    renderStars,
    renderRatingInput,
    handleInputChange
  } = useCarComments();

  const { labels } = carCommentsData;

  return (
    <div className="car-single-review">
      <div className="blog-comments">
        <h3>{labels.comments} ({comments.length})</h3>
        <div className="blog-comments-wrapper">
          {comments.map((comment) => (
            <div key={comment.id} className="blog-comments-single">
              <img src={comment.userImage} alt="thumb" />
              <div className="blog-comments-content">
                <h5>{comment.userName}</h5>
                <div className="mb-2">
                  <div className="car-single-rating d-inline-block me-3">
                    {renderStars(comment.rating)}
                  </div>
                  <span><i className="far fa-clock"></i> {comment.date}</span>
                </div>
                <p>{comment.comment}</p>
                <a href="#"><i className="far fa-reply"></i> {labels.reply}</a>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-comments-form">
          <h3>{labels.leaveComment}</h3>
          <form onSubmit={handleSubmitComment}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group car-review-rating">
                  <label>{labels.yourRating}</label>
                  <div>
                    {renderRatingInput()}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder={labels.yourName}
                    value={newComment.userName}
                    onChange={(e) => handleInputChange('userName', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder={labels.yourEmail}
                    value={newComment.userEmail}
                    onChange={(e) => handleInputChange('userEmail', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <textarea 
                    className="form-control" 
                    rows="5" 
                    placeholder={labels.yourComment}
                    value={newComment.comment}
                    onChange={(e) => handleInputChange('comment', e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="theme-btn">
                  <i className="far fa-paper-plane"></i> {labels.submitComment}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarComments;