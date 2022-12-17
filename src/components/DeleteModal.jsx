import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = (props) => {
  const [open, setOpen] = React.useState(false);

  console.log("props", props);
  console.log("open", open);
  const handleDeleteItem = () => {
    props.delete(props.id);
    setOpen(false);
  };

  React.useEffect(() => {
    if (props.id !== null) {
      setOpen(!open);
    }
  }, [props.id]);
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure  to delete ?"}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteItem}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
