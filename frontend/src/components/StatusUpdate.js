import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const StatusUpdateDialog = ({ 
  isOpen, 
  onClose, 
  onStatusUpdate, 
  currentStatus, 
  candidateName 
}) => {
  const [selectedStatus, setSelectedStatus] = React.useState(currentStatus);
  const statusOptions = ['Pending', 'In Progress', 'Completed'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onStatusUpdate(selectedStatus);
    onClose();
  };

  // Reset selected status when dialog opens
  React.useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Assessment Status</DialogTitle>
          <DialogDescription>
            Update the assessment status for {candidateName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mr-2">
              Update Status
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateDialog;