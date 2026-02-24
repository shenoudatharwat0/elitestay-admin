import React from 'react';
import { RoomType } from '../types';
import { Tag, Plus, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { Modal } from '../components/Modal';
import { usePricingController } from '../controllers/usePricingController';

interface PricingProps {
  tenantId: string;
}

// VIEW COMPONENT
export const Pricing: React.FC<PricingProps> = ({ tenantId }) => {
  // Use Controller
  const { state, actions } = usePricingController(tenantId);
  const { rules, loading, isModalOpen, isSubmitting, formData } = state;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pricing Rules</h1>
          <p className="text-slate-500">Dynamic pricing strategies and adjustments</p>
        </div>
        <button 
          onClick={() => actions.setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <div className="col-span-full text-center py-10 text-slate-400">Loading rules...</div>
        ) : rules.map(rule => (
          <div key={rule.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 relative overflow-hidden transition-all hover:shadow-md">
             {/* Status Indicator */}
             <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-10 ${
                rule.isActive ? 'bg-green-500' : 'bg-slate-400'
             }`}></div>

             <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Tag className="text-slate-600" size={20} />
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={20} />
                </button>
             </div>

             <h3 className="text-lg font-bold text-slate-900 mb-1">{rule.name}</h3>
             <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-wide">{rule.roomType}</p>

             <div className="flex items-center space-x-2 mb-4">
                {rule.adjustmentPercentage > 0 ? (
                  <TrendingUp size={16} className="text-emerald-500" />
                ) : (
                  <TrendingDown size={16} className="text-blue-500" />
                )}
                <span className={`text-2xl font-bold ${
                  rule.adjustmentPercentage > 0 ? 'text-emerald-600' : 'text-blue-600'
                }`}>
                  {rule.adjustmentPercentage > 0 ? '+' : ''}{rule.adjustmentPercentage}%
                </span>
                <span className="text-slate-400 text-sm">adjustment</span>
             </div>

             <div className="pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Start:</span>
                  <span className="font-medium text-slate-900">{new Date(rule.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>End:</span>
                  <span className="font-medium text-slate-900">{new Date(rule.endDate).toLocaleDateString()}</span>
                </div>
             </div>
             
             <div className="mt-4 pt-2">
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${
                  rule.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {rule.isActive ? 'Active' : 'Inactive'}
                </span>
             </div>
          </div>
        ))}
        {!loading && rules.length === 0 && (
          <div className="col-span-full py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400">
            No pricing rules found. Create one to get started.
          </div>
        )}
      </div>

      {/* Add Rule Modal */}
      <Modal isOpen={isModalOpen} onClose={() => actions.setIsModalOpen(false)} title="Add Pricing Rule">
        <form onSubmit={actions.handleCreateRule} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rule Name</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.name}
              onChange={e => actions.updateFormData({name: e.target.value})}
              placeholder="e.g. Summer Sale"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Room Type</label>
            <select 
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              value={formData.roomType}
              onChange={e => actions.updateFormData({roomType: e.target.value as RoomType})}
            >
              {Object.values(RoomType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Adjustment Percentage (+/-)</label>
            <input 
              required
              type="number" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.adjustmentPercentage}
              onChange={e => actions.updateFormData({adjustmentPercentage: parseInt(e.target.value)})}
              placeholder="e.g. 10 or -10"
            />
            <p className="text-xs text-slate-500 mt-1">Use negative values for discounts.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input 
                required
                type="date" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.startDate}
                onChange={e => actions.updateFormData({startDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input 
                required
                type="date" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.endDate}
                onChange={e => actions.updateFormData({endDate: e.target.value})}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="isActive"
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              checked={formData.isActive}
              onChange={e => actions.updateFormData({isActive: e.target.checked})}
            />
            <label htmlFor="isActive" className="text-sm text-slate-700">Activate immediately</label>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={() => actions.setIsModalOpen(false)}
              className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Rule'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};