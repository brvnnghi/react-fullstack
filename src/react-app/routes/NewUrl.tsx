import { useNavigate } from "react-router-dom";

import UrlForm from "./UrlForm";

// Import the composable Dialog primitives from shadcn/ui.
// Each piece (Dialog, DialogContent, DialogHeader, etc.) is a separate component
// that you compose together — unlike a monolithic <Modal> with props.
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/react-app/components/ui/dialog";

export default function NewUrl() {
  const navigate = useNavigate();

  return (
    // `open` is always true because this component only renders when the
    // /new route is active — the router controls visibility, not state.
    //
    // `onOpenChange` fires when the user presses Escape or clicks the
    // backdrop/close button. When `open` becomes false, we navigate back
    // so the route unmounts this component.
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) navigate("..");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm URL</DialogTitle>
          <DialogDescription>
            Nhập URL và ngày chỉnh sửa cuối cùng.
          </DialogDescription>
        </DialogHeader>
        <UrlForm />
      </DialogContent>
    </Dialog>
  );
}