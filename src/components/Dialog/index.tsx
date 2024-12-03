
// import KeyboardArrowDownIcon from '@suid/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@suid/icons-material/KeyboardArrowUp';
import {
    Avatar,
    Button,
    Dialog as SuidDialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide,
  } from '@suid/material';
  import { TransitionProps } from '@suid/material/transitions';
  import { createSignal, JSXElement, ParentComponent } from 'solid-js';
  import useMediaQuery from '@suid/material/useMediaQuery';
  import { useTheme } from '@suid/material/styles';
  
  const Transition = function Transition(
    props: TransitionProps & {
      children: JSXElement;
    }
  ) {
    return <Slide direction="up" {...props} />;
  };
  
   
  const Dialog: ParentComponent<{
    title: string;
    open: boolean;
    onClose: Function;
  }> = (props) => { 
    const isMobileScreen = useMediaQuery(useTheme().breakpoints.down('md')); 
  
    const handleClose = () => {
      props.onClose();
    };
  
  
    return (
      <SuidDialog
        open={props.open}
        TransitionComponent={Transition}
        fullScreen={isMobileScreen()}
        fullWidth
        maxWidth={'md'} // ['xs','sm','md','lg','xl' ]
        onClose={handleClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            确定
          </Button> 
        </DialogActions>
      </SuidDialog>
    );
  }
  export default Dialog