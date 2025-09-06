"use client";

import { useState, useEffect } from 'react';
import { useCompare } from '@/contexts/CompareContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, Zap, Check, Trash2, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FloatingCompareWidget() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedModel, setLastAddedModel] = useState<string | null>(null);
  const router = useRouter();

  // Show notification when items are added
  useEffect(() => {
    if (compareList.length > 0) {
      const latestModel = compareList[compareList.length - 1];
      if (latestModel.id !== lastAddedModel) {
        setLastAddedModel(latestModel.id);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }
    }
  }, [compareList, lastAddedModel]);

  // Keep collapsed by default - no auto-expand

  // Don't show widget if no items in compare list
  if (compareList.length === 0) {
    return null;
  }

  const handleCompare = () => {
    if (compareList.length === 2) {
      router.push(`/compare/${compareList[0].slug}/vs/${compareList[1].slug}`);
    } else if (compareList.length === 3) {
      router.push(`/compare/${compareList[0].slug}/vs/${compareList[1].slug}/vs/${compareList[2].slug}`);
    }
  };

  const canCompare = compareList.length >= 2;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Notification Toast */}
      {showNotification && (
        <div className="mb-3 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
            <Check className="h-4 w-4" />
            Added to compare
          </div>
        </div>
      )}

      {/* Main Widget */}
      <Card className="shadow-xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm animate-in slide-in-from-bottom-2 duration-300">
        {isExpanded ? (
          // Expanded State
          <CardContent className="p-4 w-72">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Compare</span>
                  <Badge variant="secondary" className="text-xs h-5 px-2">
                    {compareList.length}/3
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-gray-600"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Bike List */}
              <div className="space-y-2">
                {compareList.map((model, index) => (
                  <div
                    key={model.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    {/* Bike Thumbnail */}
                    <div className={`w-10 h-7 rounded flex items-center justify-center flex-shrink-0 ${
                      index % 5 === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                      index % 5 === 1 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      index % 5 === 2 ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                      index % 5 === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}>
                      <span className="text-white text-xs">🏍️</span>
                    </div>
                    
                    {/* Bike Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {model.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {model.brand}
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-opacity"
                      onClick={() => removeFromCompare(model.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleCompare}
                  disabled={!canCompare}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                >
                  Compare Now
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
                
                {compareList.length > 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearCompare}
                    className="text-gray-400 hover:text-red-500 hover:border-red-300"
                    title="Clear all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        ) : (
          // Collapsed State
          <CardContent className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsExpanded(true)}>
            <div className="flex items-center gap-3">
              {/* Bike Thumbnails */}
              <div className="flex -space-x-1">
                {compareList.slice(0, 3).map((model, index) => (
                  <div
                    key={model.id}
                    className={`w-8 h-6 rounded border-2 border-white dark:border-gray-900 flex items-center justify-center ${
                      index % 5 === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                      index % 5 === 1 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      index % 5 === 2 ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                      index % 5 === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                  >
                    <span className="text-white text-xs">🏍️</span>
                  </div>
                ))}
              </div>
              
              {/* Count and Action */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {compareList.length}
                </span>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompare();
                  }}
                  disabled={!canCompare}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 h-7"
                >
                  Compare
                </Button>
                <ChevronUp className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
