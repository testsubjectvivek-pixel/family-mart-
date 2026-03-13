import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReferralCode, getReferralStats, applyReferralCode, clearReferralState } from '../store/slices/referralSlice';
import { Copy, Share2, Gift, Users, CheckCircle, Loader } from 'lucide-react';

function ReferEarn() {
  const dispatch = useDispatch();
  const { referralCode, stats, loading, applying, error, success } = useSelector(state => state.referral);
  const [showApply, setShowApply] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    dispatch(getReferralCode());
    dispatch(getReferralStats());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setShowApply(false);
      setCode('');
      dispatch(getReferralStats());
    }
  }, [success, dispatch]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join FamilyMart',
      text: `Use my referral code ${referralCode} to get ₹50 discount on your first order!`,
      url: window.location.origin
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (code) {
      dispatch(applyReferralCode(code));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark rounded-2xl p-8 text-white mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Refer Friends & Earn</h1>
            <p className="text-white/90 mb-6">Invite your friends to FamilyMart and earn ₹50 for each successful referral!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blinkit-green" />
              <span className="text-sm text-gray-600">Total Referrals</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats?.totalReferrals || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Successful</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats?.successfulReferrals || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats?.pendingReferrals || 0}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">₹</span>
              <span className="text-sm text-gray-600">Total Earned</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">₹{stats?.totalEarnings || 0}</div>
          </div>
        </div>

        {/* Your Referral Code */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Referral Code</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-blinkit-green" />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3">
                <span className="text-2xl font-bold tracking-wider text-gray-800">{referralCode}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-blinkit-green text-white rounded-lg hover:bg-blinkit-greenDark transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Share this code with friends. They get ₹50 off on first order above ₹200, and you earn ₹50!
          </p>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blinkit-green">1</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Share Code</h3>
              <p className="text-sm text-gray-500">Share your referral code with friends</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blinkit-green">2</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Friend Signs Up</h3>
              <p className="text-sm text-gray-500">Friend creates account using your code</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blinkit-green">3</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Both Earn ₹50</h3>
              <p className="text-sm text-gray-500">Get ₹50 wallet credit after their first order</p>
            </div>
          </div>
        </div>

        {/* Apply Referral Code */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Have a Referral Code?</h2>
            <button
              onClick={() => setShowApply(!showApply)}
              className="text-blinkit-green font-medium hover:underline"
            >
              {showApply ? 'Cancel' : 'Apply'}
            </button>
          </div>

          {showApply && (
            <form onSubmit={handleApplyCode}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Referral code applied successfully!
                </div>
              )}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Enter referral code"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blinkit-green focus:border-transparent uppercase"
                />
                <button
                  type="submit"
                  disabled={!code || applying}
                  className="px-6 py-3 bg-blinkit-green text-white font-medium rounded-lg hover:bg-blinkit-greenDark disabled:opacity-50"
                >
                  {applying ? <Loader className="w-5 h-5 animate-spin" /> : 'Apply'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReferEarn;
