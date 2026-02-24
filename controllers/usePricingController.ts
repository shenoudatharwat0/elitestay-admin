import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { PricingRule, RoomType } from '../types';

interface PricingFormData {
  name: string;
  roomType: RoomType;
  adjustmentPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const usePricingController = (tenantId: string) => {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<PricingFormData>({
    name: '',
    roomType: RoomType.Single,
    adjustmentPercentage: 0,
    startDate: '',
    endDate: '',
    isActive: true
  });

  const fetchData = () => {
    setLoading(true);
    api.getPricingRules(tenantId).then(data => {
      setRules(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [tenantId]);

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createPricingRule({
        tenantId,
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString()
      });

      setIsModalOpen(false);
      setFormData({ name: '', roomType: RoomType.Single, adjustmentPercentage: 0, startDate: '', endDate: '', isActive: true });
      fetchData();
    } catch (error) {
      console.error('Failed to create pricing rule:', error);
      alert('Failed to create pricing rule. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to update state partially
  const updateFormData = (updates: Partial<PricingFormData>) => {
      setFormData(prev => ({...prev, ...updates}));
  }

  return {
    state: {
        rules,
        loading,
        isModalOpen,
        isSubmitting,
        formData
    },
    actions: {
        setIsModalOpen,
        handleCreateRule,
        updateFormData
    }
  };
};