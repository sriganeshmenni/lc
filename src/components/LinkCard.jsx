import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Calendar, Users, Copy, Edit, Trash2, Check, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from './ui/utils';

export const LinkCard = ({ 
  link, 
  onEdit, 
  onDelete, 
  canManage = false, 
  onRegister 
}) => {
  const [copied, setCopied] = useState(false);

  // Memoize status calculations to avoid re-running on every render
  const { isExpired, daysLeft, status } = useMemo(() => {
    const now = new Date();
    const deadlineDate = new Date(link.deadline);
    const isExpired = deadlineDate < now;
    
    // Calculate days remaining
    const diffTime = Math.abs(deadlineDate.getTime() - now.getTime());
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    let status = 'active';
    if (!link.active) status = 'inactive';
    else if (isExpired) status = 'expired';

    return { isExpired, daysLeft, status };
  }, [link.deadline, link.active]);

  const handleCopyShortUrl = async () => {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      setCopied(true);
      toast.success('Copied to clipboard');
      
      // Reset checkmark after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  // Helper to render the status badge
  const renderStatusBadge = () => {
    switch (status) {
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300">Inactive</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'active':
        // Warn if deadline is close (less than 3 days)
        if (daysLeft <= 3) {
          return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Expiring Soon</Badge>;
        }
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Active</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={cn(
      "group relative flex flex-col h-full transition-all duration-200 hover:shadow-lg border-l-4",
      // Conditional border color based on status
      status === 'active' ? "border-l-orange-500" : 
      status === 'expired' ? "border-l-red-500" : "border-l-gray-300",
      status !== 'active' && "opacity-75 hover:opacity-100 bg-gray-50/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold leading-tight line-clamp-1" title={link.title}>
              {link.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 min-h-[2.5em]">
              {link.description || "No description provided."}
            </CardDescription>
          </div>
          <div className="shrink-0">
            {renderStatusBadge()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-orange-500" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Deadline</span>
              <span className="font-medium">
                {new Date(link.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Registered</span>
              <span className="font-medium">{link.registrations || 0} students</span>
            </div>
          </div>
        </div>

        {/* Short Link Display */}
        <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-md border border-border/50">
          <div className="flex-1 min-w-0 pl-2">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Short Link</p>
            <p className="text-sm font-mono truncate text-foreground/90 select-all">{link.shortUrl}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0 hover:bg-background"
            onClick={handleCopyShortUrl}
            title="Copy Short URL"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        
        {/* Original URL Link */}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-orange-600 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span className="truncate max-w-[250px]">{link.url}</span>
        </a>
      </CardContent>

      <CardFooter className="pt-2">
        {canManage ? (
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="flex-1 hover:bg-secondary"
              onClick={() => onEdit(link)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              onClick={() => onDelete(link.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        ) : (
          <Button
            className={cn(
              "w-full font-semibold shadow-md transition-all",
              status === 'active' 
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
            )}
            onClick={() => onRegister(link)}
            disabled={status !== 'active'}
          >
            {status === 'active' ? (
              <>Register Now <ExternalLink className="w-4 h-4 ml-2" /></>
            ) : status === 'expired' ? (
              <>Registration Closed</>
            ) : (
              <>Link Inactive</>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};