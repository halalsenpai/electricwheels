"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, User, Phone, MapPin, CheckCircle } from 'lucide-react';

interface LeadCaptureModalProps {
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    phone: string;
    timestamp: string;
  }) => void;
  location: string;
}

export function LeadCaptureModal({ onClose, onSubmit, location }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pakistani phone number validation
  const validatePakistaniPhone = (phone: string): boolean => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Pakistani mobile numbers: 03XX-XXXXXXX (11 digits total)
    // Or with country code: +92-3XX-XXXXXXX (12 digits total)
    const pakistaniMobileRegex = /^(\+92|92|0)?3[0-9]{9}$/;
    
    return pakistaniMobileRegex.test(cleanPhone);
  };

  const formatPakistaniPhone = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.startsWith('92')) {
      return `+${cleanPhone}`;
    } else if (cleanPhone.startsWith('0')) {
      return `+92${cleanPhone.substring(1)}`;
    } else if (cleanPhone.length === 10 && cleanPhone.startsWith('3')) {
      return `+92${cleanPhone}`;
    }
    
    return cleanPhone;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePakistaniPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Pakistani phone number (e.g., 03XX-XXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formattedPhone = formatPakistaniPhone(formData.phone);
      
      const leadData = {
        name: formData.name.trim(),
        phone: formattedPhone,
        timestamp: new Date().toISOString()
      };

      onSubmit(leadData);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Allow only digits, spaces, hyphens, and plus sign
    value = value.replace(/[^\d\s\-+]/g, '');
    
    // Auto-format as user types
    if (value.length > 0 && !value.startsWith('+92') && !value.startsWith('0')) {
      if (value.startsWith('3')) {
        value = '0' + value;
      }
    }
    
    setFormData(prev => ({ ...prev, phone: value }));
    
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">Get More Details</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Location: {location}</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Provide your details to get personalized recommendations and connect with local dealers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03XX-XXXXXXX"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Pakistani format: 03XX-XXXXXXX or +92-3XX-XXXXXXX
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  By providing your details, you agree to receive information about electric bikes and connect with local dealers. Your information is secure and will not be shared with third parties.
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Details'}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
