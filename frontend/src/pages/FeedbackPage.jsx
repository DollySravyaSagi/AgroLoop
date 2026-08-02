import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Filter, Sparkles, User, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FeedbackPage() {
  const { reviews, addReview, user, showToast } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('Pickup Speed');
  const [filterRating, setFilterRating] = useState('all');

  const categories = ['Pickup Speed', 'Platform Ease', 'Collector Behavior', 'Support', 'Compost Quality'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please write a short review before submitting', 'warning');
      return;
    }

    addReview({
      userName: user ? user.name : 'Anonymous User',
      rating,
      comment: `[${category}] ${comment}`,
      userLocation: `${user?.district || 'Ludhiana'}, ${user?.state || 'Punjab'}`
    });

    setComment('');
  };

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filterRating));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-8 text-center space-y-3 shadow-xl">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-700/80 border border-emerald-500/80 text-emerald-200">
          Community Feedback & Ratings
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Share Your Experience with AgroLoop
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Help us improve agricultural biomass pickup and organic fertilizer distribution across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Write Feedback Card Left */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Rate & Review Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            
            {/* Interactive Star Rating */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">Overall Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Category Tag */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Feedback Topic</label>
              <div className="flex gap-1.5 flex-wrap">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      category === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Review Comment */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Your Review / Suggestions</label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share how the pickup service went or how we can improve..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ThumbsUp className="w-4 h-4" /> Submit Feedback
            </button>
          </form>
        </div>

        {/* Reviews Feed Right */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Community Reviews</h2>
            
            {/* Filter dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1 text-slate-700 dark:text-slate-300"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4 Stars Only</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((rev) => (
              <div key={rev.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center border border-emerald-300 text-xs">
                      {rev.userName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{rev.userName}</h4>
                      <p className="text-[11px] text-slate-400">{rev.userRole} • {rev.userLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="text-[10px] text-slate-400 text-right">
                  Posted on {rev.date}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
