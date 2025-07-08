import { useState } from 'react';
import { mockComments } from '../../../mocks';

export const useCarComments = () => {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState({
    userName: '',
    userEmail: '',
    comment: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (rating) => {
    setNewComment({ ...newComment, rating });
  };

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.userName && newComment.userEmail && newComment.comment && newComment.rating > 0) {
      const comment = {
        id: comments.length + 1,
        userName: newComment.userName,
        userImage: "assets/img/blog/com-1.jpg",
        date: new Date().toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        rating: newComment.rating,
        comment: newComment.comment
      };
      
      setComments([...comments, comment]);
      setNewComment({ userName: '', userEmail: '', comment: '', rating: 0 });
      setHoverRating(0);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  const renderRatingInput = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`${
            i <= (hoverRating || newComment.rating) ? 'fas' : 'far'
          } fa-star`}
          style={{ cursor: 'pointer', color: '#ffc107' }}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleRatingHover(i)}
          onMouseLeave={() => setHoverRating(0)}
        />
      );
    }
    return stars;
  };

  const handleInputChange = (field, value) => {
    setNewComment(prev => ({ ...prev, [field]: value }));
  };

  return {
    comments,
    newComment,
    hoverRating,
    handleRatingClick,
    handleRatingHover,
    handleSubmitComment,
    renderStars,
    renderRatingInput,
    handleInputChange
  };
};