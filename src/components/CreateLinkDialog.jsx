import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Loader2, Link as LinkIcon, RefreshCw, CalendarIcon } from 'lucide-react';
import { cn } from './ui/utils'; // Updated import path

const DEFAULT_FORM_STATE = {
  title: '',
  url: '',
  shortUrl: '',
  deadline: '',
  description: ''
};

export const CreateLinkDialog = ({ open, onOpenChange, onSubmit, editLink = null }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset form when dialog opens or editLink changes
  useEffect(() => {
    if (open) {
      if (editLink) {
        setFormData({
          title: editLink.title || '',
          url: editLink.url || '',
          shortUrl: editLink.shortUrl || '',
          deadline: editLink.deadline?.split('T')[0] || '',
          description: editLink.description || ''
        });
      } else {
        setFormData(DEFAULT_FORM_STATE);
      }
      setErrors({});
    }
  }, [editLink, open]);

  const generateSlug = () => {
    const random = Math.random().toString(36).substring(2, 8);
    setFormData(prev => ({ ...prev, shortUrl: random }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    
    // Simple URL validation
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      
    if (!formData.url || !urlPattern.test(formData.url)) {
      newErrors.url = "Please enter a valid URL (e.g., https://google.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please check the form for errors');
      return;
    }

    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        shortUrl: formData.shortUrl || Math.random().toString(36).substring(2, 8),
        active: true
      };
      
      await onSubmit(dataToSubmit, editLink?.id);
      toast.success(editLink ? 'Link updated successfully' : 'Link created successfully');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{editLink ? 'Edit Link' : 'Create New Link'}</DialogTitle>
          <DialogDescription>
            {editLink ? 'Update the details for this registration link.' : 'Create a new tracked link for students.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5 py-2">
          {/* Title Input */}
          <div className="grid gap-2">
            <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Amazon SDE Internship 2025"
              disabled={loading}
              className={errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
          </div>

          {/* Original URL Input */}
          <div className="grid gap-2">
            <Label htmlFor="url" className={errors.url ? "text-red-500" : ""}>
              Destination URL <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://company.com/careers/job-id"
                className={cn("pl-9", errors.url && "border-red-500 focus-visible:ring-red-500")}
                disabled={loading}
              />
            </div>
            {errors.url && <span className="text-xs text-red-500">{errors.url}</span>}
          </div>

          {/* Grid for Short URL and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Short URL Input with Prefix */}
            <div className="grid gap-2">
              <Label htmlFor="shortUrl">Short Slug</Label>
              <div className="flex">
                <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                  lc.io/
                </div>
                <Input
                  id="shortUrl"
                  value={formData.shortUrl}
                  onChange={(e) => handleChange('shortUrl', e.target.value)}
                  placeholder="custom-slug"
                  className="rounded-none border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={loading}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  className="rounded-l-none border-l-0"
                  onClick={generateSlug}
                  title="Generate Random Slug"
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Deadline Input */}
            <div className="grid gap-2">
              <Label htmlFor="deadline" className={errors.deadline ? "text-red-500" : ""}>
                Deadline <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange('deadline', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  disabled={loading}
                  className={cn(errors.deadline && "border-red-500 focus-visible:ring-red-500")}
                />
                <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add internal notes or details for the students..."
              rows={3}
              disabled={loading}
              className="resize-none"
            />
          </div>

          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                editLink ? 'Save Changes' : 'Create Link'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};