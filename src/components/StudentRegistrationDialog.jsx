import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Loader2, Upload, X, FileImage, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from './ui/utils'; // Updated import path

export const StudentRegistrationDialog = ({ open, onOpenChange, link, onSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    screenshot: null,
    screenshotPreview: null
  });
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({ screenshot: null, screenshotPreview: null });
      setIsDragging(false);
    }
  }, [open]);

  const processFile = (file) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG)');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        screenshot: file,
        screenshotPreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  // Drag and Drop Handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  }, []);

  const removeImage = () => {
    setFormData({ screenshot: null, screenshotPreview: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.screenshot) {
      toast.error('Please upload a screenshot of your registration');
      return;
    }

    setLoading(true);
    try {
      const submissionData = {
        linkId: link.id,
        studentName: user.name,
        studentEmail: user.email,
        rollNumber: user.rollNumber || 'N/A',
        screenshot: formData.screenshotPreview,
        status: 'completed'
      };

      await onSubmit(submissionData);
      toast.success('Registration submitted successfully!');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Proof of Registration</DialogTitle>
          <DialogDescription>
            Please upload a screenshot confirming you have registered.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          
          {/* Link Summary Card */}
          <div className="flex items-start gap-3 p-3 bg-secondary/30 border rounded-md">
            <div className="p-2 bg-background rounded-full border shadow-sm">
              <FileImage className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{link?.title || 'Unknown Event'}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {link?.deadline ? `Deadline: ${new Date(link.deadline).toLocaleDateString()}` : 'No deadline'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Screenshot Proof <span className="text-red-500">*</span></Label>
            
            {formData.screenshotPreview ? (
              // Image Preview State
              <div className="relative group border rounded-lg overflow-hidden bg-black/5">
                <img
                  src={formData.screenshotPreview}
                  alt="Preview"
                  className="w-full max-h-64 object-contain"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" /> Remove Image
                  </Button>
                </div>
              </div>
            ) : (
              // Drag and Drop Upload State
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer relative",
                  isDragging 
                    ? "border-orange-500 bg-orange-50 scale-[0.99]" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <input
                  id="screenshot-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <div className={cn("p-3 rounded-full bg-secondary transition-colors", isDragging && "bg-orange-100")}>
                    <Upload className={cn("w-6 h-6 text-muted-foreground", isDragging && "text-orange-600")} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {isDragging ? "Drop image here" : "Click to upload or drag & drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">PNG or JPG (max 5MB)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Alert */}
          <div className="flex items-start gap-2 p-3 bg-blue-50/50 text-blue-700 rounded text-xs border border-blue-100">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>Ensure your screenshot clearly shows the "Registration Successful" message or the confirmation email.</p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
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
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white min-w-[100px]"
              disabled={loading || !formData.screenshot}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Submit Proof'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};