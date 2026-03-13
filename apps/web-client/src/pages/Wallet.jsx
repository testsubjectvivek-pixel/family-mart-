import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWallet, getTransactions, addMoney } from '../store/slices/walletSlice';
import { Wallet as WalletIcon, TrendingUp, TrendingDown, Plus, Loader } from 'lucide-react';

function Wallet() {
  const dispatch = useDispatch();
  const { wallet, balance, transactions, loading, transactionsLoading, pagination } = useSelector(state => state.wallet);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(getWallet());
    dispatch(getTransactions({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handleAddMoney = (e) => {
    e.preventDefault();
    if (amount > 0) {
      dispatch(addMoney(Number(amount)));
      setShowAddMoney(false);
      setAmount('');
    }
  };

  const loadMore = () => {
    if (pagination.page < pagination.pages) {
      dispatch(getTransactions({ page: pagination.page + 1, limit: 20 }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-app">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wallet</h1>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blinkit-green to-blinkit-greenDark rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80">Available Balance</span>
            <WalletIcon className="w-6 h-6 text-white/80" />
          </div>
          <div className="text-4xl font-bold mb-6">₹{balance.toFixed(2)}</div>
          <button
            onClick={() => setShowAddMoney(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blinkit-green font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Money
          </button>
        </div>

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add Money to Wallet</h3>
              <form onSubmit={handleAddMoney}>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blinkit-green focus:border-transparent"
                  min="1"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddMoney(false)}
                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!amount || amount <= 0}
                    className="flex-1 px-4 py-3 bg-blinkit-green text-white font-medium rounded-lg hover:bg-blinkit-greenDark disabled:opacity-50"
                  >
                    Add ₹{amount || 0}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
          </div>

          {transactionsLoading ? (
            <div className="p-6 flex justify-center">
              <Loader className="w-6 h-6 animate-spin text-blinkit-green" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No transactions yet
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {transactions.map((txn, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {txn.type === 'credit' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{txn.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(txn.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {pagination.page < pagination.pages && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={loadMore}
                className="w-full py-3 text-blinkit-green font-medium hover:underline"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
